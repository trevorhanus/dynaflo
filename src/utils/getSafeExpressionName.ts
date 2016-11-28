import {generate} from 'randomstring';

let pastNames: string[] = [];

export default function getSafeExpressionName(): string {
  const options = {
    length: 8,
    charset: 'alphabetic'
  };
  let name = '#' + generate(options);
  let duplicate = pastNames.indexOf(name) > 0 ? true : false;
  while (duplicate) {
    name = '#' + generate(options);
    duplicate = pastNames.indexOf(name) > 0 ? true : false;
  }
  pastNames.push(name);
  return name;
}
