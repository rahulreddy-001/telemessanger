import React from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function Login(props) {
  const { act } = props;
  const disptch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);

  const url = useSelector((state) => state.api_url);
  const [active, setActive] = React.useState(act);
  const [err, setErr] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLogged) {
      navigate("/users");
    }
  }, []);
  const handleLog = async (ess) => {
    delete ess["user_name"];
    let resp = await axios.put(`${url}/authorize`, ess);
    resp = resp.data;
    if (resp["isAuthorized"] === false) {
      setErr(resp["description"]);
      return;
    }
    localStorage.setItem("isLogged", "1");
    localStorage.setItem("user_id", ess["user_id"]);
    disptch({ type: "isLogged", data: true });
    disptch({ type: "user_0", data: ess["user_id"] });

    navigate("/users", {
      replace: true,
    });
  };
  const handleSign = async (ess) => {
    if (
      ess.user_name.length <= 8 ||
      ess.user_id.length <= 4 ||
      ess.user_id.user_pass <= 8
    ) {
      setErr("Length of credintials must be grater than 8");
      return;
    }
    let response = await axios.get(`${url}/data/${ess.user_id}`);
    response = response.data;
    if (response) setErr("User id already exists");
    await axios.post(`${url}/data`, ess);
    setErr(
      `Welcome to telemessanger ${
        ess.user_name.split(" ")[0]
      }. Now you can  login with your credintials`
    );
    navigate("/");
  };
  const Sign = () => {
    return (
      <>
        <div className="form_div">
          <input type="text" className="form_input" placeholder=" " id="name" />
          <label for="" className="form_label">
            Name
          </label>
        </div>
        <div className="form_div">
          <input type="text" className="form_input" id="id" />
          <label for="" className="form_label">
            Id
          </label>
        </div>
        <div className="form_div">
          <input type="password" className="form_input" id="password" />
          <label for="" className="form_label">
            Password
          </label>
        </div>
        <div className="form_div">
          <input type="password" className="form_input" id="confirm-password" />
          <label for="" className="form_label">
            Re-enter password
          </label>
        </div>
      </>
    );
  };
  const Log = () => {
    return (
      <>
        <div className="form_div">
          <input type="text" className="form_input" id="id" />
          <label for="" className="form_label">
            Id
          </label>
        </div>
        <div className="form_div">
          <input type="password" className="form_input" id="password" />
          <label for="" className="form_label">
            Password
          </label>
        </div>
      </>
    );
  };
  return (
    <div className="l-form">
      <div className="form">
        <div className="form_title">
          <h1 className={"signup" + active} onClick={() => setActive(0)}>
            Sign Up
          </h1>
          <h1 className={"login" + active} onClick={() => setActive(1)}>
            Login
          </h1>
        </div>
        {err.length === 0 ? <></> : <div class="error-txt">{err}</div>}
        {active === 0 ? <Sign /> : <Log />}
        <input
          type="submit"
          className="form_button"
          value={active === 0 ? "Sign Up" : "Login"}
          onClick={() => {
            let ess = {
              user_name:
                active === 0 ? document.getElementById("name").value : "",
              user_id: document.getElementById("id").value,
              user_pass: document.getElementById("password").value,
            };
            if (active === 0) handleSign(ess);
            else handleLog(ess);
          }}
        />
      </div>
    </div>
  );
}

export default Login;
