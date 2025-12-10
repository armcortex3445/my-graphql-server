import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { GraphQLError } from 'graphql/error';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  // @Mutation('createPost')
  // create(@Args('createPostInput') createPostInput: CreatePostInput) {
  //   return this.postsService.create(createPostInput);
  // }

  @Query('posts')
  findAll() {
    return this.postsService.findAll();
  }

  //TODO 질문 : resolver의 반환 타입과 graphql 타입을 자동으로 매칭할 수 있는가?
  @Query('post')
  findOne(@Args('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Query('invalidPost')
  getInvalidOne(@Args('id') id: number) {
    //TODO 질문 : Resolver 반환 타입과 graphql 스키마 타입이 매칭되지 않으면 nestjs에서 어떻게 처리하는가?
    const post = this.postsService.findOne(id);

    if (!post) {
      throw new GraphQLError(`not found postId ${id}`);
    }

    const ret = { ...post, createdAt: 'post.createdAt.getDate()' };

    return ret;
  }

  // @Mutation('updatePost')
  // update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postsService.update(updatePostInput.id, updatePostInput);
  // }

  // @Mutation('removePost')
  // remove(@Args('id') id: number) {
  //   return this.postsService.remove(id);
  // }
}
