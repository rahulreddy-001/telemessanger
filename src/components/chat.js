import React from "react";
import axios from "axios";
import "./chat.css";
import { useSelector } from "react-redux";
function Text() {
  const url = useSelector((state) => state.api_url);
  let ess = {
    user_id: useSelector((state) => state.user_0),
    user: useSelector((state) => state.user_1),
  };
  const [user_name, setName] = React.useState(ess.user);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const getChats = async () => {
      let resp = await axios.post(`${url}/data/chat-data`, ess);
      setMessages(resp.data.chats.reverse());
    };
    getChats();
  });
  const getName = async () => {
    let u_name = await axios.get(`${url}/name/${ess.user}`);
    setName(u_name.data);
  };
  getName();
  const handleSend = async () => {
    let mes = document.getElementById("messageBar").value;
    document.getElementById("messageBar").value = "";
    let response = await axios.put(`${url}/data/chat-update`, {
      user_id: ess.user_id,
      user: ess.user,
      msg: mes,
    });
    console.log(response.data);
  };
  return (
    <div className="container">
      <div className="header-chat-body">
        <img
          className="img-chat"
          src={`https://avatars.dicebear.com/api/bottts/${ess.user}.svg`}
          alt={ess.user}
        />
        <div>
          <h2>{user_name}</h2>
          <span className="span_chat">{ess.user}</span>
        </div>
      </div>
      <div className="chat-msg" id="chat-msg">
        {messages.map((e) => {
          return (
            <div className="chat-body">
              {e[0] === "0" ? (
                <p className="message">{e.slice(1)}</p>
              ) : (
                <p className="message user_message">{e.slice(1)}</p>
              )}
            </div>
          );
        })}
      </div>
      <div className="footer-text">
        <div className="data-input">
          <input
            type="text"
            id="messageBar"
            placeholder="Message"
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button onClick={() => handleSend()}>SEND</button>
        </div>
      </div>
    </div>
  );
}
export default Text;
