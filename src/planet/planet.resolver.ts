import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { PlanetService } from './planet.service';
import { Planet } from './planet.entity';
import { CreatePlanetInput } from './dtos/create-planet.input';
import { UpdatePlanetInput } from './dtos/update-planet.input';

@Resolver(() => Planet)
export class PlanetResolver {
  constructor(private readonly planetService: PlanetService) {}

  @Mutation(() => Planet)
  async createPlanet(
    @Args('createPlanetInput') createPlanetInput: CreatePlanetInput,
  ): Promise<Planet> {
    return await this.planetService.create(createPlanetInput);
  }

  @Mutation(() => Boolean, { name: 'updatePlanet' })
  update(
    @Args('id') planetId: string,
    @Args('updatePlanetInput') updatePlanetInput: UpdatePlanetInput,
  ): Promise<boolean> {
    return this.planetService.update(planetId, updatePlanetInput);
  }

  @Mutation(() => Boolean, { name: 'deletePlanet' })
  delete(@Args('id') planetId: string): Promise<boolean> {
    return this.planetService.delete(planetId);
  }

  @Query(() => Planet, { name: 'planet' })
  async getPlanet(@Args('id') id: string): Promise<Planet> {
    return this.planetService.get(id);
  }
}
