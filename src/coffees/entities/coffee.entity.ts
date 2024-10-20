import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';
import { loggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Entity()
@ObjectType({ implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @MinLength(3)
  @Field({ middleware: [loggerMiddleware] })
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;
  @Column()
  type: CoffeeType;
}
