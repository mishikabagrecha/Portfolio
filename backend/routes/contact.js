const express = require("express");
const router  = express.Router();
const { sendContact, getMessages } = require("../controllers/contactController");

router.post("/",  sendContact);
router.get("/",   getMessages);   // protect this in production!

module.exports = router;
