const Trade = require('../modules/trade.js');

const getAllTrades = async (req,res) => {
    const Trade = await Trade.find();
    res.send(Trade);
};

const getOneTrade = async (req,res) => {
    const Trade = await Trade.findOne({ _id: req.params.id });
    res.send(Trade);
};

const postOneTrade = async (req,res) => {
    const Trade = await Trade.create(req.body);
    res.send({ msg: "trade logged successfully" });
};

const deleteTrade = async (req,res) => {
    const Trade = await Trade.deleteOne({ _id: req.params.id });
    res.send({ msg: "trade deleted" });
};

const updateTrade = async (req,res) => {
    const Trade = await Trade.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "trade updated "});
};

const getAllUserTrades = async (req,res) => {
    const Trade = await Trade.find({ userId: req.params.userId });
    res.send(Trade);
};

module.exports = {
    getAllTrades,
    getOneTrade,
    postOneTrade,
    deleteTrade,
    updateTrade,
    getAllUserTrades
}
