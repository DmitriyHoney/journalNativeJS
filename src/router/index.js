import BaseRouter from '@core/router.js';
import NotFound from '@/components/NotFound/NotFound.js';
// import Calendar from '@/components/Calendar/Calendar.js';

export default new BaseRouter({
  // '/calendar': Calendar,
  '404': NotFound
});
