const Trade = require('../modules/trade.js');

const getAllTrades = async (req,res) => {
    const trades = await Trade.find();
    res.send(trades);
};

const getOneTrade = async (req,res) => {
    const trade = await Trade.findOne({ _id: req.params.id });
    res.send(trade);
};

const postOneTrade = async (req,res) => {
    const newTrade = await Trade.create(req.body);
    res.send({ msg: "trade logged successfully" });
};

const deleteTrade = async (req,res) => {
    const deletedTrade = await Trade.deleteOne({ _id: req.params.id });
    res.send({ msg: "trade deleted" });
};

const updateTrade = async (req,res) => {
    const updatedTrade = await Trade.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "trade updated "});
};

const getAllUserTrades = async (req,res) => {
    const userTrades = await Trade.find({ userId: req.params.userId });
    res.send(userTrades);
};

module.exports = {
    getAllTrades,
    getOneTrade,
    postOneTrade,
    deleteTrade,
    updateTrade,
    getAllUserTrades
}
