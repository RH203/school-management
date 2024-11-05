import { Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma/prisma.service";
import { ValidationService } from "../../validation/validation/validation.service";
import { StudentDto } from "../../common/dtos/student.dto";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class StudentsService extends AbstractCrudService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    super();
  }

  // Get data students
  async get() {
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

  // delete data by id
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  delete(id: number): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await this.prismaService.student.delete({ where: { id } });
    } catch (e) {
      this.logger.error({
        level: 'error',
        message: e.message,
      });
      throw new Error('Failed to delete the student');
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  edit(id: number): Promise<void> {

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await this.prismaService.student.delete({ where: { id } });
    } catch (e) {
      this.logger.error({
        level: 'error',
        message: e.message,
      });
      throw new Error('Failed to delete the student');
    }
  }

  // Fetch one data student by id
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  getDataById(id: number): Promise<T> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const student = await this.prismaService.student.findFirst({
        where: { id },
      });
      if (!student) return null

        const subjects = await this.prismaService.





    } catch (e) {
      this.logger.error({
        level: 'error',
        message: e.message,
      });
      throw new Error('Failed to get the student');
    }
  }

  // Edit data students
  // Delete data students
}
