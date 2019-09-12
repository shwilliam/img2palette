const componentToHex = c => {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

// FIXME: instead use rgb color
const rgbToHex = ({r, g, b, a}) =>
  `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${
    a === 255 ? '' : componentToHex(a)
  }`

export default (el, pixelVals) => {
  el.innerHTML = ''
  pixelVals.forEach(row => {
    const pixelInfoRow = document.createElement('div')
    pixelInfoRow.classList.add('pixel-info__row')

    row.forEach(pixel => {
      const colorVal = rgbToHex(pixel)

      const pixelInfoWrapper = document.createElement('div')
      pixelInfoWrapper.classList.add('pixel-info__item-wrapper')

      const pixelInfo = document.createElement('p')
      pixelInfo.classList.add('pixel-info__item')
      pixelInfo.innerText = colorVal
      pixelInfo.onclick = e => {
        e.preventDefault()
        if (navigator.clipboard) {
          navigator.clipboard.writeText(colorVal)
        }
      }

      pixelInfoWrapper.appendChild(pixelInfo)
      pixelInfoRow.appendChild(pixelInfoWrapper)
    })

    el.appendChild(pixelInfoRow)
  })
}
