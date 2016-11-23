export default class ExistsComparator implements dn.Comparator {

  exprString(safePath: string): string {
    return 'attribute_exists(' + safePath + ')';
  }

  valueMap(): dn.ValueMap {
    const noValueMap = {};
    return noValueMap;
  }
}
