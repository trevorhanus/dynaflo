import Attribute from '../conditions/Attribute';
import { forIn, isPlainObject, reduceRight } from 'lodash';

export default function getAttributesForPluckParams(topLevelOrNestedAttributes: (string | {[key: string]: any})[]): Attribute[] {
    let pluckAttributes: Attribute[] = [];
    topLevelOrNestedAttributes.forEach(attr => {
        switch (typeof attr) {
            case 'string':
                pluckAttributes.push(new Attribute(attr));
                break;
            case 'object':
                const attributes = getAttributesFromNestedObject(attr as {[key: string]: any});
                // TODO: Allow for shorthand syntax {topLevel: { nested: ['nested1', 'nested2']}}
                attributes.forEach(nestedAttribute => {
                    pluckAttributes.push(new Attribute(nestedAttribute));
                });
                break;
        }
    });
    return pluckAttributes;
}

export function getAttributesFromNestedObject(nestedObject: {[key: string]: any}) {
    const nestedObjects: Object[] = [];
    recurse(nestedObject, []);
    return nestedObjects;

    function recurse(nestedObject: {[key: string]: any}, path: string[]) {
        forIn(nestedObject, (value, key) => {
            const isObject = isPlainObject(value);
            const isArray = Array.isArray(value);
            if (isObject) {
                recurse(value, path.concat(key));
            } else if (isArray) {
                let pathToArray = path.concat(key);
                value.forEach(key => {
                    nestedObjects.push(nestedAttributeFromPath(pathToArray.concat(key)));
                });
            }
            else if (value === true) {
                nestedObjects.push(nestedAttributeFromPath(path.concat(key)));
            } else {
                throw new Error()
            }
        });
    }
}

function nestedAttributeFromPath(path: string[]) {
    return reduceRight(path, (nested, key) => {
        let parent = {};
        parent[key] = nested;
        return parent;
    }, true);
}
