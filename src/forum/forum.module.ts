import { Module } from '@nestjs/common';
import NotificationModule from './modules/notification.module';
import PostsModule from './modules/post.module';
import CommentsModule from './modules/comment.module';
import { EventsGateway } from './controllers/event.gateway';

@Module({
  imports: [
    PostsModule,
    CommentsModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class ForumModule {}
