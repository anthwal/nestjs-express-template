import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class StoreUserDto {
  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({ type: String, nullable: true })
  @IsOptional()
  @ValidateIf((object, value) => !!value)
  public password: string;
}
