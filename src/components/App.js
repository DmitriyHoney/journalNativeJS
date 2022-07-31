import BaseComponent from '@/core/reactive.js';

function createElement(tag, attrs, ...children) {
  if (typeof tag === 'object') {
    return tag;
  }

  const element = Object.assign(document.createElement(tag), attrs);

  for (const child of children) {
    if (Array.isArray(child)) element.append(...child);else element.append(child);
  }

  return element;
}

const Header = new BaseComponent({
  state: {
    key: 1,
    title: 'Header'
  },
  computed: {
    keyUpdated() {
      return this.price * this.quantity;
    }

  },
  methods: {
    incKey() {
      this.key++;
    }

  },
  template: {
    render({
      state,
      methods
    }) {
      return createElement("header", {
        class: "header"
      }, state.title, " ", state.key);
    }

  }
});
const comp1 = new BaseComponent({
  state: {
    price: 5,
    quantity: 2
  },
  computed: {
    total() {
      return this.price * this.quantity;
    }

  },
  methods: {
    incPrice() {
      this.price++;
    }

  },
  template: {
    render({
      state,
      methods
    }) {
      return createElement("div", {
        class: "test"
      }, createElement(Header, null), createElement("span", null, "Price: ", state.price), " ", createElement("br", null), createElement("span", null, "Quantity: ", state.quantity), " ", createElement("br", null), createElement("span", null, "Total: ", state.total), " ", createElement("br", null), createElement("button", {
        onclick: methods.incPrice
      }, "Inc"));
    }

  }
});
window.comp1 = comp1;
window.comp2 = Header;
export default comp1;