import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  NotificationContentSchemas,
  NotificationsTypeList,
  NotificationTypeEnum,
} from './notificationTypes';

@Schema({ timestamps: true })
export class Notification {
  @Prop({
    required: true,
  })
  from: string;

  @Prop({
    required: true,
  })
  to: string;

  @Prop({
    type: String,
    required: true,
    validate: (value: string) => NotificationsTypeList.includes(value),
  })
  type: NotificationTypeEnum;

  @Prop({
    required: true,
    type: Object,
    validate: async function (content: any) {
      const notificationType: NotificationTypeEnum | undefined = (this as any)?.type;
      if (!notificationType) return false;
      return await isValidContent(content, notificationType);
    },
  })
  content: Object;

  @Prop({ default: false })
  seen: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
export interface NotificationType extends Notification, Document {}

async function isValidContent(content: any, notificationType: NotificationTypeEnum) {
  if (
    notificationType === NotificationTypeEnum.postLike ||
    notificationType === NotificationTypeEnum.postCreate ||
    notificationType === NotificationTypeEnum.postCommentAdded ||
    notificationType === NotificationTypeEnum.postCommentLiked
  ) {
    return NotificationContentSchemas.postContent.isValidSync(content);
  }
  if (
    notificationType === NotificationTypeEnum.consultationRequest ||
    notificationType === NotificationTypeEnum.consultationConfirmed ||
    notificationType === NotificationTypeEnum.consultationDenied ||
    notificationType === NotificationTypeEnum.consultationCanceled
  ) {
    return NotificationContentSchemas.consultationContent.isValidSync(content);
  }
  return false;
}