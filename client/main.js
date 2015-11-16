var STORAGE_KEY = 'nodevember-sechedule-selections'
var INFO_CLASS = 'bg-info'
var timeSlots = document.querySelectorAll('.js-slot')
var slotHighlight = document.querySelectorAll('.js-slot-highlight')

var getParentByClassName = function(el, className) {
  className = className.replace(/^\./, '')
  while ((el = el.parentElement) && !el.classList.contains(className));
  return el
}

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
      if (selection.id) {
        var input = el.querySelector('.js-slot-highlight')
        input.checked = true
        el.classList.toggle(INFO_CLASS)
      }
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
    var el = e.currentTarget, i = 3
    var slot = getParentByClassName(el, '.slot')
    slot.classList.toggle(INFO_CLASS)
    saveSelection(slot.id, slot.classList.contains(INFO_CLASS))
  })
})
