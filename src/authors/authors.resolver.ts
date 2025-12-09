import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { CreateAuthorInput } from './dto/create-author.input';
import { PostsService } from '../posts/posts.service';
import { Author } from '../graphql';

@Resolver('Author')
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Mutation('createAuthor')
  create(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput) {
    return this.authorsService.create(createAuthorInput);
  }

  @Mutation()
  upvotePost(@Args('postId') postId: number) {
    return this.postsService.upvoteById({ id: postId });
  }
  // @Query('authors')
  // findAll() {
  //   return this.authorsService.findAll();
  // }

  @Query('author')
  getAuthor(@Args('id') id: number) {
    return this.authorsService.findOne(id);
  }

  @ResolveField('posts')
  getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findMany({ authorId: id });
  }

  // @Mutation('updateAuthor')
  // update(@Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput) {
  //   return this.authorsService.update(updateAuthorInput.id, updateAuthorInput);
  // }

  // @Mutation('removeAuthor')
  // remove(@Args('id') id: number) {
  //   return this.authorsService.remove(id);
  // }
}
