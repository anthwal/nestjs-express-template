import { Module } from '@nestjs/common';
import { UserRepoService } from './services/user-repo/user-repo.service';

@Module({
  providers: [UserRepoService],
  exports: [UserRepoService],
})
export class UserRepoModule {}
