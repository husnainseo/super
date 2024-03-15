import * as express from 'express';
import {  deleteListing, deleteListingUser, editListing, getAllListings, getListing, getSingleListing, uploadListing } from '../controllers/listing.controller';
import { isAuthenticated, isAuthorized } from '../middlewares/auth.middleware';
import { updateAccessToken } from '../controllers/user.controller';

const listingRouter = express.Router();

listingRouter.post("/add-listing",updateAccessToken, isAuthenticated, uploadListing);
listingRouter.put("/edit-listing/:id",updateAccessToken, isAuthenticated, editListing);
listingRouter.get("/listings", getAllListings);
listingRouter.get("/listing/:id", getSingleListing);
listingRouter.get("/get-listing",updateAccessToken, isAuthenticated, isAuthorized("admin"), getListing);
listingRouter.delete("/delete-listing/:id",updateAccessToken, isAuthenticated, isAuthorized("admin"),deleteListing);
listingRouter.delete("/delete-listing-user/:id",updateAccessToken, isAuthenticated, deleteListingUser);
export default listingRouter;