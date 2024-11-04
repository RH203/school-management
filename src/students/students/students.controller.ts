import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { StudentDto } from '../../dtos/student.dto';
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

  // Edit data students
  // Delete data students
}
