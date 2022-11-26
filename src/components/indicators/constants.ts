import { renderPrice } from 'utils/helpers'

export const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: false,
    },
    foreColor: '#fff',
    stacked: true,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000,
      },
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#FCCF31', '#17ead9', '#f02fc2'],
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  grid: {
    strokeDashArray: 4,
    borderColor: '#40475D',
    padding: {
      left: 0,
      right: 0,
    },
  },
  markers: {
    size: 0,
    hover: {
      size: 0,
    },
  },
  xaxis: {
    axisTicks: {
      color: '#333',
    },
    axisBorder: {
      color: '#333',
    },
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
  },

  tooltip: {
    y: {
      formatter: function (val: any) {
        return renderPrice(val)
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      gradientToColors: ['#F55555', '#6078ea', '#6094ea'],
    },
  },
}
