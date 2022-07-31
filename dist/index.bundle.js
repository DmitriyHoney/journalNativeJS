"use strict";
(self["webpackChunkJournalApplication"] = self["webpackChunkJournalApplication"] || []).push([["index"],{

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_reactive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/reactive.js */ "./src/core/reactive.js");

const m1 = new _core_reactive_js__WEBPACK_IMPORTED_MODULE_0__.Model({
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
const c1 = new _core_reactive_js__WEBPACK_IMPORTED_MODULE_0__.Controller({
  model: m1,
  methods: {
    incPrice() {
      console.log(1111, this);
      this.price++;
    }

  }
});
const v1 = new _core_reactive_js__WEBPACK_IMPORTED_MODULE_0__.View({
  model: m1,
  controller: c1,
  template: () => createElement("div", {
    class: "test"
  }, createElement("span", null, "Price: ", undefined.price), createElement("span", null, "Total: ", undefined.total), createElement("button", {
    onclick: undefined.incPrice
  }, "Inc"))
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v1.template);


/***/ }),

/***/ "./src/core/reactive.js":
/*!******************************!*\
  !*** ./src/core/reactive.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller),
/* harmony export */   "Model": () => (/* binding */ Model),
/* harmony export */   "View": () => (/* binding */ View)
/* harmony export */ });
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
реализует функцию render,
которая обновляет только тот узел DOM, который изменился
*/
class View {
  constructor({ model, controller, template }) {
    this.model = model;
    this.controller = controller;
    this.template = template;
  }
}


function createElement(tag, attrs, ...children) {
  const element = Object.assign(document.createElement(tag), attrs);
  for (const child of children) {
    if (Array.isArray(child)) element.append(...child);
    else element.append(child);
  }
  return element;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/App.js */ "./src/components/App.js");



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

const app = _components_App_js__WEBPACK_IMPORTED_MODULE_0__["default"];
window.document.getElementById('app').replaceWith(app);




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTZEO0FBQzdELGVBQWUsb0RBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNELGVBQWUseURBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNELGVBQWUsbURBQUk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLHlDQUF5QyxTQUFJLGdEQUFnRCxTQUFJO0FBQ3BHLGFBQWEsU0FBSTtBQUNqQixHQUFHO0FBQ0gsQ0FBQztBQUNELGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsK0JBQStCO0FBQy9CO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ087QUFDUCxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCwrQkFBK0I7QUFDL0I7QUFDQSwrQkFBK0I7QUFDL0I7QUFDTztBQUNQLGdCQUFnQixnQkFBZ0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxnQkFBZ0IsNkJBQTZCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdElzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLDBEQUFHO0FBQ2YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Kb3VybmFsQXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy9BcHAuanMiLCJ3ZWJwYWNrOi8vSm91cm5hbEFwcGxpY2F0aW9uLy4vc3JjL2NvcmUvcmVhY3RpdmUuanMiLCJ3ZWJwYWNrOi8vSm91cm5hbEFwcGxpY2F0aW9uLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsLCBDb250cm9sbGVyLCBWaWV3IH0gZnJvbSAnQC9jb3JlL3JlYWN0aXZlLmpzJztcbmNvbnN0IG0xID0gbmV3IE1vZGVsKHtcbiAgc3RhdGU6IHtcbiAgICBwcmljZTogNSxcbiAgICBxdWFudGl0eTogMlxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHRvdGFsKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJpY2UgKiB0aGlzLnF1YW50aXR5O1xuICAgIH1cblxuICB9XG59KTtcbmNvbnN0IGMxID0gbmV3IENvbnRyb2xsZXIoe1xuICBtb2RlbDogbTEsXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNQcmljZSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKDExMTEsIHRoaXMpO1xuICAgICAgdGhpcy5wcmljZSsrO1xuICAgIH1cblxuICB9XG59KTtcbmNvbnN0IHYxID0gbmV3IFZpZXcoe1xuICBtb2RlbDogbTEsXG4gIGNvbnRyb2xsZXI6IGMxLFxuICB0ZW1wbGF0ZTogKCkgPT4gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3M6IFwidGVzdFwiXG4gIH0sIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiUHJpY2U6IFwiLCB0aGlzLnByaWNlKSwgY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJUb3RhbDogXCIsIHRoaXMudG90YWwpLCBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtcbiAgICBvbmNsaWNrOiB0aGlzLmluY1ByaWNlXG4gIH0sIFwiSW5jXCIpKVxufSk7XG5leHBvcnQgZGVmYXVsdCB2MS50ZW1wbGF0ZTtcbiIsImxldCB0YXJnZXQgPSBudWxsO1xuXG5jbGFzcyBEZXBlbmRlbmN5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVycyA9IFtdO1xuICB9XG4gIGRlcGVuZCgpIHtcbiAgICBpZiAodGFyZ2V0ICYmICF0aGlzLnN1YnNjcmliZXJzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaCh0YXJnZXQpO1xuICAgIH1cbiAgfVxuICBub3RpZnkoKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChmbikgPT4gZm4oKSk7XG4gIH1cbn1cblxuLypcbtCU0LDQvdC90YvQuSDQutC70LDRgdGBINC/0YDQuNC90LjQvNCw0LXRgiBzdGF0ZSDQutC+0LzQv9C+0L3QtdC90YLRiyxcbtCwINGC0LDQutC20LUgY29tcHV0ZWQgLSAo0Y/QstC70Y/RjtGC0YHRjyDRgNC10LDQutGC0LjQstC90YvQvClcbtCf0YDQuNC80LXRgDpcbiAgY29uc3QgbTEgPSBuZXcgTW9kZWwoe1xuICAgIHN0YXRlOiB7XG4gICAgICBwcmljZTogNSxcbiAgICAgIHF1YW50aXR5OiAyXG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgdG90YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaWNlICogdGhpcy5xdWFudGl0eTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnNvbGUubG9nKG0xLnN0YXRlLnRvdGFsKTsgLy8gMTBcbiAgbTEucHJpY2UgPSA3O1xuICBjb25zb2xlLmxvZyhtMS5zdGF0ZS50b3RhbCk7IC8vIDE0XG4qL1xuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgY29uc3RydWN0b3IoeyBzdGF0ZSwgY29tcHV0ZWQgfSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmNvbXB1dGVkID0gY29tcHV0ZWQ7XG5cbiAgICB0aGlzLmJpbmREZXBlbmRlbmN5Rm9yU3RhdGUoKTtcbiAgICB0aGlzLmluaXRXYXRjaGVycygpO1xuICB9XG4gIGJpbmREZXBlbmRlbmN5Rm9yU3RhdGUoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5zdGF0ZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBsZXQgaW5pdFZhbHVlID0gdGhpcy5zdGF0ZVtrZXldO1xuICAgICAgY29uc3QgZGVwID0gbmV3IERlcGVuZGVuY3koKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnN0YXRlLCBrZXksIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIGRlcC5kZXBlbmQoKTtcbiAgICAgICAgICByZXR1cm4gaW5pdFZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnc2V0dGVyJyk7XG4gICAgICAgICAgaW5pdFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgZGVwLm5vdGlmeSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRXYXRjaGVycygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbXB1dGVkKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMud2F0Y2hlcigoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGVba2V5XSA9IHRoaXMuY29tcHV0ZWRba2V5XS5iaW5kKHRoaXMuc3RhdGUpKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHdhdGNoZXIoZm4pIHtcbiAgICB0YXJnZXQgPSBmbjtcbiAgICB0YXJnZXQoKTtcbiAgICB0YXJnZXQgPSBudWxsO1xuICB9XG59XG5cblxuLypcbiAg0JTQsNC90L3Ri9C5INC60LvQsNGB0YEg0L/RgNC40L3QuNC80LDQtdGCIGluc3RhbmNlIG1vZGVsLFxuICDQuCBtZXRob2RzIC0g0LzQtdGC0L7QtNGLINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8gc3RhdGVcblxuICDQn9GA0LjQvNC10YA6XG4gIG0xIC0g0LjQtyDQv9GA0LXQtNGL0LTRg9GJ0LXQs9C+INC/0YDQuNC80LXRgNCwXG5cbiAgY29uc3QgYzEgPSBuZXcgQ29udHJvbGxlcih7XG4gICAgbW9kZWw6IG0xLFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIGluY1ByaWNlKCkge1xuICAgICAgICBjb25zb2xlLmxvZygxMTExLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wcmljZSsrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgY29uc29sZS5sb2coYzEuc3RhdGUucHJpY2UpOyAvLyA1XG4gINGBMS5tZXRob2RzLmluY1ByaWNlKCk7XG4gIGNvbnNvbGUubG9nKG0xLnN0YXRlLnByaWNlKTsgLy8gNlxuKi9cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoeyBtb2RlbCwgbWV0aG9kcyB9KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMubWV0aG9kcyA9IG1ldGhvZHM7XG4gICAgdGhpcy5iaW5kTWV0aG9kc1RvTW9kZWwoKTtcbiAgfVxuICBiaW5kTWV0aG9kc1RvTW9kZWwoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5tZXRob2RzKS5mb3JFYWNoKChtZXRob2RLZXkpID0+IHtcbiAgICAgIHRoaXMubWV0aG9kc1ttZXRob2RLZXldID0gdGhpcy5tZXRob2RzW21ldGhvZEtleV0uYmluZCh0aGlzLm1vZGVsLnN0YXRlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cbi8qXG7QlNCw0L3QvdGL0Lkg0LrQu9Cw0YHRgSDQv9GA0LjQvdC40LzQsNC10YIgaW5zdGFuY2UgbW9kZWwsIGluc3RhbmNlIGNvbnRyb2xsZXIsIHRlbXBsYXRlXG7QstC90YPRgtGA0Lgg0LTQvtGB0YLRg9C/0L3RiyBzdGF0ZSwgY29tcHV0ZWQsIG1ldGhvZHMuXG7RgNC10LDQu9C40LfRg9C10YIg0YTRg9C90LrRhtC40Y4gcmVuZGVyLFxu0LrQvtGC0L7RgNCw0Y8g0L7QsdC90L7QstC70Y/QtdGCINGC0L7Qu9GM0LrQviDRgtC+0YIg0YPQt9C10LsgRE9NLCDQutC+0YLQvtGA0YvQuSDQuNC30LzQtdC90LjQu9GB0Y9cbiovXG5leHBvcnQgY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKHsgbW9kZWwsIGNvbnRyb2xsZXIsIHRlbXBsYXRlIH0pIHtcbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgYXR0cnMsIC4uLmNoaWxkcmVuKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKSwgYXR0cnMpO1xuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSBlbGVtZW50LmFwcGVuZCguLi5jaGlsZCk7XG4gICAgZWxzZSBlbGVtZW50LmFwcGVuZChjaGlsZCk7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG4iLCJcbmltcG9ydCBBcHAgZnJvbSAnQC9jb21wb25lbnRzL0FwcC5qcyc7XG5cbi8vIGNsYXNzIEFwcCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuLy8gICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4vLyAgICAgc3VwZXIoLi4uYXJncyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtcbi8vICAgICAgIGNvdW50ZXI6IDBcbi8vICAgICB9O1xuLy8gICAgIHRoaXMuY3JlYXRlVGVtcGxhdGUoKTtcbi8vICAgfVxuXG4vLyAgIGNyZWF0ZVRlbXBsYXRlKCkge1xuLy8gICAgIGNvbnN0IGNvdW50ZXIgPSB0aGlzLiQuY3JlYXRlKCdzcGFuJykuYWRkVGV4dCh0aGlzLnN0YXRlLmNvdW50ZXIpLiRlbDtcbi8vICAgICBjb25zdCBidG4gPSB0aGlzLiRcbi8vICAgICAgIC5jcmVhdGUoJ2J1dHRvbicpXG4vLyAgICAgICAuYWRkVGV4dCgnY2xpY2sgbWUnKVxuLy8gICAgICAgLm9uKCdjbGljaycsIHRoaXMuY2xpY2suYmluZCh0aGlzKSkuJGVsO1xuLy8gICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLiQuY3JlYXRlKCdkaXYnKS5hcHBlbmRUbyhbYnRuLCBjb3VudGVyXSk7XG4vLyAgIH1cblxuLy8gICBjbGljaygpIHtcbi8vICAgICB0aGlzLnN0YXRlLmNvdW50ZXIrKztcbi8vICAgICB0aGlzLmNyZWF0ZVRlbXBsYXRlKCk7XG4vLyAgICAgdGhpcy5yZW5kZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbi8vICAgfVxuLy8gfVxuXG5jb25zdCBhcHAgPSBBcHA7XG53aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpLnJlcGxhY2VXaXRoKGFwcCk7XG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9