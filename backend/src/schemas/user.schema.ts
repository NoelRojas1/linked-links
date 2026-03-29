import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  hashedPassword: string;

  @Prop({ type: String })
  bio: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  avatarImage: string;

  @Prop({ type: String })
  bgImage: string;

  @Prop({ type: String })
  bgColor: string;

  @Prop({ type: String })
  bgType: string;

  @Prop({ type: Date })
  lastLoggedIn: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
