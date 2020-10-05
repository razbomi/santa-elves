import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import "source-map-support/register";
import { Subscription } from "./subscription";

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
Subscription
export const postSubscription = common((event: Subscription) => {
  return event;
});

export const echo = async (event, _context) => {
  console.log(event);
  return new Promise((resolve,_) => {
    resolve(event)
  });
};

export const typeformToSubscription = async (event, _context) => {
  const answers: Subscription = event['form_response']['answers'].map(a => {
    return [a.field.ref, a[a.type]]
  }).reduce((a, b) =>{
    a[b[0]] = b[1]
    return a
  }, {});

  return new Promise((resolve,_) => { 
    resolve(answers)
  });
};