import { ObjectType } from '@nestjs/graphql';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { Column, Entity } from 'typeorm';

@ObjectType({ implements: () => Drink })
@Entity()
export class Tea implements Drink {
  @Column()
  name: string;
}
