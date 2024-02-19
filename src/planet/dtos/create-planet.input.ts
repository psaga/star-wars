import { CoordinatesInput } from '@/common/dtos/coordinates/coordinates.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePlanetInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  population: number;

  @Field(() => String)
  climate: string;

  @Field(() => String)
  terrain: string;

  @Field(() => CoordinatesInput)
  currentLocation: CoordinatesInput;
}
