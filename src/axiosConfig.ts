import axios from "axios";
export const user = {
  username: "manhhung2011",
  password: "manhhung2011",
};
const instance = axios.create({
  baseURL: "http://httpbin.org/basic-auth",
  auth: {
    username: user.username,
    password: user.password
  }, 
   headers: { "X-Custom-Header": "foobar" },
});

export default instance;
