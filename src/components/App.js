import Header from './Header.js';

const App = {
  // components: [ Header ],
  render() {
    const header = Header.render();
    const el = document.createElement('div');
    el.innerHTML = 'Hello, world!';
    document.getElementById('app').appendChild(header);
    document.getElementById('app').appendChild(el);
  }
};


export default App;
