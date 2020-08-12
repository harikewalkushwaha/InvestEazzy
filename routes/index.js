var express = require('express');
var router = express.Router();
// var contact = require('../models/conatctus')
var signin = require('../models/signup')
var product = require('../models/addproduct')
const offer = require('../models/offer');
const category = require('../models/category');
const Settings = require('../models/settings')
const Cart = require('../models/cart1')
var posts = require('../models/posts')
const Orders = require('../models/order');
const banner=require('../models/banner')
const smtpEmail = require('../config/verifyEmail');
var bcrypt = require('bcryptjs')
var nodemailer=require('nodemailer')
var passport = require('passport')
const { render } = require('ejs');
var multer = require('multer');
const checksum_lib = require('../paytm/checksum.js');
// const addarea = require('../models/addarea');
// const orders = require('../models/order');

const { post } = require('./admin');
const order = require('../models/order');
const { settings } = require('../app');
const { sign } = require('crypto');
// const cart = require('../models/cart');


function isLoggedIn(req, res, next) {
  // console.log("hello" + req.isAuthenticated())
  if (req.isAuthenticated())
    return next()
  else
    res.redirect('/sign_in');

}

function notLoggedIn(req, res, next) {
  // console.log("hello" + req.isAuthenticated())
  if (!req.isAuthenticated())
    return next();
  else
    res.redirect('/');

}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('invest-user/main',{layout:'index'});
});

router.get('/about', function(req, res, next) {
  res.render('invest-user/about',{layout:'index'});
});


router.get('/blog_single_view/:id', function (req, res, next) {
  posts.findById(req.params.id)
    .then((post) => {
      res.render('invest-user/blog_single_view', { list: post,layout: 'backend' });

      
    })

  });

 /*router.get('/blog_single_view', function(req, res, next) {
  res.render('invest-user/blog_single_view',{layout:'index'});
}); */
router.get('/browse_companies', function(req, res, next) {
  res.render('invest-user/browse_companies',{layout:'index'});
});
router.get('/browse_freelancers', function(req, res, next) {
  res.render('invest-user/browse_freelancers',{layout:'index'});
});
router.get('/browse_jobs', function(req, res, next) {
  res.render('invest-user/browse_jobs',{layout:'index'});
});
router.get('/browse_projects', function(req, res, next) {
  res.render('invest-user/browse_projects',{layout:'index'});
});
router.get('/checkout', function(req, res, next) {
  res.render('invest-user/checkout',{layout:'index'});
});
router.get('/company_bids', function(req, res, next) {
  res.render('invest-user/company_bids',{layout:'index'});
});
router.get('/company_bookmarks', function(req, res, next) {
  res.render('invest-user/company_bookmarks',{layout:'index'});
});
router.get('/company_dashboard', function(req, res, next) {
  res.render('invest-user/company_dashboard',{layout:'index'});
});
router.get('/company_jobs', function(req, res, next) {
  res.render('invest-user/company_jobs',{layout:'index'});
});
router.get('/company_members', function(req, res, next) {
  res.render('invest-user/company_members',{layout:'index'});
});
router.get('/company_messages', function(req, res, next) {
  res.render('invest-user/company_messages',{layout:'index'});
});
router.get('/company_notifications', function(req, res, next) {
  res.render('invest-user/company_notifications',{layout:'index'});
});
router.get('/company_payments', function(req, res, next) {
  res.render('invest-user/company_payments',{layout:'index'});
});
router.get('/company_profile', function(req, res, next) {
  res.render('invest-user/company_profile',{layout:'index'});
});
router.get('/company_reviews', function(req, res, next) {
  res.render('invest-user/company_reviews',{layout:'index'});
});
router.get('/company_setting', function(req, res, next) {
  res.render('invest-user/company_setting',{layout:'index'});
});
router.get('/contact_us', function(req, res, next) {
  res.render('invest-user/contact_us',{layout:'index'});
});
router.get('/forgot_password', function(req, res, next) {
  res.render('invest-user/forgot_password',{layout:'index'});
});
router.get('/help_center', function(req, res, next) {
  res.render('invest-user/help_center',{layout:'index'});
});
router.get('/job_single_view', function(req, res, next) {
  res.render('invest-user/job_single_view',{layout:'index'});
});
router.get('/my_freelancer_bids', function(req, res, next) {
  res.render('invest-user/my_freelancer_bids',{layout:'index'});
});
router.get('/my_freelancer_bookmarks', function(req, res, next) {
  res.render('invest-user/my_freelancer_bookmarks',{layout:'index'});
});
router.get('/my_freelancer_dashboard', function(req, res, next) {
  res.render('invest-user/my_freelancer_dashboard',{layout:'index'});
});
router.get('/my_freelancer_jobs', function(req, res, next) {
  res.render('invest-user/my_freelancer_jobs',{layout:'index'});
});
router.get('/my_freelancer_messages', function(req, res, next) {
  res.render('invest-user/my_freelancer_messages',{layout:'index'});
});
router.get('/my_freelancer_notifications', function(req, res, next) {
  res.render('invest-user/my_freelancer_notifications',{layout:'index'});
});
router.get('/my_freelancer_payments', function(req, res, next) {
  res.render('invest-user/my_freelancer_payments',{layout:'index'});
});
router.get('/my_freelancer_portfolio', function(req, res, next) {
  res.render('invest-user/my_freelancer_portfolio',{layout:'index'});
});
router.get('/my_freelancer_reviews', function(req, res, next) {
  res.render('invest-user/my_freelancer_reviews',{layout:'index'});
});
router.get('/my_freelancer_setting', function(req, res, next) {
  res.render('invest/my_freelancer_setting',{layout:'index'});
});
router.get('/other_company_members', function(req, res, next) {
  res.render('invest-user/other_company_members',{layout:'index'});
});
router.get('/other_company_profile', function(req, res, next) {
  res.render('invest-user/other_company_profile',{layout:'index'});
});
router.get('/other_company_reviews', function(req, res, next) {
  res.render('invest-user/other_company_reviews',{layout:'index'});
});
router.get('/other_freelancer_portfolio', function(req, res, next) {
  res.render('invest-user/other_freelancer_portfolio',{layout:'index'});
});
router.get('/other_freelancer_profile', function(req, res, next) {
  res.render('other_freelancer_profile');
});
router.get('/other_freelancer_reviews', function(req, res, next) {
  res.render('other_freelancer_reviews');
});

