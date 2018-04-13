const assert = require('chai').assert;

const json2xml = require('../src/index');

const TEST_DATA = [
  { in:'', expected:'' },
  { in:0, expected:'0' },
  { in:1, expected:'1' },
  { in:false, expected:'false' },
  { in:true, expected:'true' },
  { in:'a string', expected:'a string' },
  { in:{ a:1, b:2 }, expected:'<a>1</a><b>2</b>' },
];

describe('pojo2xml', function() {
  TEST_DATA.forEach((t, i) => {
    it(`Should convert #${i} as expected`, function() {
      assert.equal(json2xml(t.in), t.expected);
    });
  });
});
