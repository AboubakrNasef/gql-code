import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './teas/entities/tea.entity/tea.entity';
import { DrinksResolver } from './drinks/drinks.resolver';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5455,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphQL.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        orphanedTypes: [Tea],
      },
      installSubscriptionHandlers: true,
    }),
    CoffeesModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService, DrinksResolver],
})
export class AppModule {}
