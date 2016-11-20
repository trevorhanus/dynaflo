import {ProjectionExpression, ExpressionAttributeNames} from '../../src/params';

describe('ProjectionExpression', () => {

  it('Can Instantiate', () => {
    const map = new ExpressionAttributeNames();
    const projExpr = new ProjectionExpression(map);
    projExpr.applyAttributes(['My.Scalar.Key']);
    expect(projExpr).not.toBe(null);
    expect(projExpr).not.toBe(undefined);
  });

  it('Creates an expression for top level attributes', () => {
    const map = new ExpressionAttributeNames();
    const projExpr = new ProjectionExpression(map);
    projExpr.applyAttributes(['My.Scalar.Key', 'TopLevelKey']);
    const names = ['My.Scalar.Key', 'TopLevelKey'];
    const keyHashes: string[] = projExpr.toJS().split(', '); // ['#afasdfn', '#adfadsf']
    keyHashes.forEach((keyHash, i) => {
      expect(map.toJS()[keyHash]).toBe(names[i]);
    });
  });

});
