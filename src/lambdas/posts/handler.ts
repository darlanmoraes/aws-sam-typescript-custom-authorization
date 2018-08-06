import { APIGatewayProxyHandler } from 'aws-lambda';
import { postRepository } from '../../shared/repository/post-repository';
import { extract, isHttpPost, onSuccess, AppResponse } from '../../shared/base-http';
import { Post } from '../../shared/post-model';
import { OK, CREATED } from 'http-status-codes';

const execute: APIGatewayProxyHandler = async function (event, _context, _callback) {
  if (isHttpPost(event)) {
    const post = extract(event.body, Post);
    const entity = await postRepository.insert(post);
    return onSuccess(new AppResponse(entity, CREATED));
  } else {
    const data = await postRepository.findAll();
    return onSuccess(new AppResponse(data, OK));
  }
}

module.exports.execute = execute;