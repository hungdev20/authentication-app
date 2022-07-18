import axios from "axios";

export default function getAuth(
  inputname: any,
  inputpass: any,
  session_url: any
) {
  return axios
    .get(session_url, {
      auth: {
        username: inputname,
        password: inputpass,
      },
    })
    .then((response) => {
      return response.status;
    });
}
