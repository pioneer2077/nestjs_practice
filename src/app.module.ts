import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeOrmConfig), BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
