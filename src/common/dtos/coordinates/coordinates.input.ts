import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CoordinatesInput {
  @Field(() => Number)
  lat: number;
  @Field(() => Number)
  lon: number;
}
