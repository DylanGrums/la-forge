import { CrudController } from '@nestjsx/crud';
import { CrudService } from './crud.service';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserCrudController } from './crud.controller';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CrudService],
  exports: [CrudService],
  controllers: [UserCrudController],
})
export class CrudModule {}