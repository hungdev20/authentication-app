import * as React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { useDispatch } from "react-redux";
import store from "../state/store";
import { logout } from "../state/actions";
import axios from "axios";
export interface HomeProps {}

export default function Home(props: HomeProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = store.getState().authReducer["currentUser"]["username"];
  const [posts, setPosts] = useState([]);
  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function(response) {
        setPosts(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <header className="wp-header">
        <Container className="py-2">
          <Row>
            <Col md={3}>
              <div className="logo">
                <img src={logo} alt="" />
              </div>
            </Col>
            <Col md={3}>
              <Form className="form-search">
                <input
                  className="search"
                  type="text"
                  placeholder="Search posts and videos"
                  spellCheck={false}
                />
              </Form>
            </Col>
            <Col md={6} className="header-right">
              <nav>
                <Link to="/invoices">Invoices</Link>
                <Link to="/expenses">Expenses</Link>
                <Link to="/posts">Posts</Link>
              </nav>
              <div className="info-user">
                <p>
                  Hi, <span>{username ? username : ""}</span>
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
          <h2 className="title">LIST POSTS</h2>
          <ul>
            {posts.map((post) => (
              <li key={post["id"]}>{post["title"]}</li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}
