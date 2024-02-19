import { Planet } from '@/planet/planet.entity';
import { Starship } from '@/starship/starship.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Character {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  species: string;

  @Field()
  @Column({ type: Boolean, default: false })
  forceSensitive: boolean;

  @Field(() => Planet)
  @ManyToOne(() => Planet, (planet) => planet.characters)
  currentLocation: Planet;

  @Field(() => Starship, { nullable: true })
  @ManyToOne(() => Starship, (starship) => starship.passangers)
  starship: Starship;
}
