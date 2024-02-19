import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './character.entity';
import { CreateCharacterInput } from './dtos/create-character.input';
import { UpdateCharacterInput } from './dtos/update-character.input';
import { RelocateCharacterInput } from './dtos/relocate-character.input';
import { BoardingCharacterInput } from './dtos/boarding-character.input';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Mutation(() => Character)
  async createCharacter(
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ): Promise<Character> {
    return await this.characterService.create(createCharacterInput);
  }

  @Mutation(() => Boolean, { name: 'updateCharacter' })
  update(
    @Args('id') characterId: string,
    @Args('updateCharacterInput') updateCharacterInput: UpdateCharacterInput,
  ): Promise<boolean> {
    return this.characterService.update(characterId, updateCharacterInput);
  }

  @Mutation(() => Boolean, { name: 'relocateCharacter' })
  relocate(
    @Args('id') characterId: string,
    @Args('relocateCharacterInput')
    relocateCharacterInput: RelocateCharacterInput,
  ): Promise<boolean> {
    return this.characterService.relocate(characterId, relocateCharacterInput);
  }

  @Mutation(() => Boolean, { name: 'deleteCharacter' })
  delete(@Args('id') characterId: string): Promise<boolean> {
    return this.characterService.delete(characterId);
  }

  @Mutation(() => Boolean, { name: 'boarding' })
  async boarding(
    @Args('id') characterId: string,
    @Args('boardingCharacterInput')
    boardingCharacterInput: BoardingCharacterInput,
  ): Promise<boolean> {
    return this.characterService.boarding(characterId, boardingCharacterInput);
  }

  @Mutation(() => Boolean, { name: 'disembarking' })
  async disembarking(
    @Args('id') characterId: string,
    @Args('boardingCharacterInput')
    boardingCharacterInput: BoardingCharacterInput,
  ): Promise<boolean> {
    return this.characterService.disembarking(
      characterId,
      boardingCharacterInput,
    );
  }

  @Query(() => Character, { name: 'character' })
  async getCharacter(@Args('id') id: string): Promise<Character> {
    return this.characterService.get(id);
  }
}
