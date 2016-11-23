import Comparator from './Comparator';

export default class NotExistsComparator extends Comparator {

  constructor() {
    super(null);
  }

  string(safePath: string): string {
    return 'attribute_not_exists(' + safePath + ')';
  }
}
