import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { AdminInputDto } from './dto/input.dto';
import { AdminOutputDto } from './dto/output.dto';

@ApiTags('Users Admins')
@Controller('v1/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiCreatedResponse({ type: AdminOutputDto })
  async create(@Body() data: AdminInputDto) {
    return this.adminsService.create(data);
  }

  // @Get()
  // @ApiOkResponse({ type: [UserOutputDto] })
  // async list(@Req() req: Request, @Query() query: ReactAdminQueryDto) {
  //   const { data, total } = await this.AdminsService.getAll(query.toOptions());
  //   req.res.setHeader('X-Total-Count', total);
  //   return data;
  // }
}
