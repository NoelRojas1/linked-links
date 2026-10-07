import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async updateUserInfo(id: string, data: UpdateUserDto) {
    const existingUser = await this.userModel.findById(id);

    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    return this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } },
      {
        returnDocument: 'after',
        select: '-hashedPassword',
      },
    );
  }
}
