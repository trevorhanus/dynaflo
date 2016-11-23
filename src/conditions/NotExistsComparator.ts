export default class NotExistsComparator implements IComparator {

  str(safePath: string): string {
    return 'attribute_not_exists(' + safePath + ')';
  }

  valueMap(): Object {
    const noValueMap = {};
    return noValueMap;
  }
}
