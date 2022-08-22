/*
MIT License

Copyright (c) 2022 Klondak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var audioSource = 'https://bardia.cloud/index.php/s/vvNCUYnpfwUcmZB/download'
var audio = new Audio(audioSource)

var controls = document.body
var icon = controls.querySelector('.icon')
icon.classList.add('fa', 'fa-play')
controls.addEventListener('#new-game', () => {
  icon.classList.contains('fa-play') ? audio.play() : audio.pause()
})

function onPlay () {
  console.log('played')
  icon.classList.remove('fa-play')
  icon.classList.add('fa-pause')
}

function onPause () {
  console.log('paused')
  icon.classList.remove('fa-pause')
  icon.classList.add('fa-play')
}

audio.addEventListener('playing', onPlay)
audio.addEventListener('pause', onPause)
audio.addEventListener('onended', onPause)