import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserOutput } from "../user/dtos/user-output.dto";
import { User } from "../user/entities/user.entity";
import { CrudService } from "./crud.service";


@Crud({
  model: {
    type: UserOutput,
  },
})
@ApiTags('UserCrud')
@UseGuards(JwtAuthGuard)
@Controller("UserCrud")
export class UserCrudController implements CrudController<User> {
  constructor(public service: CrudService) {}
}