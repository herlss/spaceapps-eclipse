import { Injectable, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { User } from './schemas/user.schema';
import { UsersInterceptor } from '../../common/interceptors/users.interceptor';

@Injectable()
@WebSocketGateway({
  namespace: '/game',
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
})
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(
    @ConnectedSocket()
    client: Socket,
  ) {
    const room = client.handshake.query.room;

    const user: User = await this.usersModel.create({
      _id: client.id,
      position: [0, 0],
	  room: room
    });
    const users: User[] = await this.usersModel.find({ room: room });

    client.join(room);

    this.server.to(room).emit('users:joined', users);
    client.emit('users:created', user);
  }

  async handleDisconnect(
    @ConnectedSocket()
    client: Socket,
  ) {
    const room: string =
      client.handshake.query.room instanceof Array
        ? client.handshake.query.room[0]
        : client.handshake.query.room;

    await this.usersModel.findByIdAndDelete(client.id);

    const users = await this.usersModel.find({ room: room });

    client.leave(room);

    this.server.to(room).emit('users:updated', users);
  }

  @SubscribeMessage('users:updated')
  async handleUsersUpdate(
    @ConnectedSocket()
    client: Socket,
    @MessageBody()
    user: User,
  ) {
    const room = client.handshake.query.room;

    await this.usersModel.findByIdAndUpdate(client.id, {
      $set: { position: user.position },
    });

    const users = await this.usersModel.find({ room: room });

    this.server.to(room).emit('users:updated', users);
  }
}
