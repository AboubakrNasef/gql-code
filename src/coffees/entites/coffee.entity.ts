import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Coffee {
  @Field(() => ID)
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
