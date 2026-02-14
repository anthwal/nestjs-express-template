import { Module } from '@nestjs/common';
import { UserRepoService } from './services/user-repo/user-repo.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [],
  providers: [UserRepoService],
  exports: [UserRepoService],
  controllers: [UserController],
})
export class UserModule {}
