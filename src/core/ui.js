
import $ from './dom.js';


export class BaseComponent {
  constructor(app, pathTemplate) {
    this.$ = $;
    this.$app = app;
    this.template = null;
    this.pathTemplate = pathTemplate;
  }
  async render() {
    // let t1 = await import('@/components/NotFound/NotFound.js');
    // t1 = t1.default;
    // console.log(t1);
    // this.template = t1({ name: 'Hello mfuckers' });
    console.log(111);
    this.template = 'asd';
    this.$app.$root.clear();
    this.$app.$root.inner(this.template);
  }
}


export class CreateApp {
  constructor() {
    this.$router = null;
    this.$root = null;
  }
  mount({ root, router }) {
    this.$root = $(root);
    this.$router = router;
    const curUrl = window.location.pathname;
    this.$router.push(curUrl);
    return this;
  }
  createComponent(args) {
    return new BaseComponent(this, args);
  }
}
