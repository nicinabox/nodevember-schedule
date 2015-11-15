module.exports = function(time) {
  var match = time.match(/(\d*:\d*)\s?([a|p]m)/)
  if (match) {
    return [match[1], match[2]].join('')
  } else {
    return time
  }
}
