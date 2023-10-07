import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	handleConnection(client: Socket) {
	    console.log(`Client connected: ${client.id}`);
	}
	
	handleDisconnect(client: Socket) {
	    console.log(`Client disconnected: ${client.id}`);
	}

    // @SubscribeMessage("message")
    // handleMessage(
    // 	@MessageBody() 
    // 	    message: string, 
    // 	@ConnectedSocket() 
    // 	    client: Socket
    // ) {
    //     console.log(client);
    //     console.log(message);
    //     this.server.emit("message", message);
    // }
}