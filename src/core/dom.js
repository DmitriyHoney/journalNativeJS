class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  addText(text = '') {
    this.$el.textContent = text;
    return this;
  }

  addValue(value = '') {
    this.$el.value = value;
    return this;
  }

  append(el) {
    this.$el.append(el);
    return this.$el;
  }

  inner(value) {
    this.$el.innerHTML = value;
    return this.$el;
  }

  appendTo(elements = []) {
    elements.forEach((el) => this.$el.append(el));
    return this.$el;
  }

  clear() {
    this.$el.innerHTML = '';
    return this.$el;
  }

  on(eventType, cb) {
    this.$el.addEventListener(eventType, cb);
    return this;
  }
  off(eventType, cb) {
    this.$el.removeEventListener(eventType, cb);
    return this;
  }
}

function $(selector) {
  return new Dom(selector);
}
$.create = (tag = 'div', classes = []) => {
  const el = document.createElement(tag);
  console.log('classes', classes);
  classes.forEach((cls) => el.classList.add(cls));
  return $(el);
};

export default $;
