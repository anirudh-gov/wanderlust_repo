const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");
const wrapAsync =require("../uitls/wrapAsync.js");
const ExpressError = require("../uitls/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Review = require("../models/review.js");
const flash = require("connect-flash");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage, cloudinary} = require("../cloudConfig.js");
const upload = multer({ storage});

const ListingController = require("../controllers/listings.js");


router
    .route("/")
    .get(wrapAsync(ListingController.index)) //Index route
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.createListing));//create route

//New route
router.get("/new", isLoggedIn, ListingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(ListingController.showListing)) //Show route
    .put(isLoggedIn,isOwner, upload.single('listing[image]'), validateListing ,wrapAsync(ListingController.updateListing))//Update Route
    .delete(isLoggedIn,  isOwner,wrapAsync(ListingController.destroyListing));//Delete route

//Edit route
router.get("/:id/edit", isLoggedIn,  isOwner,wrapAsync(ListingController.renderEditForm));

module.exports = router;