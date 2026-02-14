import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserRepoService } from '../../services/user-repo/user-repo.service';
import { ResourceMap } from '../../../common/decorators/resource-map.decorator';
import { ResourceConversionInterceptor } from '../../../common/interceptors/resource-conversion/resource-conversion.interceptor';
import { TransactionInterceptor } from '../../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { ReqTransaction } from '../../../transaction-manager/decorators/transaction.decorator';
import { Transaction } from 'sequelize';
import { StoreUserDto } from '../../dtos/store-user.dto';
import { UserModel } from '../../../databases/models/user.model';
import { UserResource } from '../../../resources/v1/user.resource';

@ApiHeader({
  name: 'accept',
  allowEmptyValue: false,
  required: true,
  schema: {
    type: 'string',
    enum: ['application/json'],
  },
})
@ApiTags('User Management')
@Controller('users')
export class UserController {
  constructor(private readonly userRepo: UserRepoService) {}

  @ResourceMap(UserResource)
  @UseInterceptors(ResourceConversionInterceptor, TransactionInterceptor)
  @ApiCreatedResponse({ type: UserResource })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async store(
    @Body() storeUser: StoreUserDto,
    @ReqTransaction() transaction?: Transaction,
  ): Promise<UserModel> {
    return this.userRepo.create(storeUser, transaction);
  }
}
