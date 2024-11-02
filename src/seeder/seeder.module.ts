import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SeederService } from './seeder/seeder.service';

@Module({
  providers: [SeederService],
  imports: [PrismaModule],
  exports: [SeederService],
})
export class SeederModule {}
