import { Router } from 'express';
import authenticationRoutes from './routes/authentication.routes';
import lectionRoutes from './routes/lection.routes';
import blogRoutes from './routes/blog.routes';
import courseRoutes from './routes/course.routes';
import orderRoutes from './routes/order.routes';
import statusRoutes from './routes/status.routes';

export default () => {
    const app = Router();
    authenticationRoutes(app);
    lectionRoutes(app);
    blogRoutes(app);
    courseRoutes(app);
    orderRoutes(app);
    statusRoutes(app);
    blogRoutes(app);
    return app;
};
