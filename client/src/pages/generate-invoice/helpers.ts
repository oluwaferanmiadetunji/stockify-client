import {
  SingleProductInterface,
  CreateNewInvoiceItemInterface,
} from 'redux-store/types'
import { addCommasToNumber, renderPrice } from 'utils/helpers'

export const getPriceOfTotalItem = (
  quantity: number,
  product: SingleProductInterface | null,
) => {
  let sum = 0

  if (product !== null) {
    for (let i = 0; i < quantity; i++) {
      sum += product.sellingprice
    }
  }

  return addCommasToNumber(sum)
}

export const getTotalPriceOfAllItemsSelected = (
  items: CreateNewInvoiceItemInterface[],
) => {
  let sum = 0

  for (let i = 0; i < items.length; i++) {
    sum += items[i].price * items[i].qty
  }

  return renderPrice(addCommasToNumber(sum))
}

export const removeSelectedProductsFromTotalProducts = (
  selectedProducts: CreateNewInvoiceItemInterface[],
  totalProducts: SingleProductInterface[],
) => {
  if (selectedProducts.length === 0 || selectedProducts[0].name === '') {
    return totalProducts
  }

  const filteredArray = totalProducts
    .filter((product) => product.quantity > 0)
    .filter(
      (product) =>
        !selectedProducts.find((selected) => selected.productId === product.id),
    )

  return filteredArray
}
