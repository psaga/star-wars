import { Character } from '@/character/character.entity';
import { Coordinates } from '@/common/dtos/coordinates/coordinates';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Planet {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  population: number;

  @Field()
  @Column({ nullable: false })
  climate: string;

  @Field()
  @Column()
  terrain: string;

  @Field(() => Coordinates)
  @Column(() => Coordinates)
  currentLocation: Coordinates;

  @Field(() => [Character], { nullable: true })
  @OneToMany(() => Character, (character) => character.currentLocation, {
    cascade: true,
  })
  characters: Character[];
}
