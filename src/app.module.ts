import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { WinstonModule } from 'nest-winston';
import { SeederModule } from './seeder/seeder.module';
import * as winston from 'winston';
import { SeederService } from './seeder/seeder/seeder.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.cli(),
      transports: [new winston.transports.Console()],
    }),
    PrismaModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, SeederService],
})
export class AppModule {}
