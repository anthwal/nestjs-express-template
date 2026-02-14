import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DateResource {
  @ApiProperty({
    type: Date,
    required: false,
    nullable: true,
    default: new Date(),
  })
  @Expose()
  public created_at: Date;

  @ApiProperty({
    type: Date,
    required: false,
    nullable: true,
    default: new Date(),
  })
  @Expose()
  public updated_at: Date;
}
