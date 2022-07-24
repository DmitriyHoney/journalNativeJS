import BaseRouter from '@core/router.js';

export default new BaseRouter({
  '/calendar': '@/components/Calendar/Calendar.js',
  '404': '@/components/NotFound/NotFound.js'
});
