import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { CharacterResolver } from './character.resolver';
import { PlanetModule } from '@/planet/planet.module';
import { StarshipModule } from '@/starship/starship.module';

@Module({
  imports: [
    StarshipModule,
    PlanetModule,
    TypeOrmModule.forFeature([Character]),
  ],
  providers: [CharacterService, CharacterResolver],
  exports: [CharacterService],
})
export class CharacterModule {}
