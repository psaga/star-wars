import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCharacterInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  species: string;

  @Field(() => Boolean)
  forceSensitive: boolean;

  @Field(() => String)
  currentLocation: string;
}
