import { registerEnumType } from '@nestjs/graphql';

export enum CoffeeType {
  ARABICA,
  ROBUSTA,
}

registerEnumType(CoffeeType);
