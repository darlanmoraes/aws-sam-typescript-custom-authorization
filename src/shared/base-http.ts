import { OK } from 'http-status-codes';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export function isHttpPost(event: APIGatewayEvent) {
  return event && event.httpMethod === 'POST';
}

export class AppResponse {
  constructor(public message: any, public status: number, public code?: number) { }
}

export const baseHeaders = (headers: {} = {}) => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
    ...headers
  };
};

export function extract<T>(json: string, type : { new(): T ;}): T {
  const target = new type();
  const parsed = JSON.parse(json);
  Object.keys(parsed)
    .forEach(key => target[key] = parsed[key]);
  return target;
}

export function onSuccess(response: AppResponse): APIGatewayProxyResult {
  return {
    statusCode: response.status,
    headers: baseHeaders(),
    body: response ? JSON.stringify(response): undefined,
  };
}