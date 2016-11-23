import Comparator from './Comparator';

export default class ExistsComparator extends Comparator {

  constructor() {
    super(null);
  }

  string(safePath: string): string {
    return 'attribute_exists(' + safePath + ')';
  }
}
