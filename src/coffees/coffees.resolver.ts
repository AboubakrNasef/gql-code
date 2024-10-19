import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entites/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class CoffeesResolver {
  @Query(() => [Coffee], { name: 'coffees' })
  async FindAll() {
    return [];
  }
  @Query(() => Coffee, { name: 'coffee', nullable: true })
  async FindOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return null;
  }
}
