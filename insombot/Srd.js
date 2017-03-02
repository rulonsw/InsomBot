var env = require('../config.json');
var data = require('../Resources/srd.json');

var charclass = '/class/', spell = '/spell/', xp = '/xptable/', feat = '/feat/';

var SrdModule = function () {};

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

SrdModule.prototype.Message = function (keyword, message, callback) {
  var searchIndex = message.content.indexOf(keyword);
  /*
    Things found in this jSON model:
      -srd20.spell
      -srd20.feat
      -srd20.characterclass
  */
var term = message.content.substring(searchIndex + keyword.length).trim();
  if (term.search(/\sclass\s/g) !== -1) {
    term = term.replace('class', '').trim();
    term = camelize(term);
    term = term.replace(/\s/g, '');
    callback('Searching for class \"' + term + '\". http://www.d20srd.org/srd/classes/'+term+'.htm')
  }
  else if (term.search(/\sspell\s/g) !== -1) {
    term = term.replace('spell', '').trim();
    term = camelize(term);
    term = term.replace(/\s/g, '');
    callback('Searching for spell \"' + term + '\". http://www.d20srd.org/srd/spells/'+term+'.htm')
  }
  else if (term.search(/\sfeat\s/g) !== -1) {
    term = term.replace('feat', '').trim();
    term = camelize(term);
    term = term.replace(/\s/g, '');
    callback('Searching for feat \"' + term + '\". http://www.d20srd.org/srd/feats.htm\#' +term)
  }
  else if (term.search(/\sxp$/g) !== -1) {
    callback('https://s16.postimg.org/xq84n6hud/XP_table_3_5_d20srd.png')
  }
  else { var term2 = term.replace(/\s/g, "\%20");
  callback('Term not recognized. Searching for term \"' + term + '\".http://www.d20srd.org/search.htm?q=' + term2);}
};

module.exports = SrdModule;
