// Snowcrash art source code:
// https://etherscan.io/address/0xb25e1fd137cff8ab3066079e4493d9403d8d7434
// https://ipfs.io/ipfs/QmY2FGk9pRXRdPppqZAyBButvhuawMoJGvzjfZAQ3CwWPQ?x=NTA=&t=OTAzMzAxMjA=

// Renders a p5js sketch with the given input, calling back with each frame
const sketch = (input, callback) => p5 => {

    let f,charsets,t,xoff1,yoff1,xyoff,n,satTwo,colTwo,looping,reverse,
        ctx,colOne,frameW,frameH,end,spread,brightTwo,chars,flowType,satOne;

    p5.setup = () => {
        const tokenId = Number.isInteger(input.id) ? input.id : parseInt(input.id);
        const hash = input.hash;
        f = 0;
        charsets = ["Ñ$50c-", "@97?;,", "#8£!:.", "₩42a+_", "%gm;)'", "0101/ "]
        const cols = [0, 1, 2, 4, 5, 6, 7, 8, 9, 11]
        const fSizes = [12.5, 9, 6, 4.7]
        const noiseEnd = [0.001, 0.002, 0.005, 0.008]
        const speeds = [0.7, 1.2, 2.5, 2.6]
        const textCol = [0, 100]
        const charSpread = [0.06, 0.12, 0.18, 0.24]
        t = 0
        xoff1 = 0
        yoff1 = 0
        xyoff = 0
        n = 0
        satTwo = 0
        colTwo = 0
        looping = true
        reverse = false
        const w = 500
        const h = 500
        ctx = p5.createCanvas(w, h).canvas.getContext('2d');
        p5.colorMode(p5.HSB, 360, 100, 100);
        p5.textFont('Courier')
        p5.noiseSeed(tokenId)
        colOne = cols[parseInt(hash.substring(0, 1))] * 30
        frameW = p5.width / fSizes[parseInt(hash.substring(1, 2))]
        frameH = p5.height / fSizes[parseInt(hash.substring(1, 2))]
        end = noiseEnd[parseInt(hash.substring(2, 3))]
        p5.speed = speeds[parseInt(hash.substring(3, 4))] / (frameW + frameH) / 3;
        spread = charSpread[parseInt(hash.substring(4, 5))]
        brightTwo = textCol[parseInt(hash.substring(5, 6))]
        chars = parseInt(hash.substring(6, 7))
        flowType = parseInt(hash.substring(7, 8))
        satOne = 80
        if (brightTwo == 100) {
            brightOne = 85
        } else {
            brightOne = 100
        }
        p5.fill(colTwo, satTwo, brightTwo);
    }

    p5.draw = () => {
        p5.background(colOne, satOne, brightOne);
        for (let x = frameW; x <= p5.width - frameW; x += 10) {
            for (let y = frameH; y <= p5.height - frameH; y += 10) {
                xoff1 = p5.map(x, frameW, p5.width, 0, end)
                yoff1 = p5.map(y, frameH, p5.height, 0, end)
                xyoff = xoff1 + yoff1
                n = p5.noise(x * xyoff + t, y * xyoff + t, f);
                p5.noStroke();
                p5.fill(colTwo, satTwo, brightTwo);
                if (n > 0.5 + spread * 0.80 || n < 0.50 - spread * 0.8) {
                    p5.text(charsets[chars][0], x, y)
                } else if (n > 0.5 + spread * 0.65 || n < 0.50 - spread * 0.65) {
                    p5.text(charsets[chars][1], x, y)
                } else if (n > 0.5 + spread * 0.5 || n < 0.50 - spread * 0.5) {
                    p5.text(charsets[chars][2], x, y)
                } else if (n > 0.5 + spread * 0.35 || n < 0.50 - spread * 0.35) {
                    p5.text(charsets[chars][3], x, y)
                } else if (n > 0.5 + spread * 0.2 || n < 0.50 - spread * 0.2) {
                    p5.text(charsets[chars][4], x, y)
                } else {
                    p5.text(charsets[chars][5], x, y)
                }
            }
        }
        if (reverse == false) {
            if (flowType == 0) {
                t += p5.speed
            } else {
                f += p5.speed
                t += p5.speed / 10
            }

        } else {
            if (flowType == 0) {
                t -= p5.speed
            } else {
                f -= p5.speed
                t -= p5.speed / 10
            }
        }

        // Call back with each frame
        callback(ctx.getImageData(0,0, p5.width, p5.height));
    }

    // Switch colors on mouse click
    p5.mouseClicked = () => {
        const buffCol = colOne
        const buffSat = satOne
        const buffBright = brightOne

        colOne = colTwo
        satOne = satTwo
        brightOne = brightTwo

        colTwo = buffCol
        satTwo = buffSat
        brightTwo = buffBright
    }

    // Reverse and resize on key press
    p5.keyPressed = e => {
        if (e.keyCode === p5.LEFT_ARROW) {
            reverse = false;
            p5.loop()
            looping = true;
        } else if (e.keyCode === p5.RIGHT_ARROW) {
            reverse = true;
            p5.loop()
            looping = true
        } else if (e.keyCode === p5.UP_ARROW) {
            p5.resizeCanvas(750, 250)
        } else if (e.keyCode === p5.DOWN_ARROW) {
            p5.resizeCanvas(500, 500)
        } else if (e.keyCode === 16) {
            p5.resizeCanvas(350, 600)
        } else {
            p5.loop()
            looping = true
        }
    }
}
module.exports = {sketch};
