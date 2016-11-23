export default class NotExistsComparator implements dn.Comparator {

  exprString(safePath: string): string {
    return 'attribute_not_exists(' + safePath + ')';
  }

  valueMap(): dn.ValueMap {
    const noValueMap = {};
    return noValueMap;
  }
}
