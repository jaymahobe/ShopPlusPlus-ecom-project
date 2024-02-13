require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const productsRouter = require("./routes/products");
const jwt = require("jsonwebtoken");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const nodemailer = require("nodemailer");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const getOTPMail = require("./routes/getOTPMail");
const wishlistRouter = require("./routes/wishlist");
const bcrypt = require("bcrypt");
const path = require("path");
const { User } = require("./model/User");
const { cookieExtractor, database } = require("./common/common");
const opts = {};
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
function setCacheControl(req, res, next) {
  res.setHeader("Cache-Control", "no-store");
  next();
}
// Connect to the MongoDB database
database().catch((err) => {
  console.log(err);
});
app.use(express.static(path.resolve(__dirname, "build")));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_ENV_KEY;
app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));
app.use(setCacheControl);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors({ exposedHeaders: ["X-Total-Count"] }));
app.use("/auth", authRouter.router);
app.use("/products", productsRouter.router);
app.use("/users", usersRouter.router);
app.use("/cart", cartRouter.router);
app.use("/order", orderRouter.router);
app.use("/wishlist", wishlistRouter.router);

// Passport configuration
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();

      if (!user) {
        done(null, false, {
          message: "Invalid credentials/User not registered ",
        });
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return done(err, { message: "Invalid credentials" });
        }

        if (result) {
          const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.SECRET_ENV_KEY,
            { expiresIn: "1h" } // Set an expiration time if needed
          );
          return done(null, { id: user.id, role: user.role, token });
        } else {
          return done(null, false, { message: "Invalid credentials" });
        }
      });
    } catch (err) {
      console.log(err);
      done(err);
    }
  })
);
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);

      if (user) {
        return done(null, { id: user.id, role: user.role });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
// stripe payment system
app.post("/create-payment-intent", async (req, res) => {
  const { totalAmt } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmt * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Home route
app.get("/", (req, res) => {
  res.json({ status: "Welcome to ShopPlusPlus API endsPoint" });
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is started at port: ${PORT}`);
});
