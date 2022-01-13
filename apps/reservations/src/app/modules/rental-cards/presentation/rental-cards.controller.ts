import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AggregateId } from '@rental-system/common';
import { UserAccess } from '@rental-system/auth';
import { RentalCardEntity, UserAdminEntity, UserCustomerEntity } from '@rental-system/domain';
import { RentalCardGetByIdQueryPattern, UnregisterRentalCardCommandPattern } from '@rental-system/microservices';
import { RentalCardsService } from '../application/rental-cards.service';
import { RequestRentalCard } from './decorators/request-rental-card.decorator';
import { RentalCardGuard } from './guards/rental-cards.guard';
import { RentalCardCreateRestInputDto } from './dto/rest-input/create.dto';
import { RentalCardUpdateRestInputDto } from './dto/rest-input/update.dto';
import { RentalCardRestOutputDto } from './dto/rest-output.dto';

@ApiTags('Rental cards')
@Controller('v1/rental-cards')
export class RentalCardsController {
  constructor(private readonly rentalCardsService: RentalCardsService) {}

  @Get(':rentalCardId')
  @UseGuards(RentalCardGuard)
  @UserAccess(UserAdminEntity, UserCustomerEntity)
  @ApiParam({ name: 'rentalCardId' })
  @ApiOkResponse({ type: RentalCardRestOutputDto })
  getById(@RequestRentalCard() card: RentalCardEntity) {
    return new RentalCardRestOutputDto(card);
  }

  @Post()
  @UserAccess(UserAdminEntity)
  @ApiCreatedResponse({ type: RentalCardRestOutputDto })
  async create(@Body() data: RentalCardCreateRestInputDto) {
    const card = await this.rentalCardsService.register(data);
    return new RentalCardRestOutputDto(card);
  }

  @Patch(':rentalCardId/rental-policy')
  @UseGuards(RentalCardGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'rentalCardId' })
  @ApiOkResponse({ type: RentalCardRestOutputDto })
  async update(@RequestRentalCard() card: RentalCardEntity, @Body() data: RentalCardUpdateRestInputDto) {
    await this.rentalCardsService.update(card, data);
    return new RentalCardRestOutputDto(card);
  }

  @Delete(':rentalCardId')
  @UseGuards(RentalCardGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'rentalCardId' })
  @ApiOkResponse({ type: RentalCardRestOutputDto })
  async delete(@RequestRentalCard() card: RentalCardEntity) {
    await this.rentalCardsService.unregister(card.id);
    return new RentalCardRestOutputDto(card);
  }

  @MessagePattern(new RentalCardGetByIdQueryPattern())
  microserviceGetById(userId: AggregateId) {
    return this.rentalCardsService.getById(plainToClass(AggregateId, userId));
  }

  @MessagePattern(new UnregisterRentalCardCommandPattern())
  async unregister(cardId: AggregateId) {
    await this.rentalCardsService.unregister(plainToClass(AggregateId, cardId));
    return 'ok';
  }
}
