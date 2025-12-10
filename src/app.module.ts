import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { GraphQLDateTimeISO, GraphQLJSON } from 'graphql-scalars';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      typePaths: ['./src/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      subscriptions: {
        'graphql-ws': true,
      },
      resolvers: { JSON: GraphQLJSON, DATE: GraphQLDateTimeISO },
    }),
    AuthorsModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
