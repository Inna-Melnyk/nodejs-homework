const express = require("express");

const cntrl = require("../../controllers/index");

const { validateBody, isValid, authenticate } = require("../../middlewares");

const {
  addSchema,
  updateFavouriteSchema,
} = require("../../schemas/contactsSchemas");

const router = express.Router();

router.get("/", authenticate, cntrl.getAll);

router.get("/:contactId", authenticate, isValid, cntrl.getById);

router.post("/", authenticate, validateBody(addSchema), cntrl.add);

router.delete("/:contactId", authenticate, isValid, cntrl.deleteById);

router.put(
  "/:contactId",
  authenticate, isValid,
  validateBody(addSchema),
  cntrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValid,
  validateBody(updateFavouriteSchema),
  cntrl.updateFavourite
);

module.exports = router;
