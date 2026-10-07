import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  bgType: string;

  @IsString()
  @IsOptional()
  bgColor: string;
}
