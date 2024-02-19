import { Character } from '@/character/character.entity';
import { Coordinates } from '@/common/dtos/coordinates/coordinates';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Starship {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  model: string;

  @Field()
  @Column({ type: Number, nullable: false })
  capacity: number;

  @Field(() => Coordinates)
  @Column(() => Coordinates)
  currentLocation: Coordinates;

  @Field(() => [Character], { nullable: true })
  @OneToMany(() => Character, (character) => character.starship, {
    cascade: true,
  })
  passangers: Character[];

  @Field(() => [Starship], { nullable: true })
  @ManyToMany(() => Starship, (starship) => starship.enemies)
  @JoinTable()
  enemies: Starship[];
}
