import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './Dto/boards.dto';
import { BoardStatus } from './boards-status.enum';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './Entity/boards.entity';
import { User } from 'src/auth/Entity/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  }
  async getBoardsByUser(user: User): Promise<Board[]> {
    return this.boardsRepository.getBoardsByUser(user);
  }

  async getBoardById(id: number): Promise<Board> {
    return this.boardsRepository.getBoardById(id);
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardsRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    return this.boardsRepository.deleteBoard(id, user);
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardsRepository.updateBoardStatus(id, status);
  }
}
