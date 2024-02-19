import { Module } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './planet.entity';
import { PlanetResolver } from './planet.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  providers: [PlanetService, PlanetResolver],
  exports: [PlanetService],
})
export class PlanetModule {}
