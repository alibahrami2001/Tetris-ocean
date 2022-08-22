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
let c = document.createElement('canvas').getContext('2d')
let postctx = document.body.appendChild(document.createElement('canvas')).getContext('2d')
let canvas = c.canvas
let vertices = []


let vertexCount = 7000
let vertexSize = 3
let oceanWidth = 204
let oceanHeight = -80
let gridSize = 32;
let waveSize = 16;
let perspective = 100;


let depth = (vertexCount / oceanWidth * gridSize)
let frame = 0
let { sin, cos, tan, PI } = Math


let loop = () => {
    let rad = sin(frame / 100) * PI / 20
    let rad2 = sin(frame / 50) * PI / 10
    frame++
    if (postctx.canvas.width !== postctx.canvas.offsetWidth || postctx.canvas.height !== postctx.canvas.offsetHeight) {
        postctx.canvas.width = canvas.width = postctx.canvas.offsetWidth
        postctx.canvas.height = canvas.height = postctx.canvas.offsetHeight
    }


    c.fillStyle = `hsl(200deg, 100%, 2%)`
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.save()
    c.translate(canvas.width / 2, canvas.height / 2)

    c.beginPath()
    vertices.forEach((vertex, i) => {
        let ni = i + oceanWidth
        let x = vertex[0] - frame % (gridSize * 2)
        let z = vertex[2] - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0)
        let wave = (cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z * x / 10000))
        let y = vertex[1] + wave * waveSize
        let a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth)
        let tx, ty, tz

        y -= oceanHeight


        tx = x
        ty = y
        tz = z


        tx = x * cos(rad) + z * sin(rad)
        tz = -x * sin(rad) + z * cos(rad)

        x = tx
        y = ty
        z = tz


        tx = x * cos(rad) - y * sin(rad)
        ty = x * sin(rad) + y * cos(rad)

        x = tx;
        y = ty;
        z = tz;



        ty = y * cos(rad2) - z * sin(rad2)
        tz = y * sin(rad2) + z * cos(rad2)

        x = tx;
        y = ty;
        z = tz;

        x /= z / perspective
        y /= z / perspective



        if (a < 0.01) return
        if (z < 0) return


        c.globalAlpha = a
        c.fillStyle = `hsl(${180 + wave * 20}deg, 100%, 50%)`
        c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize)
        c.globalAlpha = 1
    })
    c.restore()

    postctx.drawImage(canvas, 0, 0)

    postctx.globalCompositeOperation = "screen"
    postctx.filter = 'blur(16px)'
    postctx.drawImage(canvas, 0, 0)
    postctx.filter = 'blur(0)'
    postctx.globalCompositeOperation = "source-over"

    requestAnimationFrame(loop)
}


for (let i = 0; i < vertexCount; i++) {
    let x = i % oceanWidth
    let y = 0
    let z = i / oceanWidth >> 0
    let offset = oceanWidth / 2
    vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize])
}

loop()