import { InputType } from '@nestjs/graphql';
import { Flavor } from '../entites/flavor.entity';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';

@InputType()
export class CreateCoffeeInput {
  name: string;
  brand: string;
  flavors?: string[];
  type: CoffeeType;
}
