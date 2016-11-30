export default class ExistsComparator implements f.Comparator {

  exprString(safePath: string): string {
    return 'attribute_exists(' + safePath + ')';
  }

  valueMap(): f.ValueMap {
    const noValueMap = {};
    return noValueMap;
  }
}
