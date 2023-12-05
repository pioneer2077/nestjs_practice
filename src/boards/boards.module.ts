import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import { TypeOrmExModule } from 'database/typeorm-ex.modules';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardsRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
