
import App from '@/components/App.js';

window.document.getElementById('app').replaceWith(App);
/*
  Как вызвать перерендеринг точечный,
  я считаю нужен класс в котором есть метод mount
  он выполняется при базовом вызове, а также в последущих
  вызовах core,
  я предлагаю при изменении state, setter, getter, дергать render,
  предварительно создать паттерн observer,
  когда рендер дёргается перерисовать основной mount,
  возможно сделать мемоизацию дабы был точечный рендер
*/

