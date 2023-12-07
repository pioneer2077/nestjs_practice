import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { create } from 'domain';
import { CreateBoardDto } from './Dto/boards.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './boards-status.enum';
import { Board } from './Entity/boards.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/Decorator/get-user.decorator';
import { User } from 'src/auth/Entity/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/user')
  getBoardsByUser(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getBoardsByUser(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  //   @Patch('/:id/status')
  //   updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //   ): Board {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }
}
