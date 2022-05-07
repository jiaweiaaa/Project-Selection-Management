import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'

// Import Vue-echarts
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import { PieChart } from "echarts/charts";
import { LegendComponent } from 'echarts/components';
import { TitleComponent } from 'echarts/components';
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // normalized css

// lodash
import _ from 'lodash'
Vue.prototype._ = _

Vue.use(ElementUI, { locale });
Vue.use(VueRouter);
Vue.use(PerfectScrollbar)

// Vue-echarts
use([
  CanvasRenderer,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
]);
Vue.component('v-chart', ECharts)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});