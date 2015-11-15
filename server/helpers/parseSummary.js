var Handlebars = require('handlebars')

var decode = function(str) {
  return str.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, '\'')
}

var raw = function (str) {
  return new Handlebars.SafeString(str)
}

module.exports = function(summary) {
  if (summary) {
    return raw(decode(summary))
  }
}
