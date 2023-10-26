import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CommentType = Comment & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Comment {
  @Prop()
  id: string;

  @Prop({ required: true })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  postId: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: string[];
}
export const CommentSchema = SchemaFactory.createForClass(Comment);