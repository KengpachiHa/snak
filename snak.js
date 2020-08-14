import { initMap, creatApple, snak, way } from './base'
import{ canvas, draw } from './canvas'

const mapWidth  = canvas.width
const mapHeight = canvas.height
const snakWidth = 20
const mapLineArr = initMap(mapWidth, mapHeight, snakWidth)

let snakDirection = way.right
let haveTurnedDirection = false
let snakArr = []
let apple = []
let gotApple = 0

draw.map(mapLineArr)
snakArr = snak.init()
apple = creatApple(snakArr, mapLineArr)
draw.snak(snakArr)
draw.apple(apple)

let gap = 600
const minGap = 100

let interval = setInterval(main, gap);

function main () {
  haveTurnedDirection = false
  draw.clearAll()
  draw.map(mapLineArr)
  draw.apple(apple)
  let head = snakArr[snakArr.length - 1]
  if(snak.eatApple(head, apple)) {
    if(gap > minGap) {
      gap -= 50
      clearInterval(interval)
      interval = setInterval(main, gap);
    }
    /**
     * 这里借鉴了经典的诺基亚版贪吃蛇，动画效果是 
     * 蛇头到了苹果 下一次运动直接运动两个单位，蛇尾缩小一个单位，
     这样来实现。
     */
    snakArr = snak.growHead(snakArr, snakDirection, snakWidth)
    snakArr = snak.run(snakArr, snakDirection, snakWidth)
    draw.clearAll()
    draw.map(mapLineArr)
    apple = creatApple(snakArr, mapLineArr)
    draw.apple(apple)
    showScoer(gotApple += 1)
  } else {
    snakArr = snak.run(snakArr, snakDirection, snakWidth)
  }
  head = snakArr[snakArr.length - 1]
  if(!snak.die(head, snakArr, mapWidth, mapHeight)) {
    draw.snak(snakArr)
  } else {
    console.log( `game's over` )
    alert(`game's over`)
    alert(`菜的抠脚， 老子上次吃了${gotApple + 2}个苹果呢～，继续努力-_-#`)
    console.log('after over snakArr', snakArr)
    clearInterval(interval)
    clearScore()
    snakArr.length = 0
    snakArr = snak.init()
    snakDirection = way.right
    haveTurnedDirection = false
    draw.snak(snakArr)
    gap = 600
    // interval = setInterval(main, gap);
  }
}

document.onkeydown = (e) => keyDown(e.keyCode)

document.getElementById('contro')
contro.addEventListener('click', (e) => {
  const id = e.target.id
  if(id == way.up) keyDown(38)
  if(id == way.down) keyDown(40)
  if(id == way.left) keyDown(37)
  if(id == way.right) keyDown(39)
})

function keyDown (code) {
  let newDirection = null
  if(code == 87 || code == 38) newDirection = snak.turnTo(snakDirection, way.up)
  if(code == 83 || code == 40) newDirection = snak.turnTo(snakDirection, way.down)
  if(code == 65 || code == 37) newDirection = snak.turnTo(snakDirection, way.left)
  if(code == 68 || code == 39) newDirection = snak.turnTo(snakDirection, way.right)

  if(snakDirection != newDirection && !haveTurnedDirection) {
    snakDirection = newDirection
    haveTurnedDirection = true
  }
}
const num = document.getElementById('num')
function showScoer (score) {
  num.innerHTML = score
}
function clearScore () {
  num.innerHTML = 0
}

const start = document.getElementById('start')
start.addEventListener('click', (e) => {
  console.log(snakArr)
  interval = setInterval(main, gap)
})
