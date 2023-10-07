import { Injectable } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Model } from "mongoose";
import { Server, Socket } from "socket.io";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
@WebSocketGateway({ cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] } })
export class UsersGateway {
    constructor(
        @InjectModel(User.name)
        private readonly usersModel: Model<User>
    ) {}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage("connecting")
	async handleConnection(client: Socket) {
	    console.log(`Client connected: ${client.id}`);

	    const users: User[] = await this.usersModel.find();

	    this.server.emit("connected", users);
	}

	@SubscribeMessage("disconnected")
	async handleDisconnect(
		@MessageBody()
		    data: User
	) {
	    await this.usersModel.findByIdAndRemove(data._id);

	    this.server.emit("newLocal", this.usersModel.find());
	}

    @SubscribeMessage("userMove")
	async handleUserMovement(
    	@MessageBody() 
    	    data: User
	) {
	    await this.usersModel.updateOne({ _id: data._id }, { $set: { position: data.position } });
	    const users = await this.usersModel.find();

	    this.server.emit("newLocal", users);
	}

	@SubscribeMessage("newUser")
    async handleNewUser(
    	@MessageBody() 
    	    data: User
    ) {
	    const existingUser = await this.usersModel.findById(data._id);
        if (existingUser) {
            await this.usersModel.updateOne({ _id: existingUser._id }, { $set: { position: data.position } });
        } else {
            await this.usersModel.create(data);
        }
    }
}