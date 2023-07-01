const TradeModel = require('../modules/trade.js');

const getAllTrades = async (req,res) => {
    const Trade = await TradeModel.find();
    res.send(Trade);
};

const getOneTrade = async (req,res) => {
    const Trade = await TradeModel.findOne({ _id: req.params.id });
    res.send(Trade);
};

const postOneTrade = async (req,res) => {
    const Trade = await TradeModel.create(req.body);
    res.send({ msg: "trade logged successfully" });
};

const deleteTrade = async (req,res) => {
    const Trade = await TradeModel.deleteOne({ _id: req.params.id });
    res.send({ msg: "trade deleted" });
};

const updateTrade = async (req,res) => {
    const Trade = await TradeModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "trade updated "});
};

const getAllUserTrades = async (req,res) => {
    const Trade = await TradeModel.find({ userId: req.params.userId });
    res.send(Trade);
};

module.exports = {
    getAllTrades,
    getOneTrade,
    postOneTrade,
    deleteTrade,
    updateTrade
}
