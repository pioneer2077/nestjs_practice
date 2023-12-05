import { CustomRepository } from 'database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from '../Entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
