let target = null;

class Dependency {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach((fn) => fn());
  }
}

/*
Данный класс принимает state компоненты,
а также computed - (являются реактивным)
Пример:
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

  console.log(m1.state.total); // 10
  m1.price = 7;
  console.log(m1.state.total); // 14
*/
class Model {
  constructor({ state, computed }) {
    this.state = state;
    this.computed = computed;

    this.bindDependencyForState();
    this.initWatchers();
  }
  bindDependencyForState() {
    Object.keys(this.state).forEach((key) => {
      let initValue = this.state[key];
      const dep = new Dependency();
      Object.defineProperty(this.state, key, {
        get() {
          dep.depend();
          return initValue;
        },
        set(value) {
          console.log('setter');
          initValue = value;
          dep.notify();
        }
      });
    });
  }

  initWatchers() {
    Object.keys(this.computed).forEach((key) => {
      this.watcher(() => {
        this.state[key] = this.computed[key].bind(this.state)();
      });
    });
  }

  watcher(fn) {
    target = fn;
    target();
    target = null;
  }
}


/*
  Данный класс принимает instance model,
  и methods - методы для изменения state

  Пример:
  m1 - из предыдущего примера

  const c1 = new Controller({
    model: m1,
    methods: {
      incPrice() {
        console.log(1111, this);
        this.price++;
      }
    }
  });

  console.log(c1.state.price); // 5
  с1.methods.incPrice();
  console.log(m1.state.price); // 6
*/
class Controller {
  constructor({ model, methods }) {
    this.model = model;
    this.methods = methods;
    this.bindMethodsToModel();
  }
  bindMethodsToModel() {
    Object.keys(this.methods).forEach((methodKey) => {
      this.methods[methodKey] = this.methods[methodKey].bind(this.model.state);
    });
  }
}


/*
Данный класс принимает instance model, instance controller, template
внутри доступны state, computed, methods.
реализует функцию render, которая обновляет только тот узел DOM, который изменился
*/
class View {
  constructor({ model, controller, template }) {
    this.model = model;
    this.controller = controller;
    this.template = template;
  }
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
  template: () => `<div class="test">
      <span>Price: {{this.price}}</span>
      <span>Total: {{this.total}}</span>
      <button @onclick="{{this.incPrice}}">Inc</button>
    </div>
  `
});


