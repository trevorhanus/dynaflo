import Attribute from '../conditions/Attribute';

export default function getAttributesForPluckParams(topLevelOrNestedAttributes: (string|Object)[]): Attribute[] {
  let pluckAttributes: Attribute[] = [];
  topLevelOrNestedAttributes.forEach(attr => {
    switch(typeof attr) {
      case 'string':
        pluckAttributes.push(new Attribute(attr));
        break;
      case 'object':
        // TODO: Allow for shorthand syntax {topLevel: { nested: ['nested1', 'nested2']}}
        pluckAttributes.push(new Attribute(attr));
        break;
    }
  });
  return pluckAttributes;
}
