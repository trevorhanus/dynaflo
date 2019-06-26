import { Param, ValueMap, NameMap } from '../params/Param';

export class ScanIndexForwardParam implements Param {
    private _value: boolean;
    key = 'ScanIndexForward';

    constructor(value: boolean) {
        this._value = value;
    }

    value(): boolean {
        return this._value;
    }

    safeValueMap(): ValueMap {
        return {};
    }

    safeNameMap(): NameMap {
        return {};
    }
}
