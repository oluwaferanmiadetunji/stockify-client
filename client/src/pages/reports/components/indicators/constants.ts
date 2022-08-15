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
    type: 'datetime',
    categories: [
      '2018-05-19T00:00:00.000Z',
      '2018-06-19T00:00:00.000Z',
      '2018-07-19T01:30:00.000Z',
      '2018-08-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-10-19T04:30:00.000Z',
      '2018-11-19T05:30:00.000Z',
      '2018-12-19T06:30:00.000Z',
    ],
    labels: {
      format: 'MMM',
    },
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
