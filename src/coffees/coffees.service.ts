import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entites/coffee.entity';
import { UserInputError } from '@nestjs/apollo';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Flavor } from './entites/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  async findAll() {
    return this.coffeeRepository.find();
  }
  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });

    if (!coffee) {
      throw new UserInputError(`coffee with #${id} doesn't not exist`);
    }
    return coffee;
  }
  async create(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeInput,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });

    if (!coffee) {
      throw new UserInputError(`coffee with #${id} doesn't not exist`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string) {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
