function pojo2xml(json) {
 if(typeof json === 'object') {
   var xml = '';
   Object.keys(json).forEach(function(k) {
     var val = json[k];
     if(val || val === 0) {
       xml += '<' + k + '>' + pojo2xml(val) + '</' + k + '>';
     } else {
       xml += '<' + k + '/>';
     }
   });
   return xml;
 } else if(json.toString) {
   return json.toString();
 } else {
   return '';
 }
}

module.exports = pojo2xml;
