import publicRoutes from '@/router/routes/public.js';
import privateRoutes from '@/router/routes/private.js';
// can import other routes that you allowcate other than public and private

export default publicRoutes.concat(privateRoutes);
