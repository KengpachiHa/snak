
const canvas = document.getElementById('super_snak_81594')

const screenWidth = window.screen.width
if(screenWidth < 600) {
  canvas.width = screenWidth
  canvas.height = screenWidth
  const contro = document.getElementById('contro')
  contro.style.display = 'block'
}

const ctx    = canvas.getContext('2d')
const mapLineColor = '#621454'
const draw = {}
draw.map = (arr, lineColor = mapLineColor) => {
  ctx.beginPath()
  ctx.strokeStyle = lineColor
  arr.forEach(axis => {
    axis.forEach(line => {
      ctx.moveTo(...line[0])
      ctx.lineTo(...line[1])
    })
  });
  ctx.stroke()
}
draw.snak = (arr, snakColor = 'yellow') => {
  arr.forEach(point => {
    ctx.beginPath()
    ctx.fillStyle = snakColor
    ctx.arc(point[0], point[1], 10, 0, 2 * Math.PI)
    ctx.fill()
  });
}
draw.apple = (point) => {
  ctx.beginPath()
  ctx.fillStyle = '#cf5757'
  ctx.arc(point[0], point[1], 10, 0, 2 * Math.PI)
  ctx.fill()
}
draw.clearAll = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

export {
  canvas, ctx,
  draw,
}