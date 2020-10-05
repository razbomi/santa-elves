import {
    APIGatewayProxyEvent,
    APIGatewayProxyHandler,
    APIGatewayProxyResult,
  } from "aws-lambda";

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
  
export class CommonHandler {
    static common<S, T>(handler: (event: S) => T): APIGatewayProxyHandler {
        return async (event: APIGatewayProxyEvent, _context) => {
            try {
                const body = beforeHandler(event);
                const response = handler(body);
                return afterHandler(response);
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    }
}