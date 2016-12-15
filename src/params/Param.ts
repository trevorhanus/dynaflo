export interface Param {
  key: string;
  value(): (string | any);
  safeValueMap(): ValueMap;
  safeNameMap(): NameMap;
}

export interface ValueMap {
  [safeValue: string]: (string | boolean | number);
}

export interface NameMap {
  [safeName: string]: string;
}
