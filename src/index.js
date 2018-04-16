function pojo2xml(json) {
  var xml, k;

  if(json == null) { // == checks for undefined too
    return '';
  } else if(Array.isArray(json)) {
    return json.map(pojo2xml).join('');
  } else if(typeof json === 'object') {
    xml = '';
    for(k in json) {
      if(!json.hasOwnProperty(k)) continue;
      if(/[&<>"]/.test(k)) throw new Error();

      var content = pojo2xml(json[k]);
      if(content === '') xml += '<' + k + '/>';
      else xml += '<' + k + '>' + content + '</' + k + '>';
    }
    return xml;
  } else if(typeof json === 'string') {
    return json.replace(/[&<>"]/g, escapeSpecial);
  } else return json.toString();
}

function escapeSpecial(c) {
  if(c === '"') return '&quot;';
  if(c === '&') return '&amp;';
  if(c === '<') return '&lt;';
  if(c === '>') return '&gt;';
}

module.exports = pojo2xml;
