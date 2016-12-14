import Dynaflo from '..';

export function ReturnConsumedCapacityable(constructor: Function) {
  constructor.option: Dynaflo.ReturnConsumedCapacity = 'NONE';

  constructor.prototype.returnConsumedCapacity(option: Dynaflo.ReturnConsumedCapacity) {
    this.option = option;
  }

  constructor.prototype.assignReturnConsumedCapacity(params: Dynaflo.Params) {
    params.ReturnConsumedCapacity = this.option;
  }
}
