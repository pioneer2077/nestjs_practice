import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'gjsqud01!',
  database: 'yinstagram',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
