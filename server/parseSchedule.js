module.exports = function(contents) {
  contents = contents.replace(/(\n\r?)+/g, ' ');
  var match = contents.match(/"schedule":\s*(\[\{.*?\}\]\s*\}\])\s*\};/);

  if (match[1]) {
    return JSON.parse(match[1])
  }
}
