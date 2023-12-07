import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import { TypeOrmExModule } from 'database/typeorm-ex.modules';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardsRepository]),
    AuthModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
