import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop({ type: String, required: true, unique: true })
  links: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
