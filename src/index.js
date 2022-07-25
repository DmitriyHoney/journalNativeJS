
import { CreateApp } from './core/ui.js';
import router from '@/router/index.js';
import './scss/style.scss';

// class App extends BaseComponent {
//   constructor(...args) {
//     super(...args);
//     this.state = {
//       counter: 0
//     };
//     this.createTemplate();
//   }

//   createTemplate() {
//     const counter = this.$.create('span').addText(this.state.counter).$el;
//     const btn = this.$
//       .create('button')
//       .addText('click me')
//       .on('click', this.click.bind(this)).$el;
//     this.template = this.$.create('div').appendTo([btn, counter]);
//   }

//   click() {
//     this.state.counter++;
//     this.createTemplate();
//     this.render(document.getElementById('app'));
//   }
// }

export const App = new CreateApp().mount({
  root: '.main',
  router
});
