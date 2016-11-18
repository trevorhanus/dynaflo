export default class MethodParamsBase {
  get _params() {
    let params = {};
    Object.Keys(this).forEach(key => {
      params[key] = this[key].toJS();
    });
    return params;
  }
}