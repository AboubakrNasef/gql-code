import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entites/coffee.entity';
import { Flavor } from './entites/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  providers: [CoffeesResolver, CoffeesService],
})
export class CoffeesModule {}
