const mod = jest.genMockFromModule('../getSafeExpressionName');

mod.getSafeExpressionName = function() {
  return '#test';
}

export default mod;
