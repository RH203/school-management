import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeederService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async seed(): Promise<void> {
    /*
     * Delete previous data (Optional) */
    await this.prisma.enrollment.deleteMany({});
    await this.prisma.student.deleteMany({});
    await this.prisma.class.deleteMany({});

    // Subjects
    const subjects = [
      'Mathematics',
      'Biology',
      'Chemistry',
      'Physics',
      'English Language',
      'History',
      'Geography',
      'Computer Science',
      'Physical Education',
      'Art',
    ];

    // Create data class
    const classes = await Promise.all(
      subjects.map(async (subject) => {
        return this.prisma.class.create({
          data: {
            subject,
          },
        });
      }),
    );

    // Create data students
    const students = await Promise.all(
      Array.from({ length: 10 }, async () => {
        return this.prisma.student.create({
          data: {
            name: faker.person.fullName(),
            address: faker.location.streetAddress(),
          },
        });
      }),
    );

    // Create enrollment
    for (const student of students) {
      const randomClasses = classes
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * classes.length) + 1);

      for (const cls of randomClasses) {
        await this.prisma.enrollment.create({
          data: {
            studentId: student.id,
            classId: cls.id,
          },
        });
      }
    }

    this.logger.log({
      message: 'Data seed successfully created',
      level: 'info',
    });
  }
}
