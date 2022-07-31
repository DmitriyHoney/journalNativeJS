import BaseComponent from '@/core/reactive.js';

function createElement(tag, attrs, ...children) {
  if (typeof tag === 'object') {
    return tag
  }
  const element = Object.assign(document.createElement(tag), attrs);
  for (const child of children) {
    if (Array.isArray(child)) element.append(...child);
    else element.append(child);
  }
  return element;
}

const Header = new BaseComponent({
  state: {
    key: 1,
    title: 'Header',
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
    render({ state, methods }) {
      return <header class="header">
        {state.title} {state.key}
      </header>
    }
  }
});

const App = new BaseComponent({
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
    render({ state, methods }) {
      return <div class="test">
        <Header />
        <span>Price: {state.price}</span> <br />
        <span>Quantity: {state.quantity}</span> <br />
        <span>Total: {state.total}</span> <br />
        <button onclick={methods.incPrice}>Inc</button>
      </div>
    }
  }
});

window.comp1 = App;
window.comp2 = Header;

export default App;
