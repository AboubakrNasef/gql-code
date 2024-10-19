import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entites/coffee.entity';
import { UserInputError } from '@nestjs/apollo';
import { UpdateCoffeeInput } from './dto/update-coffee.input/update-coffee.input';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
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
    const coffee = this.coffeeRepository.create(createCoffeeInput);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
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
}
