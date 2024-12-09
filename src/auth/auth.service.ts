import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { LoginDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { createHashValue } from 'src/utils/utilities';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async login(loginDto: LoginDto, res: any) {
    const user: any = await this.usersService.login(loginDto);
    const password = createHashValue(loginDto.password);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }    
    if(user.isDeleted){
      throw new UnauthorizedException('User is Deleted') 
    }
    const payload = {
      sub: user._id,
      emailId: user.emailId,
      mobile: user.mobile,
      role: user.role,
      // exp: moment().add(this.configService.get('auth.tokenExpiry'),'minutes').unix()
    };
    const accessToken: string = await this.jwtService.signAsync(payload);
    res.setHeader('x-access-token',accessToken);
    return {
      userId: user._id,
      name: user.name,
      mobile: user.mobile,
      emailId: user.emailId,
      role:user.role,
      accessToken: accessToken,
      team:user.team
    }
  }
}
