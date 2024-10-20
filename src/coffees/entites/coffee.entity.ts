import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
@ObjectType()
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;
  @Column()
  @MinLength(3)
  name: string;
  @Column()
  brand: string;
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];
}
