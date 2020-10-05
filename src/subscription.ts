type Email = string;

export interface Subscription {
  email: Email;
  firstname: string;
  gender: string;
  answer: string;
  age: Number;
  city: string;
}

function answers(event) {
  return event["form_response"]["answers"]
}

function toKeyValuePair(a) {
  return [
    fieldKey(a), 
    fieldValue(a)
  ];
}

function fieldKey(a) {
  return a.field.ref
}

function fieldValue(a) {
  switch(a.type) {
    case 'choice': return a[a.type].label
    case 'choices': return a[a.type].labels.join()
    default: return a[a.type]
  }
}

function collectPropertyFields(a, b) {
  a[b[0]] = b[1];
  return a;
}

export class SubscriptionTrasformer {
  static transform(event): Subscription {
    return answers(event)
      .map(toKeyValuePair)
      .reduce(collectPropertyFields, {});
  }
}
