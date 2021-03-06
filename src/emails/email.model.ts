import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailNotificationDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The subscriptor email',
    type: String,
    required: true,
    example: 'jhon.doe@gmail.com',
  })
  email: string;
}
