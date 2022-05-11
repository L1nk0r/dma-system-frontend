import { defineComponent, h, PropType } from 'vue'

import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
)

export default defineComponent({
  name: 'RadarChart',
  components: {
    Radar
  },
  props: {
    chartId: {
      type: String,
      default: 'radar-chart'
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 600
    },
    cssClasses: {
      default: '',
      type: String
    },
    labels: {
       type: Array,
       default:() => {}
    },
    data: {
       type: Array,
       default: () => {}
    }
  },
  setup(props) {
    const chartData = {
      labels: props.labels,
      datasets: [
        
        {
          label: '',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: props.data
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Radar, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses
      })
  }
})