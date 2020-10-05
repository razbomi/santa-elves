import "source-map-support/register";
import { CommonHandler } from "./gateway";
import { SES } from "aws-sdk";
import { Sender } from "./email";
import { 
  Subscription,
  SubscriptionTrasformer,
} from "./subscription";

const ses = new SES({ region: process.env.SES_REGION });

export const unsubscribe = CommonHandler.common((event: Subscription) => {
  return event;
});

export const sendEmail = async (event: Subscription, _context) => {
  await new Sender(ses).send(event);
  return p(event);
};

export const typeformToSubscription = async (event, _context) => {
  const answers = SubscriptionTrasformer.transform(event)
  return p(answers);
};

function p(event) {
  return new Promise((resolve, _) => {
    resolve(event);
  });
}
