import { Controller, Post, Body, Get, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Auth')
@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDt0: RegisterDto){
    return this.authService.registerUser(registerDt0);
  }
 
  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return this.authService.loginUser(loginDto);
  }

  @Auth(Role.ADMIN)
  @Get()
  findAllUsers() {
    return this.authService.findAllUsers();
  }

}
