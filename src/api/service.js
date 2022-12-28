import axios from "axios";

export default function getApiOmdbApi(params) {
  return axios({
    method: "get",
    url: `http://www.omdbapi.com/?apikey=1faefa01&s=${params}`,
  });
}
