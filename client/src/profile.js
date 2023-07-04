import { useNavigate } from 'react-router-dom';
import "./index.css";
import TradeForm from "./tradeForm.js";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3001/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data._id) {
            console.log(data);
            setUser(data.data);
            axios
              .get("http://localhost:3001/trade/" + data._id)
              .then(({ data }) => {
                console.log("user trades", data);
                setTrades(data);
              });
          }
        });
    }
  }, []);

  return (
    <div>
      <h1>Hello user {user.email}!</h1>
      <h2>Log a Trade:</h2>
      <TradeForm />
      <div className="trading-log">
        {trades.map((trade) => (
          <div key={trade.id} className="trade-item">
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