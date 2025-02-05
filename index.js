const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const { getDbConnection } = require("./config/database");

// Load Route
const UserRoute = require("./route/auth.route");
const PortfolioRoute = require("./route/portfolio.route");
const PortfolioItemRoute = require("./route/portfolioItem.route");
const HomeRoute = require("./route/home.route");
const WhatDoWeDoRoute = require("./route/whatDoWeDo.route");
const PartnersRoute = require("./route/partners.route");
const CommentRoute = require("./route/comment.route");
const AwardRoute = require("./route/awards.route");
const TeamsRoute = require("./route/teams.route");
const JobsRoute = require("./route/jobs.route");
const CommentStaffRoute = require("./route/commentStaff.route.js");
const BlogRoute = require("./route/blog.route.js");
const BlogDetailsRoute = require("./route/blog_details.route.js");
const AboutRoute = require("./route/about.route.js");
const BannerRoute = require("./route/banner.route.js");
const NextPostRoute = require("./route/nextPost.route.js");
const PartnerLogoRoute = require("./route/partnerLogo.route.js");
const shareRoute = require("./route/share.route.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(passport.initialize());

require("./config/passport");
app.use(passport.initialize());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use(express.static(path.join(__dirname)));

app.use("/api/user", UserRoute);
app.use("/api/portfolio", PortfolioRoute);
app.use("/api/portfolioItem", PortfolioItemRoute);
app.use("/api/homepage", HomeRoute);
app.use("/api/whatdowedo", WhatDoWeDoRoute);
app.use("/api/partners", PartnersRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/awards", AwardRoute);
app.use("/api/teams", TeamsRoute);
app.use("/api/jobs", JobsRoute);
app.use("/api/commentStaff", CommentStaffRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/blogDetails", BlogDetailsRoute);
app.use("/api/about", AboutRoute);
app.use("/api/banner", BannerRoute);
app.use("/api/nextpost", NextPostRoute);
app.use("/api/partner", PartnerLogoRoute);
app.use("/api/share", shareRoute);
const port = 5000;

const checkDatabaseConnection = async () => {
  try {
    const db = await getDbConnection();
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
checkDatabaseConnection();
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
