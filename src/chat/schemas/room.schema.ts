import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RoomType = Room & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Room {
  @Prop({ required: true })
  consultation: string[]

  @Prop({ required: true })
  medical_id: string

  @Prop({ required: true })
  members: string[]

  @Prop({ required: true, default: [false, false] })
  isSeen: boolean[]

  @Prop()
  lastMessage: string

  @Prop()
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);