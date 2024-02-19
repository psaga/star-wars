import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TravellingStarshipInput {
  @Field(() => String)
  planetId: string;
}