router.get('/our_blog', function (req, res, next) {
  posts.find({})
  .then((post)=>{
    res.render('invest-user/our_blog', {post:post, layout: 'backend' });
  })
  
  
});

/*router.get('/our_blog', function(req, res, next) {
  res.render('invest-user/our_blog',{layout:'index'});
});*/
router.get('/plan_invoice', function(req, res, next) {
  res.render('invest-user/plan_invoice',{layout:'index'});
});
router.get('/post_a_job', function(req, res, next) {
  res.render('invest-user/post_a_job',{layout:'index'});
});
router.get('/post_a_project', function(req, res, next) {
  res.render('invest-user/post_a_project',{layout:'index'});
});
router.get('/pricing_plans', function(req, res, next) {
  res.render('invest-user/pricing_plans',{layout:'index'});
});
router.get('/privacy_policy', function(req, res, next) {
  res.render('invest-user/privacy_policy',{layout:'index'});
});
router.get('/project_single_views', function(req, res, next) {
  res.render('invest-user/project_single_views',{layout:'index'});
});
router.get('/sign_in', function(req, res, next) {
  res.render('invest-user/sign_in',{layout:'index'});
});
router.get('/sign_up', function(req, res, next) {
  res.render('invest-user/sign_up',{layout:'index'});
});
router.get('/sign_up_company_profile', function(req, res, next) {
  res.render('invest-user/sign_up_company_profile',{layout:'index'});
});
router.get('/sign_up_freelancer_profile', function(req, res, next) {
  res.render('invest-user/sign_up_freelancer_profile',{layout:'index'});
});
router.get('/sign_up_select_profile', function(req, res, next) {
  res.render('invest-user/sign_up_select_profile',{layout:'index'});
});
router.get('/Terms', function(req, res, next) {
  res.render('Terms');
});
router.get('/thank_you', function(req, res, next) {
  res.render('thank_you');
});
router.get('/transaction_invoice', function(req, res, next) {
  res.render('transaction_invoice');
});






module.exports = router;
