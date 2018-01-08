import BaseMethod from '../methods/BaseMethod';
import PluckParam from '../params/PluckParam';

export default class Pluckable extends BaseMethod {

    pluck(...topLevelOrNestedAttributes: (string | any)[]): BaseMethod {
        const pluckParam = new PluckParam(topLevelOrNestedAttributes);
        super.addParam(pluckParam);
        return this;
    }
}
