import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message';


@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    const chat = this.chatRepository.create({
      userOne: { id: createChatDto.userOneId },
      userTwo: { id: createChatDto.userTwoId },
    });
    return this.chatRepository.save(chat);
  }

  async getMessages(chatId: number) {
    return this.messageRepository.find({
      where: { chat: { id: chatId } },
      relations: ['sender'],
    });
  }

  async sendMessage(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create({
      chat: { id: createMessageDto.chatId },
      sender: { id: createMessageDto.senderId },
      content: createMessageDto.content,
    });
    return this.messageRepository.save(message);
  }
}
