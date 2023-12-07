import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './Repository/user.repository';
import { AuthCredentialsDto } from './Dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }
  async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패!😥');
    }
  }
}
