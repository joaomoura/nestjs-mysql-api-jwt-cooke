import { Module } from '@nestjs/common';
import { ParksService } from './parks.service';
import { ParksController } from './parks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Park } from './park.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Park])],
  controllers: [ParksController],
  providers: [ParksService],
  exports: [ParksService],
})
export class ParksModule {}
