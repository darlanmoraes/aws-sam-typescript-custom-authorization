import { APIGatewayProxyHandler } from 'aws-lambda';
import { commentRepository } from '../../shared/repository/comment-repository';
import { extract, isHttpPost, onSuccess, AppResponse } from '../../shared/base-http';
import { Comment } from '../../shared/comment-model';
import { OK, CREATED } from 'http-status-codes';

const execute: APIGatewayProxyHandler = async function (event, _context, _callback) {
  if (isHttpPost(event)) {
    const comment = extract(event.body, Comment);
    const entity = await commentRepository.insert(comment);
    return onSuccess(new AppResponse(entity, CREATED));
  } else {
    const data = await commentRepository.findAll();
    return onSuccess(new AppResponse(data, OK));
  }
}

module.exports.execute = execute;