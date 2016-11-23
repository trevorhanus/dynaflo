import dn from '../../src/dynanode';
import Condition from '../../src/conditions/Condition';

describe('attr()', () => {
  it('creates a condition instance', () => {
    const cond = dn.attr('title');
    expect(cond).toBeInstanceOf(Condition);
  });
});
