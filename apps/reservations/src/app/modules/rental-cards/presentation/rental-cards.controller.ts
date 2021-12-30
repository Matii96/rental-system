import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AggregateId } from '@rental-system/common';
import { UserAccess } from '@rental-system/auth';
import { RentalCardEntity, UserAdminEntity } from '@rental-system/domain';
import { UnregisterRentalCardCommandPattern } from '@rental-system/microservices';
import { RentalCardsService } from '../application/rental-cards.service';
import { RequestRentalCard } from './decorators/request-rental-card.decorator';
import { RentalCardGuard } from './guards/rental-cards.guard';
import { RentalCardCreateInputDto } from './dto/input/create.dto';
import { RentalCardUpdateDto } from './dto/input/update.dto';
import { RentalCardOutputDto } from './dto/output.dto';

@ApiTags('Rental cards')
@Controller('v1/rental-cards')
export class RentalCardsController {
  constructor(private readonly rentalCardsService: RentalCardsService) {}

  @Get(':rentalCardId')
  @UseGuards(RentalCardGuard)
  @ApiParam({ name: 'availabilityId' })
  @ApiOkResponse({ type: RentalCardOutputDto })
  getById(@RequestRentalCard() card: RentalCardEntity) {
    return new RentalCardOutputDto(card);
  }

  @Post()
  @UserAccess(UserAdminEntity)
  @ApiCreatedResponse({ type: RentalCardOutputDto })
  async create(@Body() data: RentalCardCreateInputDto) {
    const card = await this.rentalCardsService.register(data);
    return new RentalCardOutputDto(card);
  }

  @Patch(':rentalCardId/rental-policy')
  @UseGuards(RentalCardGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'rentalCardId' })
  @ApiOkResponse({ type: RentalCardOutputDto })
  async update(@RequestRentalCard() card: RentalCardEntity, @Body() data: RentalCardUpdateDto) {
    await this.rentalCardsService.update(card, data);
    return new RentalCardOutputDto(card);
  }

  @Delete(':rentalCardId')
  @UseGuards(RentalCardGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'rentalCardId' })
  @ApiOkResponse({ type: RentalCardOutputDto })
  async delete(@RequestRentalCard() card: RentalCardEntity) {
    await this.rentalCardsService.unregister(card.id);
    return new RentalCardOutputDto(card);
  }

  @MessagePattern(new UnregisterRentalCardCommandPattern())
  async unregister(cardId: AggregateId) {
    await this.rentalCardsService.unregister(plainToClass(AggregateId, cardId));
    return 'ok';
  }
}
