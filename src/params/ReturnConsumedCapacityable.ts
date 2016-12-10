import Fluent from '..';

export function ReturnConsumedCapacityable(constructor: Function) {
  constructor.option: Fluent.ReturnConsumedCapacity = 'NONE';

  constructor.prototype.returnConsumedCapacity(option: Fluent.ReturnConsumedCapacity) {
    this.option = option;
  }

  constructor.prototype.assignReturnConsumedCapacity(params: Fluent.Params) {
    params.ReturnConsumedCapacity = this.option;
  }
}
