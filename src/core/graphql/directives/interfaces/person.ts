import { ResolveField, Resolver } from '@nestjs/graphql';
import { Author } from '../../../../graphql';

@Resolver('Person')
export class PersonResolver {
  @ResolveField()
  __resolveType(value: Record<string, unknown>) {
    if ('posts' in value) {
      return Author;
    }

    return null;
  }
}
