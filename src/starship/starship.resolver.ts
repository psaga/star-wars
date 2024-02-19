import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { StarshipService } from './starship.service';
import { Starship } from './starship.entity';
import { CreateStarshipInput } from './dtos/create-starship.input';
import { UpdateStarshipInput } from './dtos/update-starship.input';
import { TravellingStarshipInput } from './dtos/travelling-starship.input';

@Resolver(() => Starship)
export class StarshipResolver {
  constructor(private readonly starshipService: StarshipService) {}

  @Mutation(() => Starship)
  async createStarship(
    @Args('createStarshipInput') createStarshipInput: CreateStarshipInput,
  ): Promise<Starship> {
    return await this.starshipService.create(createStarshipInput);
  }

  @Mutation(() => Boolean, { name: 'updateStarship' })
  async update(
    @Args('id') id: string,
    @Args('updateStarshipInput') updateStarshipInput: UpdateStarshipInput,
  ): Promise<boolean> {
    return this.starshipService.update(id, updateStarshipInput);
  }

  @Mutation(() => Boolean, { name: 'deleteStarship' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return await this.starshipService.delete(id);
  }

  @Mutation(() => [Starship], { name: 'spawnEnemies' })
  async spawnEnemies(@Args('id') starshipId: string): Promise<Starship[]> {
    return this.starshipService.spawnEnemies(starshipId);
  }

  @Mutation(() => Boolean, { name: 'travelTo' })
  async travelTo(
    @Args('id') starshipId: string,
    @Args('travellingStarshipInput')
    travellingStarshipInput: TravellingStarshipInput,
  ): Promise<boolean> {
    return this.starshipService.travel(starshipId, travellingStarshipInput);
  }

  @Query(() => Starship, { name: 'starship' })
  async getStarship(@Args('id') id: string): Promise<Starship> {
    return this.starshipService.get(id);
  }

  @Query(() => Number, { name: 'distanceToPlanet' })
  async calculateDistance(
    @Args('id') id: string,
    @Args('planetId') planetId: string,
  ): Promise<number> {
    return this.starshipService.calculateDistanceStarshipPlanet(id, planetId);
  }

  @Query(() => [Starship], { name: 'nearbyEnemies' })
  async detectNearbyEnemies(
    @Args('id') id: string,
    @Args('rangeKm') rangeKm: number,
  ): Promise<Starship[]> {
    return this.starshipService.detectNearbyEnemies(id, rangeKm);
  }
}
