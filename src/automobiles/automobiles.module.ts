import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Automobile } from './automobile.entity';
import { AutomobilesService } from './automobiles.service';
import { AutomobilesController } from './automobiles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Automobile])],
  controllers: [AutomobilesController],
  providers: [AutomobilesService],
  exports: [AutomobilesService],
})
export class AutomobilesModule {}
