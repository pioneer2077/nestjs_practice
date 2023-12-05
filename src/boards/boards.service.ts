import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './Dto/boards.dto';
import { BoardStatus } from './boards-status.enum';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './Entity/boards.entity';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    return this.boardsRepository.getBoardById(id);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id: number): Promise<void> {
    this.boardsRepository.deleteBoard(id);
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardsRepository.updateBoardStatus(id, status);
  }
}
