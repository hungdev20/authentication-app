import axios from "axios";

export const user = {
  username: "manhhung2011",
  password: "manhhung2011",
};
export default function getAuth(session_url: any) {
  return axios
    .get(session_url, {
      auth: {
        username: user.username,
        password: user.password,
      },
    })
    .then((response) => {
      return response.status;
    });
}
