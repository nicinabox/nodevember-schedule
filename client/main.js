var STORAGE_KEY = 'nodevember-sechedule-selections'
var timeSlots = document.querySelectorAll('.js-slot')
var slotHighlight = document.querySelectorAll('.js-slot-highlight')

var getSelections = function() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

var getSelectionById = function(id) {
  var selections = getSelections()
  return selections.filter(function(s) {
    return s.id === id
  })[0]
}

var getSelectionIndex = function(id, all) {
  return all.map(function(s) { return s.id }).indexOf(id)
}

var saveSelection = function(id, isSelected) {
  var selections = getSelections()
  var index = getSelectionIndex(id, selections)

  if (index > -1) {
    selections[index].selected = isSelected
  } else {
    selections = selections.concat({
      id: id,
      selected: isSelected
    })
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(selections))
}

var applySelections = function() {
  var selections = getSelections()
  selections.forEach(function(selection) {
    var el
    if (selection.selected) {
      el = document.getElementById(selection.id)
      var input = el.querySelector('.js-slot-highlight')
      input.checked = true
      el.classList.toggle('info')
    }
  })
}

var jumpToToday = function() {
  var days = ['sunday', 'monday', 'tuesdasy', 'wednesday', 'thursday', 'friday', 'saturday']
  var d = new Date()
  var day = days[d.getDay()]
  window.location.href = '#' + day
}

applySelections()
jumpToToday()

Array.prototype.forEach.call(slotHighlight, function(el) {
  el.addEventListener('click', function(e) {
    var slot = e.currentTarget.parentNode
    slot.classList.toggle('info')
    saveSelection(slot.id, slot.classList.contains('info'))
  })
})
