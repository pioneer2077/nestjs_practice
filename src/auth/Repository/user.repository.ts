import { CustomRepository } from 'database/typeorm-ex.decorator';
import { User } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from '../Dto/auth-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ password, username }: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
