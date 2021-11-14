import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask';

Vue.config.productionTip = false

Vue.use(VueMask);

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
