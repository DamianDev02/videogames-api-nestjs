import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericService } from '../common/services/base.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../common/services/bcrypt.service';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService 
  ) {
    super(userRepository);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.bcryptService.hashPassword(createUserDto.password); 
    const newUser = { ...createUserDto, password: hashedPassword };
    return this.userRepository.save(newUser); 
  }

  async findAllUsers(): Promise<User[]> {
    return super.findAll();
  }

  async findOneUser(id: string): Promise<User> {
    return super.findOne(id);
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<User> {
    return super.update(id, updateDto);
  }

  async deleteUser(id: string): Promise<User> {
    return super.delete(id);
  }

  async findUserWithPassword(email: string) : Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
  }

}
