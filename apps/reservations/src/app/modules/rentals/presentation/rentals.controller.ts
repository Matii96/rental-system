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
import { UserRestAccess } from '@rental-system/auth';
import { ReactAdminQueryDto } from '@rental-system/dto-nest';
import { DomainExceptionInterceptor } from '@rental-system/filters';
import { RentalCardGuard } from '../../rental-cards/presentation/guards/rental-cards.guard';
import { RequestRentalCard } from '../../rental-cards/presentation/decorators/request-rental-card.decorator';
import { RentalsService } from '../application/rentals.service';
import { RentalsGuard } from './guards/rentals.guard';
import { RequestRental } from './decorators/request-rental-card.decorator';
import { RentalProlongInputDto } from './dto/rest-input/prolong.dto';
import { RentalCreateRestInputDto } from './dto/rest-input/create.dto';
import { RentalRestOutputDto } from './dto/rest-output.dto';

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
  @UserRestAccess(UserAdminEntity, UserCustomerEntity)
  @ApiCreatedResponse({ type: [RentalRestOutputDto] })
  async list(@Req() req: Request, @RequestRentalCard() card: RentalCardEntity, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.rentalsService.getAll(card, query.toOptions());
    req.res.setHeader('X-Total-Count', total);
    return data.map((rental) => new RentalRestOutputDto(rental));
  }

  @Get(':rentalId')
  @UseGuards(RentalsGuard)
  @UserRestAccess(UserAdminEntity, UserCustomerEntity)
  @ApiParam({ name: 'rentalId' })
  @ApiOkResponse({ type: RentalRestOutputDto })
  getById(@RequestRental() rental: RentalEntity) {
    return new RentalRestOutputDto(rental);
  }

  @Post(':rentalCardId')
  @UseGuards(RentalCardGuard)
  @UserRestAccess(UserAdminEntity, UserCustomerEntity)
  @ApiCreatedResponse({ type: RentalRestOutputDto })
  async create(@RequestRentalCard() card: RentalCardEntity, @Body() data: RentalCreateRestInputDto) {
    const rental = await this.rentalsService.create(card, data);
    return new RentalRestOutputDto(rental);
  }

  @Patch(':rentalId/prolong')
  @UseGuards(RentalsGuard)
  @UserRestAccess(UserAdminEntity, UserCustomerEntity)
  @ApiParam({ name: 'rentalId' })
  @ApiOkResponse({ type: RentalRestOutputDto })
  async update(@RequestRental() rental: RentalEntity, @Body() data: RentalProlongInputDto) {
    await this.rentalsService.prolong(rental, data);
    return new RentalRestOutputDto(rental);
  }

  @Patch(':rentalId/close')
  @UseGuards(RentalsGuard)
  @UserRestAccess(UserAdminEntity, UserCustomerEntity)
  @ApiParam({ name: 'rentalId' })
  @ApiOkResponse({ type: RentalRestOutputDto })
  async close(@RequestRental() rental: RentalEntity) {
    await this.rentalsService.close(rental);
    return new RentalRestOutputDto(rental);
  }
}
