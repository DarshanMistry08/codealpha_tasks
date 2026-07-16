require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const { conenctToMongodb } = require('./connenct');
const URL = require('./models/url.model');
const staticRoute = require('./routes/static.route');
const urlRoute = require('./routes/url.route');
const userRoute = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const { restricToLoggedinUserOnly } = require("./middlewares/auth")

conenctToMongodb()
  .then(() => console.log("connected"))
  .catch(() => console.log("DB Error"));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);   // login, signup
app.use("/", restricToLoggedinUserOnly, staticRoute);     // FOR home, login page

// Protected routes
app.use("/url", restricToLoggedinUserOnly, urlRoute);

app.get("/url", (req, res) => {
  res.redirect("/");
});

app.get('/url/:shortID', async (req, res) => {
  try {
    const shortID = req.params.shortID;

    const entry = await URL.findOneAndUpdate(
      { ShortId: shortID },
      {
        $push: {
          visitHistory:
          {
            timestamp: Date.now(),
            shortId: shortID
          },
        },
      },

    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    return res.status(500).send("server Error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on PORT ${process.env.PORT}`);
});
