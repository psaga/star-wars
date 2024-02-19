import { CoordinatesInput } from '@/common/dtos/coordinates/coordinates.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStarshipInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  model: string;

  @Field(() => Number)
  capacity: number;

  @Field(() => CoordinatesInput)
  currentLocation: CoordinatesInput;

  @Field(() => [String])
  enemies: string[];
}
