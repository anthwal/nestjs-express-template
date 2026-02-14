import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResource } from '../base.resource';

export class UserResource extends BaseResource {
  @ApiProperty({ type: String, nullable: false })
  @Expose()
  public email: string;
}
