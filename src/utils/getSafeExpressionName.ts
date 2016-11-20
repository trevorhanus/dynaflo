import {generate} from 'randomstring';

export default function getSafeExpressionName(): string {
  const options = {
    length: 8,
    charset: 'alphabetic'
  };
  return '#' + generate(options);
}