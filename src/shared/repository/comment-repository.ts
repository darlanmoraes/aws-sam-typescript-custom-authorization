import { CrudRepository, Mapper } from './base/crud-repository';
import { Comment } from '../comment-model';

const { ENV } = process.env;

export class CommentRepository extends CrudRepository<Comment> {
  constructor() {
    super(`${ENV}-CommentsTable`, new CommentMapper());
  }
}

export class CommentMapper extends Mapper<Comment> {
  public map(raw: any): Comment {
    return raw as Comment;
  }
}

export const commentRepository = new CommentRepository();