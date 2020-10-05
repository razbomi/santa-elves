import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { LetterSubscription } from "./subscription";

function beforeHandler(event: APIGatewayProxyEvent) {
  console.log("before");
  return JSON.parse(event.body);
}

function afterHandler<T>(response: T): APIGatewayProxyResult {
  console.log("after");
  return {
    statusCode: 200,
    body: JSON.stringify(response, null, 2),
  };
}

const common = <S, T>(
  handler: (event: S) => T
): APIGatewayProxyHandler => async (event: APIGatewayProxyEvent, _context) => {
  try {
    const body = beforeHandler(event);
    const response = handler(body);
    return afterHandler(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSubscriptions = common((event) => {
  return event;
});

export const postSubscription = common((event: LetterSubscription) => {
  return event;
});

export const echo = async (event, _context) => {
  console.log(event);
  return new Promise((resolve,_) => {
    resolve(event)
  });
};
