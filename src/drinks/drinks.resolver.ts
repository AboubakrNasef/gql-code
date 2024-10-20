import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entites/coffee.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { DrinksResultUnion } from 'src/common/unions/drinks-result.union';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async findAll() {
    const coffee: Coffee = { id: 1, brand: 'black', name: 'colombia' };
    const tea: Tea = { name: 'green Tea' };

    return [tea, coffee];
  }
}
