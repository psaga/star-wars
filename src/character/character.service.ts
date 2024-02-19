import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './character.entity';
import { CreateCharacterInput } from './dtos/create-character.input';
import { UpdateCharacterInput } from './dtos/update-character.input';
import { PlanetService } from '@/planet/planet.service';
import { RelocateCharacterInput } from './dtos/relocate-character.input';
import { StarshipService } from '@/starship/starship.service';
import { BoardingCharacterInput } from './dtos/boarding-character.input';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly planetService: PlanetService,
    private readonly starshipService: StarshipService,
  ) {}

  async create(createCharacterInput: CreateCharacterInput): Promise<Character> {
    const planet = await this.planetService.get(
      createCharacterInput.currentLocation,
    );

    if (!planet) {
      throw new Error('Planet not found');
    }

    const newCharacter = this.characterRepository.create({
      ...createCharacterInput,
      currentLocation: planet,
    });
    return await this.characterRepository.save(newCharacter);
  }

  async get(id: string): Promise<Character> {
    return await this.characterRepository.findOne({
      where: { id },
      relations: ['currentLocation'],
    });
  }

  async update(id: string, update: UpdateCharacterInput): Promise<boolean> {
    const starship = await this.starshipService.get(update.starship);

    if (!starship) {
      throw new Error('Starship not found');
    }

    const characterUpdated = await this.characterRepository.update(id, {
      ...update,
      starship,
    });
    return characterUpdated.affected > 0;
  }

  async relocate(
    id: string,
    relocate: RelocateCharacterInput,
  ): Promise<boolean> {
    const character = await this.characterRepository.findOne({
      where: { id: id },
      relations: ['currentLocation'],
    });
    const planet = await this.planetService.get(relocate.relocatedLocation);
    if (!planet) {
      throw new Error('Planet not found');
    }
    if (character.currentLocation.id === planet.id) {
      throw new Error('Character is currently in the planet to relocate');
    }
    const characterUpdated = await this.characterRepository.update(id, {
      ...character,
      currentLocation: planet,
    });
    return characterUpdated.affected > 0;
  }

  async boarding(
    id: string,
    boardingInput: BoardingCharacterInput,
  ): Promise<boolean> {
    const starship = await this.starshipService.get(boardingInput.starshipId);

    if (!starship) {
      throw new Error('Starship not found');
    }

    const character = await this.characterRepository.findOne({
      where: { id },
      relations: ['starship'],
    });

    if (!character) {
      throw new Error('Character does not exist');
    }

    if (character.starship) {
      throw new Error('Character is already aboard of a starship');
    }
    const characterUpdated = await this.characterRepository.update(id, {
      ...character,
      starship,
    });

    return characterUpdated.affected > 0;
  }

  async disembarking(
    id: string,
    boardingInput: BoardingCharacterInput,
  ): Promise<boolean> {
    const starship = await this.starshipService.get(boardingInput.starshipId);

    if (!starship) {
      throw new Error('Starship not found');
    }

    const character = await this.characterRepository.findOne({
      where: { id },
      relations: ['starship'],
    });

    if (!character) {
      throw new Error('Character does not exist');
    }

    if (!character.starship) {
      throw new Error('Character is not aboard');
    }

    const starshipUpdated = await this.characterRepository.update(id, {
      ...character,
      starship: null,
    });
    return starshipUpdated.affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    const characterDeleted = await this.characterRepository.delete(id);
    return characterDeleted.affected > 0;
  }
}
