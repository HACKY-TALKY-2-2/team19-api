const express = require("express");
const { cameraGetMid } = require("../controllers/Controller");
const { reportGetMid } = require("../controllers/Controller");

const router = express.Router();

// GET /cameras
router.get("/cameras", cameraGetMid);

// GET /reports
router.get("/reports", reportGetMid);

module.exports = router;
