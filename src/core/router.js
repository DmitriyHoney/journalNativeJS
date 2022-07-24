/*
  Данный файл предоставляет функции для изменения урла,
  просмотра истории переходов, переходить по истории,
  подгружать компонент в зависимости от url
*/

class BaseRouter {
  constructor(routes = {}) {
    this.routes = routes;
  }
  async push(url) {
    window.history.pushState(null, null, url);
    // const componentPath = this.routes[url]
    //   ? this.routes[url]
    //   : this.routes['404'];
    const component = await import('@/components/NotFound/NotFound.js');
    component.default.render();
    // component
    //   ? component.render()
    //   : this.routes['/404'].render();
  }
  prev() {
    window.history.back();
  }
}

export default BaseRouter;
