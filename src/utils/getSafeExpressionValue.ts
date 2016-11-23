import {generate} from 'randomstring';

let pastValues: string[] = [];

export default function getSafeExpressionValue(): string {
  const options = {
    length: 8,
    charset: 'alphabetic'
  };
  let value = ':' + generate(options);
  let duplicate = pastValues.indexOf(value) > 0 ? true : false;
  while (duplicate) {
    value = ':' + generate(options);
    duplicate = pastValues.indexOf(value) > 0 ? true : false;
  }
  pastValues.push(value);
  return value;
}