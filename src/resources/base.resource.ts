import { DateResource } from './date.resource';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseResource extends DateResource {
  @ApiProperty({ type: String, nullable: true, required: false })
  @Expose()
  public id: string;
}
