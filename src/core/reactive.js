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
  const m1 = new ComponentModel({
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
class ComponentModel {
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

  const c1 = new ComponentController({
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
class ComponentController {
  constructor({ model, methods }) {
    this.methods = methods;
    Object.keys(this.methods).forEach((methodKey) => {
      this.methods[methodKey] = this.methods[methodKey].bind(model.state);
    });
  }
}


/*
Данный класс принимает instance model, instance controller, template
внутри доступны state, computed, methods.
реализует функцию render,
которая обновляет только тот узел DOM, который изменился
*/
class ComponentView {
  constructor({ model, controller, template }) {
    this.template = template;
    Object.keys(this.template).forEach((methodKey) => {
      this.template[methodKey] = this.template[methodKey]
        .bind(this, {
          state: model.state,
          methods: controller.methods
        });
    });
  }
}


class BaseComponent {
  constructor({
    state = {},
    computed = {},
    methods = {},
    template = undefined
  }) {
    this._model = new ComponentModel({ state, computed });
    this._controller = new ComponentController({
      model: this._model,
      methods
    });
    this._view = new ComponentView({
      model: this._model,
      controller: this._controller,
      template
    });

    this.state = this._model.state;
    this.computed = this._model.computed;
    this.methods = this._controller.methods;
    this.template = this._view.template;
    return this.template.render();
  }
}

export default BaseComponent;
