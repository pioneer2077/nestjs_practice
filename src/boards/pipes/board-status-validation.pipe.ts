import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boards-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isValidationStatus(value)) {
      throw new Error('invalid status');
    }
    return value;
  }

  private isValidationStatus(status: any) {
    const isValidate = this.StatusOptions.indexOf(status);
    return isValidate !== -1;
  }
}
