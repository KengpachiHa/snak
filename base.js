const way = { left: 'left', right: 'right', up: 'up', down: 'down'}
const initMap = (width, height, snakWidth) => {
  const mapArr = []
  const main = [], cross = []
  for(let i = 1; i < height / snakWidth; i++) {
    main.push([[0, 0 + i * snakWidth], [width, 0 + i * snakWidth]])
  }
  for(let j = 1; j < width / snakWidth; j++) {
    cross.push([[0 + j * snakWidth, 0], [0 + j * snakWidth, width]])
  }
  mapArr.push(main)
  mapArr.push(cross)
  return mapArr
}
const snak = {}

snak.init = (startPoint = [100, 100], length = 3, snakWidth = 20) => {
  const arr = [startPoint]
  for(let i = 1; i < length; i ++) {
    arr.unshift([startPoint[0] - i * snakWidth, startPoint[1]])
  }
  return arr
}

snak.eatApple = (head, apple) => head[0] == apple[0] && head[1] == apple[1]
snak.growHead = (arr, way, step) => {
  let next = []
  const head = arr[arr.length - 1]
  switch (way) {
    case 'up':
      next = [head[0], head[1] - step]
      break;
    case 'down':
      next = [head[0], head[1] + step]
      break;
    case 'left':
      next = [head[0] - step, head[1]]
      break;
    case 'right':
      next = [head[0] + step, head[1]]
      break;
  }
  arr.push(next)
  return arr
}
snak.run = (arr, way, step) => {
  snak.growHead(arr, way, step)
  arr.shift()
  return arr
}

snak.turnTo = (from, to) => {
  if((from == way.left && to == way.right) || (from == way.right && to == way.left)) to = from
  if((from == way.up && to == way.down)    || (from == way.down && to == way.up))    to = from
  return to
}

snak.die = (head, arr, width = 600, height = 600) => {
  let dead  = false
  // hit wall
  if(head[0] < 0     ||
     head[0] > width || 
     head[1] < 0     ||
     head[1] > height)
    dead = true
  // hit snakself => sm?
  if(eatHimself(head, arr)) dead = true
  if(dead) arr.length = 0
  return dead
}

const creatApple = (snakArr, mapLineArr) => {
  const voidGround = deleteSnak(snakArr, getMapArr(mapLineArr))
  let random = Math.floor(Math.random() * voidGround.length)
  return voidGround[random]
}

function eatHimself (head, arr) {
  let hadAte = false
  for (let i = 0; i < arr.length - 1; i++) {
    if(head[0] == arr[i][0] && head[1] == arr[i][1]) {
      hadAte = true
      arr.length = 0
      break
    }
  }
  return hadAte
}

function deleteSnak (inpurity, arr) {
  let map = {}, snak = {}
  const ground = []
  arr.forEach((ele, idx) => {
    map[ele[0] + '_' + ele[1]] = ele
  })
  inpurity.forEach((ele, idx) => {
    snak[ele[0] + '_' + ele[1]] = ele
  })
  for (const key in snak) {
    if (map.hasOwnProperty(key)) {
      delete map[key]
    }
  }
  for (const key in map) {
    ground.push(map[key])
  }
  return ground
}

function getMapArr(arr) {
  const mapArr = []
  const main = arr[0]
  const cross = arr[1]
  const xArr = cross.map(ele => ele[0][0])
  const yArr = main.map(ele => ele[0][1])
  for (let i = 0; i < xArr.length; i++) {
    for (let j = 0; j < yArr.length; j++) {
      mapArr.push([xArr[i], yArr[j]])
    }
  }
  return mapArr
}

export {
  initMap, snak, way, creatApple
}