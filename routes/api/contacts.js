const express = require("express");

const cntrl = require("../../controllers/index");

const { validateBody, isValid } = require("../../middlewares");

const {
  addSchema,
  updateFavouriteSchema,
} = require("../../schemas/contactsSchemas");

const router = express.Router();

router.get("/", cntrl.getAll);

router.get("/:contactId", isValid, cntrl.getById);

router.post("/", validateBody(addSchema), cntrl.add);

router.delete("/:contactId", isValid, cntrl.deleteById);

router.put("/:contactId", isValid, validateBody(addSchema), cntrl.updateById);

router.patch(
  "/:contactId/favorite",
  isValid,
  validateBody(updateFavouriteSchema),
  cntrl.updateFavourite
);

module.exports = router;
