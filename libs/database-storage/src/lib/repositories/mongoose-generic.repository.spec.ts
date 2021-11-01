import { Inject, Injectable, Scope } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IEntityModelFactory, IIdentifiableEntity } from '@rental-system/common-interfaces';
import { InvalidIdException } from '../exceptions/invalid-id.exception';
import { IdentifiableModel } from '../models/identifiable.model';
import { SequelizeMock } from '../fixtures/sequelize.mock';
import { SequelizeGenericRepository } from './sequelize-generic.repository';

class IdentifiableEntity implements IIdentifiableEntity<string> {
  constructor(readonly id: string) {}
}

@Injectable({ scope: Scope.REQUEST })
class TestRepository extends SequelizeGenericRepository<IdentifiableEntity, IdentifiableModel> {
  constructor(
    @InjectModel(IdentifiableModel) readonly model: typeof IdentifiableModel,
    @Inject('MODEL_FACTORY') readonly modelFactory: IEntityModelFactory<IdentifiableEntity, IdentifiableModel>
  ) {
    super(model, modelFactory);
  }
}

describe('SequelizeGenericRepository', () => {
  let repository: TestRepository;
  let dbModelMock: typeof IdentifiableModel;
  let modelFactoryMock: IEntityModelFactory<IdentifiableEntity, IdentifiableModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestRepository,
        {
          provide: getModelToken(IdentifiableModel),
          useClass: SequelizeMock,
        },
        {
          provide: 'MODEL_FACTORY',
          useValue: { entityToModel: jest.fn(), modelToEntity: jest.fn() },
        },
      ],
    }).compile();

    repository = await module.resolve(TestRepository);
    dbModelMock = module.get(getModelToken(IdentifiableModel));
    modelFactoryMock = module.get('MODEL_FACTORY');
  });

  describe('findById()', () => {
    it('should find entity by id', async () => {
      const entity = new IdentifiableEntity(uuidv4());
      await dbModelMock.create({ id: entity.id });
      jest.spyOn(modelFactoryMock, 'modelToEntity').mockReturnValueOnce(entity);

      expect(await repository.findById(entity.id)).toEqual(entity);
    });

    it('should fail to find by id - invalid id', async () => {
      await expect(repository.findById('not-id')).rejects.toThrow(InvalidIdException);
    });
  });

  it('should find one entity', async () => {
    const entity = new IdentifiableEntity(uuidv4());
    await dbModelMock.create({ id: entity.id });
    jest.spyOn(modelFactoryMock, 'modelToEntity').mockReturnValueOnce(entity);

    expect(await repository.findOne({ id: entity.id })).toEqual(entity);
  });

  it('should find all entities', async () => {
    const entities = [new IdentifiableEntity(uuidv4()), new IdentifiableEntity(uuidv4())];
    entities.forEach(async (entity) => await dbModelMock.create({ id: entity.id }));
    jest.spyOn(modelFactoryMock, 'modelToEntity').mockImplementation((model: IdentifiableModel) => model);

    expect(await repository.findAll()).toEqual(entities);
  });
});
