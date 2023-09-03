const express = require("express"); 

const cntrl = require("../../controllers/auth")

const { validateBody, authenticate } = require("../../middlewares");

const {schemas} = require("../../models/user")

const router = express.Router();



router.post("/register", validateBody(schemas.registerSchema), cntrl.register);

router.post("/login", validateBody(schemas.loginSchema), cntrl.login);

router.get("/current", authenticate, cntrl.getCurrent);

router.post("/logout", authenticate, cntrl.logout);

router.patch("/", authenticate, cntrl.updateSubscription);


module.exports = router;
