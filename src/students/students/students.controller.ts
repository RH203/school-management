import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { StudentDto } from '../../common/dtos/student.dto';
import { StudentsService } from './students.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('/api/students')
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}
  // Fetch all data students
  @Get()
  get(): Promise<StudentDto[]> {
    try {
      return this.studentsService.get();
    } catch (e) {
      this.logger.error({
        level: 'error',
        message: e.message,
      });
    }
  }

  // Fetch one data student by id
  @Get('/:id')
  getById(@Query('id') id: number): Promise<StudentDto> {
    try {
      const student = this.studentsService.getDataById(id);
      return;
    } catch (e) {
      this.logger.error({
        level: 'error',
        message: e.message,
      });
      throw new Error('Failed to get student');
    }
  }

  // Edit data students
  // Delete data students
}
