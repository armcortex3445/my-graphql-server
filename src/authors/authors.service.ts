import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { mockAuthors } from '../_mock_/authors';
import { AuthorEntity } from './entities/author.entity';
@Injectable()
export class AuthorsService {
  private authors: AuthorEntity[] = mockAuthors;
  create(createAuthorInput: CreateAuthorInput) {
    return 'This action adds a new author';
  }

  findAll() {
    return this.authors;
  }

  findOne(id: number) {
    return this.authors.find((author) => author.id === id);
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
