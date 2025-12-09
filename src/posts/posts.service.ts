import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { GraphQLError } from 'graphql/error';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findMany(entity: Pick<Post, 'authorId'>) {
    return this.posts.filter((post) => post.authorId === entity.authorId);
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((p) => p.id === id);
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  upvoteById(entity: Pick<Post, 'id'>) {
    const post = this.findOne(entity.id);
    if (!post) {
      throw new GraphQLError("can't find post");
    }

    post.votes++;

    return post;
  }
}
