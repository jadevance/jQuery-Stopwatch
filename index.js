// JS responsibility 
function StopWatch(callback) {
  this._time = 0
  this._interval = null 
  this._delay = 10 
  this._callback = callback

  //starts the watch
  this.start = function() {
    if (this._interval) { return }
    this._interval = setInterval(this.addTime.bind(this), this._delay)
  }
  //stops the watch
  this.stop = function() {
    clearInterval(this._interval)
    this._interval = null
  }
  // adds time to the counter
  this.addTime = function(){
    console.log(this)
    this._time += this._delay
    this._callback(this._time)
  }
}

//jQuery responsibility 
$(document).ready(function() {
  var container = $('#stopWatch')
  var display = container.children('.display')
  var buttons = container.children('button.stopWatch')
  var stopWatch = new StopWatch(function(newTime){
    // update the display
  display.text(newTime)    
  })

  buttons.on('click', function(event) {
    event.preventDefault()
    var button = $(this)
    if (button.hasClass('start')) {
      console.log('started!')
      stopWatch.start()
    } else {
      console.log('stopped!')
      stopWatch.stop()
    }
  })
})
