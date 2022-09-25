export const getTotalSum = (invoices: any[]) => {
  let amount = 0

  for (let j = 0; j < invoices.length; j++) {
    const invoice = invoices[j]

    for (let i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i]

      amount += item.sellingPrice - item.costPrice - item.qty
    }
  }

  return amount
}
