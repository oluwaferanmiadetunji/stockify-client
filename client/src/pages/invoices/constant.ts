export const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
}

export const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick',
}

export const config = {
  series: [200, 40],

  options: {
    labels: ['Ongoing', 'Paid'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 450,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  },
}
