import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';
import { DrinksResultUnion } from 'src/common/unions/drinks-result.union';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async findAll() {
    const coffee: Coffee = {
      id: 1,
      brand: 'black',
      name: 'colombia',
      type: CoffeeType.ARABICA,
    };
    const tea: Tea = { name: 'green Tea' };

    return [tea, coffee];
  }
}
