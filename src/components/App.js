import { Model, Controller, View } from '@/core/reactive.js';

function createElement(tag, attrs, ...children) {
  const element = Object.assign(document.createElement(tag), attrs);

  for (const child of children) {
    if (Array.isArray(child)) element.append(...child);else element.append(child);
  }

  return element;
}

const m1 = new Model({
  state: {
    price: 5,
    quantity: 2
  },
  computed: {
    total() {
      return this.price * this.quantity;
    }

  }
});
const c1 = new Controller({
  model: m1,
  methods: {
    incPrice() {
      console.log(1111, this);
      this.price++;
    }

  }
});
const v1 = new View({
  model: m1,
  controller: c1,
  template: createElement("div", {
    class: "test"
  }, createElement("span", null, "Price: ", m1.state.price), createElement("span", null, "Total: ", m1.state.total), createElement("button", {
    onclick: c1.methods.incPrice
  }, "Inc"))
});
export default v1.template;