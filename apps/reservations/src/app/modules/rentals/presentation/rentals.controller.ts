import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  MaxProlongationsExceededException,
  OverdueRentalException,
  RentalAlreadyClosedException,
  RentalCardEntity,
  RentalEntity,
  UserAdminEntity,
  UserCustomerEntity,
} from '@rental-system/domain';
import { UserAccess } from '@rental-system/auth';
import { ReactAdminQueryDto } from '@rental-system/dto';
import { DomainExceptionInterceptor } from '@rental-system/filters';
import { RentalCardGuard } from '../../rental-cards/presentation/guards/rental-cards.guard';
import { RequestRentalCard } from '../../rental-cards/presentation/decorators/request-rental-card.decorator';
import { RentalsService } from '../application/rentals.service';
import { RentalsGuard } from './guards/rentals.guard';
import { RequestRental } from './decorators/request-rental-card.decorator';
import { RentalProlongInputDto } from './dto/input/prolong.dto';
import { RentalCreateInputDto } from './dto/input/create.dto';
import { RentalOutputDto } from './dto/output.dto';

@ApiTags('Rentals')
@UseInterceptors(
  new DomainExceptionInterceptor(
    {
      [RentalAlreadyClosedException.name]: BadRequestException,
      [OverdueRentalException.name]: BadRequestException,
      [MaxProlongationsExceededException.name]: BadRequestException,
    },
    InternalServerErrorException
  )
)
@Controller('v1/rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get(':rentalCardId/list')
  @UseGuards(RentalCardGuard)
  @UserAccess(UserAdminEntity, UserCustomerEntity)
  @ApiCreatedResponse({ type: [RentalOutputDto] })
  async list(@Req() req: Request, @RequestRentalCard() card: RentalCardEntity, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.rentalsService.getAll(card, query.toOptions());
    req.res.setHeader('X-Total-Count', total);
    return data.map((rental) => new RentalOutputDto(rental));
  }

  @Get(':rentalId')
  @UseGuards(RentalsGuard)
  @UserAccess(UserAdminEntity, UserCustomerEntity)
  @ApiParam({ name: 'rentalId' })
  @ApiOkResponse({ type: RentalOutputDto })
  getById(@RequestRental() rental: RentalEntity) {
    return new RentalOutputDto(rental);
  }

  @Post(':rentalCardId')
  @UseGuards(RentalCardGuard)
  @UserAccess(UserAdminEntity, UserCustomerEntity)
  @ApiCreatedResponse({ type: RentalOutputDto })
  async create(@RequestRentalCard() card: RentalCardEntity, @Body() data: RentalCreateInputDto) {
    const rental = await this.rentalsService.create(card, { cardId: card.id.toString(), ...data });
    return new RentalOutputDto(rental);
  }

  @Patch(':rentalId/prolong')
  @UseGuards(RentalsGuard)
  @UserAccess(UserAdminEntity, UserCustomerEntity)
  @ApiParam({ name: 'rentalId' })
  @ApiOkResponse({ type: RentalOutputDto })
  async update(@RequestRental() rental: RentalEntity, @Body() data: RentalProlongInputDto) {
    await this.rentalsService.prolong(rental, data);
    return new RentalOutputDto(rental);
  }

  @Patch(':rentalId/close')
  @UseGuards(RentalsGuard)
  @UserAccess(UserAdminEntity, UserCustomerEntity)
  @ApiParam({ name: 'rentalId' })
  @ApiOkResponse({ type: RentalOutputDto })
  async close(@RequestRental() rental: RentalEntity) {
    await this.rentalsService.close(rental);
    return new RentalOutputDto(rental);
  }
}
