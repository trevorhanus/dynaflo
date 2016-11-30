export default class NotExistsComparator implements f.Comparator {

  exprString(safePath: string): string {
    return 'attribute_not_exists(' + safePath + ')';
  }

  valueMap(): f.ValueMap {
    const noValueMap = {};
    return noValueMap;
  }
}
