import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BoardingCharacterInput {
  @Field(() => String)
  starshipId: string;
}
