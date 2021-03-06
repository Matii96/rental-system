import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('v1')
export class AppController {
  @Get('health')
  health() {
    return 'ok';
  }
}
