import { LitElement} from 'lit-element';
import Vue from 'vue';

import App from './App.vue';

import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

// export default new Vue({
//   render: h => (
//     h(App)
//   ),
// }).$mount('#app')

class VueApp extends LitElement {
  constructor() {
    super()
  }

  render() {
    new Vue({
        render: h => (
          h(App)
        ),
      }).$mount(this)
  }
}

window.customElements.define('vue-element', VueApp);
