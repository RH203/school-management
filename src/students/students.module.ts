import { Module } from '@nestjs/common';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ValidationService } from '../validation/validation/validation.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, ValidationService],
  imports: [PrismaModule],
})
export class StudentsModule {}
