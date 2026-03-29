import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  usernameOrEmail?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
