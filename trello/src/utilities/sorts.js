
export const mapOrder = (array, order, key) => {
  if (!array)
    return array
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
  return array
}