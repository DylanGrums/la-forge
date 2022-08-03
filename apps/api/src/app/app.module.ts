import { CrudModule } from './user-crud-test/crud.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule, 
    AuthModule,
    // UserModule,
    CrudModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
