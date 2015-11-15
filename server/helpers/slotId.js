module.exports = function(title) {
  return title.toLowerCase().replace(/[\s\W]/g, '-')
}
