import BaseMethod from '../methods/BaseMethod';
import { ConditionLike } from '../conditions/Condition';
import FilterParam from '../params/FilterParam';

export default class Filterable extends BaseMethod {

    filter(conditionOrAttributesToValueMap: ConditionLike): BaseMethod {
        const filterParam = new FilterParam(conditionOrAttributesToValueMap);
        super.addParam(filterParam);
        return this;
    }
}
