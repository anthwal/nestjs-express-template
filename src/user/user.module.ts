import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserRepoModule } from './user-repo.module';

@Module({
  imports: [UserRepoModule],
  controllers: [UserController],
})
export class UserModule {}
