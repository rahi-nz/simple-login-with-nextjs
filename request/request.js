const { create } = require("apisauce");

const Cookies = require("universal-cookie");

const baseURL = process.env.HOSTURL || "https://pydtest.com/api/web";

// create login configs
const loginConfig = {
  Authorization: "Basic YnJvd3NlcjoxMjM0NTY=",
  "Content-Type": "application/x-www-form-urlencoded"
};

// create main request configs
const request = create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

// server middleware used to add required headers to request
const serverRequestModifier = (req, res, next) => {
  // initialize request based server cookies
  const cookies = new Cookies(req.headers.cookie);

  const accessToken = cookies.access_token
    ? `Bearer ${cookies.access_token}`
    : null; // default basic access token

  request.setHeader("Authorization", accessToken);
  request.setHeader("Context", cookies.application_name || "P");

  next();
};

module.exports = {
  request,
  serverRequestModifier,
  loginConfig,
  baseURL
};