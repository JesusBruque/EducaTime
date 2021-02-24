import { Router } from 'express';
import authenticationRoutes from './routes/authentication.routes';
import lectionRoutes from './routes/lection.routes';
import blogRoutes from './routes/blog.routes';
import courseRoutes from './routes/course.routes';
import orderRoutes from './routes/order.routes';
import bookmarkRoutes from './routes/bookmark.routes';
import codeRoutes from './routes/code.routes';

export default () => {
    const app = Router();
    authenticationRoutes(app);
    lectionRoutes(app);
    blogRoutes(app);
    courseRoutes(app);
    orderRoutes(app);
    bookmarkRoutes(app);
    blogRoutes(app);
    codeRoutes(app);
    return app;
};
