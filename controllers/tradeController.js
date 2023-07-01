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
}