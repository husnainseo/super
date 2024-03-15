import * as express from 'express';
import { getListingAnalytics, getUserAnalytics } from '../controllers/analytics.controller';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.middleware';

const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics",isAuthenticated,isAuthorized("admin"),getUserAnalytics);
analyticsRouter.get("/get-listings-analytics",isAuthenticated,isAuthorized("admin"),getListingAnalytics);

export default analyticsRouter;
