class Router {
  constructor() {
    this.routes = [];
    this.listen();
  }

  add(path, cb) {
    this.routes.push({ path, cb });
    return this;
  }

  remove(path) {
    const i = this.routes.findIndex((r) => r.path === path);
    i >= 0 ? this.routes.splice(i, 1) : null;
    return this;
  }

  flush() {
    this.routes = [];
    return this;
  }

  clearSlashes(path) {
    return path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');
  }

  getCurentUrl() {
    let fragment = '';
    fragment = this.clearSlashes(
      decodeURI(window.location.pathname + window.location.search)
    );
    fragment = fragment.replace(/\?(.*)$/, '');
    return this.clearSlashes(fragment);
  }

  navigate(path = '') {
    window.history.pushState(null, null, this.clearSlashes(path));
    return this;
  }

  listen() {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval.bind(this), 50);
  }

  interval() {
    // todo убрать setInterval
    // ! тестировать
    if (this.current === this.getCurentUrl()) return;
    this.current = this.getCurentUrl();

    this.routes.some((route) => {
      const match = this.current.match(route.path);

      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  }
}

export default Router;
