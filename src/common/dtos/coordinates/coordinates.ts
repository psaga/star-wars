import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class Coordinates {
  @Field()
  @Column({ type: 'float', nullable: false })
  lat: number;

  @Field()
  @Column({ type: 'float', nullable: false })
  lon: number;
}
