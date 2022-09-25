import { renderPriceWithCommas } from 'utils/helpers'

export const getTotalPrice = (items: any[]) => {
  let sum = 0

  for (let i = 0; i < items.length; i++) {
    sum += items[i].qty * items[i].sellingPrice
  }

  return renderPriceWithCommas(sum)
}
