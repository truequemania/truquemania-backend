import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  @Get(':id/messages')
  getMessages(@Param('id') chatId: number) {
    return this.chatsService.getMessages(chatId);
  }

  @Post('message')
  sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.chatsService.sendMessage(createMessageDto);
  }
}
