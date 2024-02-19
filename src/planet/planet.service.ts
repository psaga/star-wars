import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planet } from './planet.entity';
import { CreatePlanetInput } from './dtos/create-planet.input';
import { UpdatePlanetInput } from './dtos/update-planet.input';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
  ) {}

  async create(createPlanetInput: CreatePlanetInput): Promise<Planet> {
    const newPlanet = this.planetRepository.create(createPlanetInput);
    return await this.planetRepository.save(newPlanet);
  }

  async get(id: string): Promise<Planet> {
    return await this.planetRepository.findOneBy({ id });
  }

  async update(id: string, update: UpdatePlanetInput): Promise<boolean> {
    const planetUpdated = await this.planetRepository.update(id, update);
    return planetUpdated.affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    const planetUpdated = await this.planetRepository.delete(id);
    return planetUpdated.affected > 0;
  }
}
