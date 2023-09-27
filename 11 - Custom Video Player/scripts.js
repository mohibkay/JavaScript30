const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress  = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

function skip() {
  const duration = parseFloat(this.dataset.skip)
  video.currentTime += duration
}

function handleRangeUpdate() {
  if (!isMouseDown) return;
  video[this.name] = this.value
}

function handleProgress() {
  const progress = video.currentTime / video.duration * 100
  progressBar.style.flexBasis = `${progress}%`
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
  
}

toggle.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', handleProgress)
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip))

let isMouseDown = false;
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousedown', () => isMouseDown = true))
ranges.forEach(range => range.addEventListener('mouseup', () => isMouseDown = false))
ranges.forEach(range => range.addEventListener('mouseout', () => isMouseDown = false))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => isMouseDown && scrub(e))
progress.addEventListener('mousedown', () => isMouseDown = true)
progress.addEventListener('mouseup', () => isMouseDown = false)
progress.addEventListener('mouseout', () => isMouseDown = false)