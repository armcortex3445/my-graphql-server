import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { GraphQLError } from 'graphql/error';
import { mockPosts } from '../_mock_/posts';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: PostEntity[] = mockPosts;
  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findMany(entity: Pick<PostEntity, 'authorId'>) {
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

  upvoteById(entity: Pick<PostEntity, 'id'>) {
    const post = this.findOne(entity.id);
    if (!post) {
      throw new GraphQLError("can't find post");
    }

    post.votes++;

    return post;
  }
}
