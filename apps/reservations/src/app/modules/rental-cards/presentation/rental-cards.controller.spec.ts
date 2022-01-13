import { Test, TestingModule } from '@nestjs/testing';
import { AggregateId } from '@rental-system/common';
import { RentalPolicies } from '@rental-system/domain';
import { rentalCardEntityMock } from '@rental-system/domain-testing';
import { RentalCardsService } from '../application/rental-cards.service';
import { rentalPoliciesReverseMapper } from '../common/rental-policies-reverse.mapper';
import { RentalCardsRepository } from '../infrastructure/database/repositories/rental-cards.repository';
import { RentalCardRestOutputDto } from './dto/rest-output.dto';
import { RentalCardsController } from './rental-cards.controller';

describe('RentalCardsController', () => {
  let controller: RentalCardsController;
  let rentalCardsServiceMock: RentalCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalCardsController],
      providers: [
        {
          provide: RentalCardsRepository,
          useValue: {},
        },
        {
          provide: RentalCardsService,
          useValue: { update: jest.fn(), register: jest.fn(), unregister: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get(RentalCardsController);
    rentalCardsServiceMock = module.get(RentalCardsService);
  });

  it('should get rental card by id', async () => {
    const card = rentalCardEntityMock();
    expect(controller.getById(card)).toEqual(new RentalCardRestOutputDto(card));
  });

  it('should register card', async () => {
    const card = rentalCardEntityMock();
    jest.spyOn(rentalCardsServiceMock, 'register').mockResolvedValueOnce(card);

    expect(
      await controller.create({ ownerId: 'id', rentalPolicyType: <RentalPolicies>Object.keys(RentalPolicies)[0] })
    ).toEqual(new RentalCardRestOutputDto(card));
    expect(rentalCardsServiceMock.register).toHaveBeenCalledTimes(1);
  });

  it('should update rental card', async () => {
    const card = rentalCardEntityMock();
    expect(await controller.update(card, { rentalPolicyType: rentalPoliciesReverseMapper(card.rentalPolicy) })).toEqual(
      new RentalCardRestOutputDto(card)
    );
    expect(rentalCardsServiceMock.update).toHaveBeenCalledTimes(1);
  });

  it('should unregister rental cards', async () => {
    const card = rentalCardEntityMock();
    expect(await controller.delete(card)).toEqual(new RentalCardRestOutputDto(card));
    expect(rentalCardsServiceMock.unregister).toHaveBeenCalledTimes(1);
  });

  it('should unregister rental cards - micreservices call', async () => {
    expect(await controller.unregister(new AggregateId('id'))).toBe('ok');
    expect(rentalCardsServiceMock.unregister).toHaveBeenCalledTimes(1);
  });
});
