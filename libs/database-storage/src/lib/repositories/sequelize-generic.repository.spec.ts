import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, InjectModel } from '@nestjs/sequelize';
import { ValidationError, ValidationErrorItem } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { IEntityModelFactory, IIdentifiableEntity } from '@rental-system/common';
import { InvalidIdException } from '../exceptions/invalid-id.exception';
import { IdentifiableModel } from '../models/identifiable.model';
import { SequelizeMock } from '../fixtures/sequelize.mock';
import { IdentifiableModelMock } from '../fixtures/identifiable-model.mock';
import { SequelizeGenericRepository } from './sequelize-generic.repository';

class IdentifiableEntity implements IIdentifiableEntity<string> {
  constructor(readonly id: string) {}
}

@Injectable({ scope: Scope.REQUEST })
class TestRepository extends SequelizeGenericRepository<IdentifiableEntity, IdentifiableModel> {
  constructor(
    @InjectModel(IdentifiableModel) model: typeof IdentifiableModel,
    @Inject('MODEL_FACTORY') modelFactory: IEntityModelFactory<IdentifiableEntity, IdentifiableModel>
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
      await dbModelMock.create(new IdentifiableModelMock(entity.id));
      jest.spyOn(modelFactoryMock, 'modelToEntity').mockReturnValueOnce(entity);

      expect(await repository.findById(entity.id)).toEqual(entity);
    });

    it('should fail to find by id - invalid id', async () => {
      await expect(repository.findById('not-id')).rejects.toThrow(InvalidIdException);
    });
  });

  it('should find one entity', async () => {
    const entity = new IdentifiableEntity(uuidv4());
    await dbModelMock.create(new IdentifiableModelMock(entity.id));
    jest.spyOn(modelFactoryMock, 'modelToEntity').mockReturnValueOnce(entity);

    expect(await repository.findOne({ id: entity.id })).toEqual(entity);
  });

  it('should find all entities', async () => {
    const entities = [new IdentifiableEntity(uuidv4()), new IdentifiableEntity(uuidv4())];
    entities.forEach(async (entity) => await dbModelMock.create(new IdentifiableModelMock(entity.id)));
    jest.spyOn(modelFactoryMock, 'modelToEntity').mockImplementation((model: IdentifiableModel) => model);

    expect(await repository.findAll()).toEqual(entities);
  });

  it('should save new entity to database', async () => {
    const entity = new IdentifiableEntity(uuidv4());
    expect(await repository.create(entity)).toEqual(entity);
  });

  it('should update entity in database', async () => {
    const entity = new IdentifiableEntity(uuidv4());
    jest.spyOn(modelFactoryMock, 'entityToModel').mockReturnValueOnce(<IdentifiableModel>{ id: entity.id });
    expect(await repository.update(entity)).toEqual(entity);
  });

  it('should delete entity from database', async () => {
    const entity = new IdentifiableEntity(uuidv4());
    await dbModelMock.create(new IdentifiableModelMock(entity.id));
    expect(await repository.delete(entity)).toEqual(entity);
  });

  it('should delete many entities from database', async () => {
    expect(await repository.deleteMany({ id: 'existing-id' })).toBe(1);
  });

  it('should count entities in database', async () => {
    expect(await repository.count({})).toBe(0);
  });

  it('should throw model validation error', () => {
    const error = new ValidationError('Error', [new ValidationErrorItem('Oops')]);
    // @ts-ignore
    expect(() => repository.handleDatabaseError(error)).toThrow(BadRequestException);
  });
});
