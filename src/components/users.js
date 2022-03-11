import React from "react";
import axios from "axios";
import "./users.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
function Chat() {
  const navigate = useNavigate();
  const disptch = useDispatch();
  const user_id = useSelector((state) => state.user_0);
  const url = useSelector((state) => state.api_url);
  const [users, setUsers] = React.useState([]);
  const [err, setErr] = React.useState("");

  const handleSearch = async () => {
    let user_val = document.getElementById("fetchId").value;
    let response = await axios.get(`${url}/data/${user_val}`);
    response = response.data;
    if (response) {
      navigate("/messages");
    } else {
      setErr("user id not available");
      document.getElementById("fetchId").value = null;
      setTimeout(function () {
        setErr("");
      }, 2500);
    }
  };

  React.useEffect(() => {
    const user_list = async (user_id) => {
      let resp = await axios.get(`${url}/user/chats/${user_id}`);
      setUsers(resp.data);
    };
    user_list(user_id);
  }, []);
  return (
    <div className="body-chat">
      <div class="wrapper">
        <section class="users">
          <header>
            <div class="content">
              <img
                src={`https://avatars.dicebear.com/api/bottts/${user_id}.svg`}
                alt={user_id}
              />
              <div class="details">
                <span>{user_id}</span>
                <p>
                  <small>Active now</small>
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.setItem("isLogged", "0");
                localStorage.setItem("user_id", "");
                disptch({ type: "isLogged", data: false });
                disptch({ type: "user_0", data: "" });
                disptch({ type: "user_1", data: "" });
                navigate("/login");
              }}
              className="logout"
            >
              Logout
            </button>
          </header>
          {err.length === 0 ? <></> : <div class="error-txt">{err}</div>}
          <div class="search">
            <span class="text">Select an user to start chat</span>
            <input
              type="text"
              placeholder="Enter user id to search..."
              id="fetchId"
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button>
              <i class="fas fa-search"></i>
            </button>
          </div>

          <div class="users-list">
            {users.map((e) => {
              return (
                <a
                  //href="/messages"
                  onClick={() => {
                    disptch({ type: "user_1", data: e });
                    navigate("/messages");
                  }}
                >
                  <div class="content">
                    <img
                      src={`https://avatars.dicebear.com/api/bottts/${e}.svg`}
                      alt={e}
                    />
                    <div class="details">
                      <span>{e}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Chat;
