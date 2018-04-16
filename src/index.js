function pojo2xml(json) {
  var content, val, xml;

  if(json == null) { // == checks for undefined too
    return '';
  } else if(Array.isArray(json)) {
    return json.map(pojo2xml).join('');
  } else if(typeof json === 'object') {
    xml = '';
    Object.keys(json).forEach(function(k) {
      if(/[&<>"]/.test(k)) throw new Error();

      val = json[k];
      if(val !== undefined && val !== null) {
        content = pojo2xml(val);
        if(content === '') xml += '<' + k + '/>';
        else xml += '<' + k + '>' + content + '</' + k + '>';
      } else {
        xml += '<' + k + '/>';
      }
    });
    return xml;
  } else if(typeof json === 'string') {
    return json.replace(/[&<>"]/g,
          function(match) {
            if(match === '"') return '&quot;';
            if(match === '&') return '&amp;';
            if(match === '<') return '&lt;';
            if(match === '>') return '&gt;';
          });
  } else return json.toString();
}

module.exports = pojo2xml;
