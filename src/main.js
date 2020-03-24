// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 状态管理
import store from './store/config';

//头部组件
import clHeader from './components/clHeader'; 
Vue.component("cl-header",clHeader);

//引用vant-ui
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引用moment
import moment from 'moment'
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;
 

 
Vue.prototype.$moment = moment

//引用mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

//使用vue-awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon',Icon)

//使用时间轴
import timelinepick from "vue-timelinepick"
import "vue-timelinepick/dist/vue-timelinepick.css"
// icon
import './font-icon/iconfont.css';

//滑动
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(timelinepick);
Vue.config.productionTip = false;





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
