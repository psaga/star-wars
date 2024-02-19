import { CoordinatesInput } from '@/common/dtos/coordinates/coordinates.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStarshipInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  model: string;

  @Field(() => Number, { nullable: true })
  capacity: number;

  @Field(() => CoordinatesInput, { nullable: true })
  currentLocation: CoordinatesInput;
}
