import { CoordinatesInput } from '@/common/dtos/coordinates/coordinates.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePlanetInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Number, { nullable: true })
  population: number;

  @Field(() => String, { nullable: true })
  climate: string;

  @Field(() => String, { nullable: true })
  terrain: string;

  @Field(() => CoordinatesInput, { nullable: true })
  currentLocation: CoordinatesInput;
}
