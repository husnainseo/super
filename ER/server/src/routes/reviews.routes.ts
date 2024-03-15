import * as express from 'express';
import { addReview,getAllReviews } from '../controllers/review.controller';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.middleware';

const reviewsRouter = express.Router();

reviewsRouter.get("/add-review",addReview);
reviewsRouter.get("/review/:id",getAllReviews);

export default reviewsRouter;

