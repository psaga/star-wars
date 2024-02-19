import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RelocateCharacterInput {
  @Field(() => String)
  relocatedLocation: string;
}
