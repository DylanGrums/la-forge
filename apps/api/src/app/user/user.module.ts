import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserAclService } from './services/user-acl.service';
import { UserService } from './services/user.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtAuthStrategy, UserAclService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
