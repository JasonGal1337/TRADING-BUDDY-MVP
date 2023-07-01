const router = require("express").Router();
const tradeController = require("../controllers/tradeController.js");

router.get("/", tradeController.getAllTrades);
router.post("/", tradeController.postOneTrade);
router.delete("/:id", tradeController.deleteTrade);
router.put("/:id", tradeController.updateTrade);
router.get("/:userId", tradeController.getAllUserTrades);

module.exports = router; 