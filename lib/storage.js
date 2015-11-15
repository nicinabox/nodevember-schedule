var storage = {};

module.exports = {
  setItem: function(key, value) {
    storage[key] = value
  },

  getItem: function(key) {
    return storage[key]
  },

  removeItem: function(key) {
    delete storage[key]
  },

  clear: function(key) {
    storage = {}
  }
}
