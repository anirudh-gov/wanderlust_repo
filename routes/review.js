const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync =require("../uitls/wrapAsync.js");
const ExpressError = require("../uitls/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const flash = require("connect-flash");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//review submit route or post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;