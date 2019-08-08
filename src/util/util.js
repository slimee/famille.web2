export const isNil = v => v === null || v === undefined

const getLuma = (value) => {
  const c = value.substring(1)
  const rgb = parseInt(c, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const overcolor = c => (getLuma(c) < 120 ? 'white' : 'black')

export const initiales = (fullname) => {
  const nameSplit = fullname.toUpperCase().split(' ')
  if (nameSplit.length === 1) {
    return nameSplit[0] ? nameSplit[0].charAt(0) : '?'
  }
  return nameSplit[0].charAt(0) + nameSplit[1].charAt(0)
}
