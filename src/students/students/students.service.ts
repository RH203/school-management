import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { ValidationService } from '../../validation/validation/validation.service';
import { StudentDto } from '../../dtos/student.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class StudentsService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Get data students
  async get(): Promise<StudentDto[]> {
    try {
      const enrollments = await this.prismaService.enrollment.findMany({
        include: {
          student: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
          class: {
            select: {
              id: true,
              subject: true,
            },
          },
        },
      });

      const studentMap = new Map<number, StudentDto>();

      enrollments.forEach((enrollment) => {
        const studentId = enrollment.student.id;

        // Jika siswa belum ada dalam peta, tambahkan
        if (!studentMap.has(studentId)) {
          studentMap.set(studentId, {
            id: studentId,
            name: enrollment.student.name,
            address: enrollment.student.address,
            subjects: [],
          });
        }

        // Tambahkan subjek ke array subjects
        studentMap.get(studentId)?.subjects.push({
          id: enrollment.class.id, // Ambil id dari kelas
          subject: enrollment.class.subject, // Ambil subjek dari kelas
        });
      });

      return Array.from(studentMap.values());
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
