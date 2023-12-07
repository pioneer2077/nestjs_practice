import { CustomRepository } from 'database/typeorm-ex.decorator';
import { Board } from './Entity/boards.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './Dto/boards.dto';
import { BoardStatus } from './boards-status.enum';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/Entity/user.entity';

@CustomRepository(Board)
export class BoardsRepository extends Repository<Board> {
  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`board with id ${id} not found`);
    }
    return found;
  }

  async getBoardsByUser(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    //board테이블에 접근할 것임.
    query.where('board.userId = :userId', { userId: user.id });
    //어떠한 조건에 맞는 게시물을 가져올 것인지.
    const boards = await query.getMany();
    //조건에 맞는 건 다 가져온다
    if (!boards) {
      throw new NotFoundException(`board with user ${user} not found`);
    }
    return boards;
  }
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const insertedData = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });
    await this.save(insertedData);
    return insertedData;
  }
  async deleteBoard(id: number, user: User): Promise<void> {
    const board = await this.getBoardById(id);

    if (board.userId !== user.id) {
      throw new NotFoundException(`니꺼 아닌데?`);
    }
    await this.delete(id);
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.save(board);
    return board;
  }
}
