import { useState } from "react";
import axios from "axios";

function TradeForm({ userId, onAddTrade }) {
  const [trade, setTrade] = useState({
    pair: "",
    buyingPrice: 0,
    sellingPrice: null,
    amount: 0,
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTrade((prevTrade) => ({
      ...prevTrade,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(trade);
    const tradeData = { ...trade, userId: userId };
    axios
      .post("http://localhost:3001/trade", tradeData)
      .then((res) => {
        console.log(res.data);
        setTrade({
          pair: "",
          buyingPrice: 0,
          sellingPrice: null,
          amount: 0,
          date: "",
        });
        if (typeof onAddTrade === "function") {
          onAddTrade(res.data);
        }
      })
      .catch((error) => {
        console.error("Error sending trade data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pair:
        <input
          type="text"
          name="pair"
          value={trade.pair}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Buying Price:
        <input
          type="number"
          name="buyingPrice"
          value={trade.buyingPrice}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Selling Price:
        <input
          type="number"
          name="sellingPrice"
          value={trade.sellingPrice || ""}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={trade.amount}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="text"
          name="date"
          value={trade.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TradeForm;