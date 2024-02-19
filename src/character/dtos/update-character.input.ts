import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCharacterInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  species: string;

  @Field(() => Boolean, { nullable: true })
  forceSensitive: boolean;

  @Field(() => String, { nullable: true })
  starship: string;
}
