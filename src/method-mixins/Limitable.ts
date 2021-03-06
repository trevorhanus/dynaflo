import BaseMethod from '../methods/BaseMethod';
import LimitParam from '../params/LimitParam';

export default class Limitable extends BaseMethod {

    limit(limit: number): BaseMethod {
        const limitParam = new LimitParam(limit);
        super.addParam(limitParam);
        return this;
    }
}
