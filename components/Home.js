// import { API_URL } from "../config";
const API_URL = "http://127.0.0.1:8000/api";
const Home = {
  template:
    "<div>{{ message }}</div> <br> <div><ul> <li v-for='item in items' :key='item.id'>{{ item.name }}</li></ul></div>",
  data() {
    return {
      message: "Welcome to the Home page!",
      items: [],
    };
  },
  created() {
    fetch(`${API_URL}/locations`)
      .then((response) => response.json())
      .then((data) => {
        this.items = data;
      })
      .catch((error) => console.error(error));
  },
};
export default Home;
