import * as React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import axios from "axios";

import logo from "../../assets/images/logo.svg";
import store from "../../state/store";
import { logout } from "../../state/actions";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const faPropIcon = faMagnifyingGlass as IconProp;
  const username = store.getState().authReducer["currentUser"]["username"];
  const tabs = ["posts", "comments", "albums"];
  const [datas, setDatas] = useState([]);
  const [datasTest, setDatasTest] = useState([]);
  const [type, setType] = useState("posts");

  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/${type}`)
      .then(function(response) {
        setDatas(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [type]);
  return (
    <div>
      <header className="wp-header">
        <Container className="py-2">
          <Row>
            <Col md={4}>
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="vnexpress" />
                </Link>
              </div>
            </Col>
            <Col md={4}>
              <Form className="form-search">
                <input
                  className="search"
                  type="text"
                  placeholder="Search posts and videos"
                  spellCheck={false}
                />
                <button className="search-btn">
                  <FontAwesomeIcon icon={faPropIcon} />
                </button>
              </Form>
            </Col>
            <Col md={4} className="header-right">
              <nav>
                <Link to="/posts">Posts</Link>
              </nav>
              <div className="info-user">
                <p>
                  <span>{username ? username : ""}</span>
                </p>
                <p className="logout" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <div className="wp-body">
        <Container>
          <ul className="tabs">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  className="nav-link"
                  style={
                    type === tab
                      ? {
                          color: "#495057",
                          backgroundColor: "#fff",
                          borderColor: "#dee2e6 #dee2e6 #fff",
                        }
                      : {}
                  }
                  onClick={() => setType(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          <ul>
            {datas.map((data) => (
              <li key={data["id"]}>{data["title"] || data["name"]}</li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}

export default Home;
