import { useNavigate } from 'react-router-dom';
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const [trade, setTrade] = useState({
    pair: "",
    buyingPrice: null,
    sellingPrice: null,
    amount: null,
    date: "",
    userId: ""
  });
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3001/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            console.log(data.userData);
            setUser(data.userData);
            axios
              .get("http://localhost:3001/trade/" + data.userData._id)
              .then(({ data }) => {
                console.log("user trades", data);
                setTrades(data);
              });
          }
        });
    } else {
      navigate("/");
    }
  }, []);

  const handleTradeChange = (event) => {
    const { name, value } = event.target;
    setTrade((prevTrade) => ({
      ...prevTrade,
      [name]: value,
      userId: user._id
    }));
  };

  const handleTradeSubmit = (event) => {
    event.preventDefault();
    console.log(trade);

    axios
      .post("http://localhost:3001/trade", trade)
      .then((res) => {
        console.log(res.data);
        setTrade({
          pair: "",
          buyingPrice: null,
          sellingPrice: null,
          amount: null,
          date: "",
          userId: ""
        });
        setTrades((prevTrades) => [...prevTrades, res.data]); // Add the new trade to trades state
      })
      .catch((error) => {
        console.error("Error sending trade data:", error);
      });
  };

  return (
    <div>
      <h1>Hello user {user.email}!</h1>
      <h2>Log a Trade:</h2>
      <form onSubmit={handleTradeSubmit}>
        <label>
          Pair:
          <input
            type="text"
            name="pair"
            value={trade.pair}
            onChange={handleTradeChange}
          />
        </label>
        <br />
        <label>
          Buying Price:
          <input
            type="number"
            name="buyingPrice"
            value={trade.buyingPrice || ""}
            onChange={handleTradeChange}
          />
        </label>
        <br />
        <label>
          Selling Price:
          <input
            type="number"
            name="sellingPrice"
            value={trade.sellingPrice || ""}
            onChange={handleTradeChange}
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={trade.amount || ""}
            onChange={handleTradeChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={trade.date}
            onChange={handleTradeChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="trading-log">
        {trades.map((trade) => (
          <div key={trade._id} className="trade-item">
            <p>Pair: {trade.pair}</p>
            <p>Buying Price: {trade.buyingPrice}</p>
            <p>Selling Price: {trade.sellingPrice}</p>
            <p>Amount: {trade.amount}</p>
            <p>Date: {trade.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;