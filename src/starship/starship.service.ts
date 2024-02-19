import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Starship } from './starship.entity';
import { PlanetService } from '@/planet/planet.service';
import { UpdateStarshipInput } from './dtos/update-starship.input';
import { CreateStarshipInput } from './dtos/create-starship.input';
import { getDistance, isPointWithinRadius } from 'geolib';
import { TravellingStarshipInput } from './dtos/travelling-starship.input';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
    private readonly planetService: PlanetService,
  ) {}

  async create(createStarshipInput: CreateStarshipInput): Promise<Starship> {
    const starshipEnemies = await this.starshipRepository.findBy({
      id: In(createStarshipInput.enemies),
    });
    const newStarship = this.starshipRepository.create({
      ...createStarshipInput,
      enemies: starshipEnemies,
    });
    return await this.starshipRepository.save(newStarship);
  }

  async get(id: string): Promise<Starship> {
    return await this.starshipRepository.findOne({
      where: { id },
      relations: ['enemies', 'passangers'],
    });
  }

  async update(id: string, update: UpdateStarshipInput): Promise<boolean> {
    const starshipUpdated = await this.starshipRepository.update(id, update);
    return starshipUpdated.affected > 0;
  }

  async calculateDistanceStarshipPlanet(
    id: string,
    planetId: string,
  ): Promise<number> {
    const starship = await this.starshipRepository.findOneBy({ id });

    if (!starship) {
      throw new Error('Starship not found');
    }

    const planet = await this.planetService.get(planetId);

    if (!planet) {
      throw new Error('Planet does not exist');
    }

    const distanceInKm =
      getDistance(
        {
          latitude: starship.currentLocation.lat,
          longitude: starship.currentLocation.lon,
        },
        {
          latitude: planet.currentLocation.lat,
          longitude: planet.currentLocation.lon,
        },
      ) / 1000;

    return distanceInKm;
  }

  async detectNearbyEnemies(id: string, rangeKm: number): Promise<Starship[]> {
    const starship = await this.starshipRepository.findOne({
      where: { id },
      relations: ['enemies'],
    });

    if (!starship) {
      throw new Error('Starship not found');
    }
    console.log(starship);
    console.log(starship.enemies);
    const nearbyEnemies = starship.enemies.filter((enemyStarship) =>
      isPointWithinRadius(
        {
          latitude: starship.currentLocation.lat,
          longitude: starship.currentLocation.lon,
        },
        {
          latitude: enemyStarship.currentLocation.lat,
          longitude: enemyStarship.currentLocation.lon,
        },
        rangeKm * 1000,
      ),
    );
    return nearbyEnemies;
  }

  async spawnEnemies(id: string): Promise<Starship[]> {
    const starship = await this.starshipRepository.findOneBy({ id });
    if (!starship) {
      throw new Error('Starship not found');
    }
    const enemiesToCreate = this.randomInt(1, 5);
    const enemies: Starship[] = [];
    for (let idxEnemy = 0; idxEnemy < enemiesToCreate; idxEnemy++) {
      const randomDistanceSideLat = Math.random() < 0.5 ? -1 : 1;
      const randomDistanceSideLon = Math.random() < 0.5 ? -1 : 1;

      const enemyToCreate = idxEnemy + 1;
      const enemy = {
        name: `Enemy ${enemyToCreate}`,
        model: `Starship Turbo ${enemyToCreate}`,
        capacity: 100,
        currentLocation: {
          lat:
            starship.currentLocation.lat +
            randomDistanceSideLat * (Math.random() / 2) * enemyToCreate,
          lon:
            starship.currentLocation.lon +
            randomDistanceSideLon * (Math.random() / 2) * enemyToCreate,
        },
        enemies: [starship.id],
      };
      const enemyCreated = await this.create(enemy);
      enemies.push(enemyCreated);
    }

    return enemies;
  }

  async travel(
    id: string,
    travellingInput: TravellingStarshipInput,
  ): Promise<boolean> {
    const starship = await this.starshipRepository.findOneBy({ id });

    if (!starship) {
      throw new Error('Starship not found');
    }

    const planet = await this.planetService.get(travellingInput.planetId);

    if (!planet) {
      throw new Error('Planet does not exist');
    }

    const planetLocation = planet.currentLocation;

    const starshipUpdated = await this.starshipRepository.update(id, {
      ...starship,
      currentLocation: planetLocation,
    });
    return starshipUpdated.affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    await this.starshipRepository
      .createQueryBuilder()
      .delete()
      .from('starship_enemies_starship')
      .where('starshipId_1 = :id OR starshipId_2 = :id', {
        id,
      })
      .execute();
    const starshipDeleted = await this.starshipRepository.delete(id);
    return starshipDeleted.affected > 0;
  }

  randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
