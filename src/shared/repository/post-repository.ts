import { CrudRepository, Mapper } from './base/crud-repository';
import { Post } from '../post-model';

const { ENV } = process.env;

export class PostRepository extends CrudRepository<Post> {
  constructor() {
    super(`${ENV}-PostsTable`, new PostMapper());
  }
}

export class PostMapper extends Mapper<Post> {
  public map(raw: any): Post {
    return raw as Post;
  }
}

export const postRepository = new PostRepository();