import Api from './components/Api.vue';
import ApiConfig from './components/ApiConfig.vue';

const plugin = {
  install(Vue) {
    Vue.component('Api', Api);
    Vue.component('ApiConfig', ApiConfig);
  },
};

export default plugin;
