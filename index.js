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
  //reset the watch
  this.reset = function() {
    this._time = 0 
    clearInterval(this._interval)
    this._interval = null
    return this._time
  }
  // adds time to the counter
  this.addTime = function(){
    this._time += this._delay
    this._callback(this._time)
  }
}

//jQuery responsibility 
$(document).ready(function() {
  var container = $('#stopWatch')
  var display = container.children('.display')
  var buttons = container.children('button.stopWatch')
  
  function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
      , seconds = parseInt((duration/1000)%60)
      , minutes = parseInt((duration/(1000*60))%60)
      , hours = parseInt((duration/(1000*60*60))%24);

    hours   = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  var stopWatch = new StopWatch(function(newTime){
    // update the display
    display.text(msToTime(newTime))   
  })

  buttons.on('click', function(event) {
    event.preventDefault()
    var button = $(this)
    if (button.hasClass('start')) {
      console.log('started!')
      stopWatch.start()
    } else if (button.hasClass('stop')) {
      console.log('stopped!')
      stopWatch.stop()
    } else {
      console.log('reset!')
      stopWatch.reset()
      display.text('0')
    }
  })
})

