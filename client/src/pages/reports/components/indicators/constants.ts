export const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 1.5,
  },
  grid: {
    strokeDashArray: 4,
  },
  xaxis: {
    type: 'category',
    tickPlacement: 'on',
    overwriteCategories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],

    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  tooltip: {
    x: {
      format: 'MM',
    },
  },
}
