const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

const json2xml = require('../src/index');

const TEST_DATA = [
  { in:'', expected:'' },

  { in:0, expected:'0' },
  { in:1, expected:'1' },

  { in:false, expected:'false' },
  { in:true, expected:'true' },

  { in:'a string', expected:'a string' },

  { in:null, expected:'' },
  { in:undefined, expected:'' },
  { in:{ a:null }, expected:'<a/>' },
  { in:{ a:undefined }, expected:'<a/>' },

  { in:{ a:1, b:2 }, expected:'<a>1</a><b>2</b>' },
  { in:{ a:false }, expected:'<a>false</a>' },
  { in:{ root: { fields: [ { idx:1 }, { idx:2 } ] } }, expected:'<root><fields><idx>1</idx><idx>2</idx></fields></root>' },

  // XML special chars
  { in:'<<<>>>', expected:'&lt;&lt;&lt;&gt;&gt;&gt;' },
  { in:'""', expected:'&quot;&quot;' },
  { in:'&&', expected:'&amp;&amp;' },
];

describe('pojo2xml', function() {
  TEST_DATA.forEach((t, i) => {
    const expected = t.expected;
    it(`Should convert #${i} to ${expected}`, function() {
      assert.equal(json2xml(t.in), expected);
    });
  });

  const ephemeralTestRoot = 'test/data/ephemeral';
  fs.readdirSync(ephemeralTestRoot)
    .filter(f => f.endsWith('.xml'))
    .forEach(xmlTestFile => {
      it(`should convert data in ${ephemeralTestRoot}/${xmlTestFile} as expected`, function() {
        // given
        const jsonTestFile = xmlTestFile.replace(/\.xml$/, '.json');
        const json = JSON.parse(readFile(ephemeralTestRoot, jsonTestFile));
        const expectedXml = readFile(ephemeralTestRoot, xmlTestFile);

        // expect
        assert.equal(json2xml(json), expectedXml);
      });
    });
});

function readFile(...pathParts) {
  return fs.readFileSync(path.join(...pathParts), { encoding:'utf8' });
}
