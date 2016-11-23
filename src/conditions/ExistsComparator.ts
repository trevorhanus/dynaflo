export default class ExistsComparator implements IComparator {

  str(safePath: string): string {
    return 'attribute_exists(' + safePath + ')';
  }

  valueMap(): Object {
    const noValueMap = {};
    return noValueMap;
  }
}
