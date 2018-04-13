function pojo2xml(json) {
  var content, val, xml;

  if(Array.isArray(json)) {
    return json.map(pojo2xml).join('');
  } else if(typeof json === 'object') {
    xml = '';
    Object.keys(json).forEach(function(k) {
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
  } else if(json.toString) {
    return json.toString()
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        ;
  } else {
    return '';
  }
}

module.exports = pojo2xml;
