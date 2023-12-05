import { CustomRepository } from 'database/typeorm-ex.decorator';
import { Board } from './Entity/boards.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './Dto/boards.dto';
import { BoardStatus } from './boards-status.enum';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Board)
export class BoardsRepository extends Repository<Board> {
  async getAllBoards(): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    const boards = await query.getMany();
    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`board with id ${id} not found`);
    }
    return;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const insertedData = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(insertedData);
    return insertedData;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    console.log(result.affected);
    if (result.affected === 0) {
      throw new NotFoundException(`board with id ${id} not found`);
    }
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.save(board);
    return board;
  }
}
