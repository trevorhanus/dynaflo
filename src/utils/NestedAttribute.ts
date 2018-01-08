import { NameMap } from '../Dynaflo';
import { getSafeExpressionName } from '../utils';

export default class NestedAttribute {
    _safeKeys: string[] = [];
    _fullSafePaths: string[][] = [];
    _nameMap: NameMap = {};

    constructor(attr: Object) {
        this._parseNextLevel(attr, []);
    }

    _parseNextLevel(attr: Object, safeKeys: string[]) {
        Object.keys(attr).forEach(key => {
            const safeKey = getSafeExpressionName();
            this._nameMap[safeKey] = key;
            this._safeKeys.push(safeKey);
            safeKeys = safeKeys.concat(safeKey);
            const value = attr[key];
            const isTrue = value === true;
            const isArray = Array.isArray(value);
            if (isTrue) {
                // at the end
                this._fullSafePaths.push(safeKeys);
            } else if (isArray) {
                const keyList = value;
                keyList.forEach(key => {
                    const safeKey = getSafeExpressionName();
                    this._safeKeys.push(safeKey);
                    this._nameMap[safeKey] = key;
                    this._fullSafePaths.push(safeKeys.concat(safeKey));
                });
            } else {
                this._parseNextLevel(value, safeKeys);
            }
        });
    }

    nameMap() {
        return this._nameMap;
    }

    joinedSafePaths(): string[] {
        const joined: string[] = [];
        this._fullSafePaths.forEach(fullSafePath => {
            joined.push(fullSafePath.join('.'));
        });
        return joined;
    }
}