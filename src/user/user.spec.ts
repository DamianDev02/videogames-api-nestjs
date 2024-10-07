import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../common/services/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';


const mockUser = {
  id: '1',
  email: 'test@example.com',
  password: 'hashed_password',
  username: 'test_user',
};

const mockUserRepository = {
  save: jest.fn().mockResolvedValue(mockUser),
  find: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  delete: jest.fn().mockResolvedValue(mockUser),
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: BcryptService,
          useValue: { hashPassword: jest.fn().mockResolvedValue('hashed_password') },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'plain_password', username: 'jojo' };
      const result = await service.createUser(createUserDto);
      expect(result).toEqual(mockUser);
      expect(repository.save).toHaveBeenCalledWith({ ...createUserDto, password: 'hashed_password' });
    });
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const result = await service.findAllUsers();
      expect(result).toEqual([mockUser]);
      expect(repository.find).toHaveBeenCalled();
    });
  });
});
