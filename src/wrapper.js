import ApiClient from './components/ApiClient.vue';
import ApiConfig from './components/ApiConfig.vue';

const plugin = {
  install(Vue) {
    Vue.component('ApiClient', ApiClient);
    Vue.component('ApiConfig', ApiConfig);
  }
};

export default plugin;
