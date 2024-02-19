import { Module } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './starship.entity';
import { StarshipResolver } from './starship.resolver';
import { PlanetModule } from '@/planet/planet.module';

@Module({
  imports: [PlanetModule, TypeOrmModule.forFeature([Starship])],
  providers: [StarshipService, StarshipResolver],
  exports: [StarshipService],
})
export class StarshipModule {}
