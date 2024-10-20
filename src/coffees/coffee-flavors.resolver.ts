import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from './entites/coffee.entity';
import { Flavor } from './entites/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}

  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
