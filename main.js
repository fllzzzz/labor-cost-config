import {createApp} from 'vue';
import demo from './lc-paintedParts/demo.vue';
import view from './lc-paintedParts/lc-paintedParts.view.vue';
import 'element-plus/dist/index.css';

const app = createApp(view);

app.mount('#root');