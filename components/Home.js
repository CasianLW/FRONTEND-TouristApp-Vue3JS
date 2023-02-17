import { API_URL } from "../config.js";

const Home = {
  template:
    "<div >{{ message }}</div> <br> <br>       <form @submit.prevent='addLocation()'><h2>Add new locations</h2><div style='display:flex;flex-direction: column;'><label for='name'>Location Name</label><input name='name' v-model='name' type='text' /></div><div class='lat-long'><div><label for='latitude'>Latitude</label><input name='lat' v-model='lat' type='number' /></div><div><label for='latitude'>Longitude</label><input name='lng' v-model='lng' type='number' /></div></div><button class='btn-add' type='submit'>Add new location</button></form>   <br> <br>   <div class='empty-page' v-if='items && !items.length'>Pas de place a afficher</div><div class='location-box' v-if='items && items.length' v-for='item in items' :key='item.id'><router-link :to='`/locations/${item.id}/places`'><p>{{item.name}}</p></router-link><div><button class='btn-edit'><router-link :to='`/locations/${item.id}`'>Edit</router-link></button><button @click='deleteLocation(item.id)' class='btn-delete'>Delete</button></div> </div>      <br> ",
  data() {
    return {
      message: "Welcome to the Home page!",
      name: "",
      lat: "",
      lng: "",
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
  methods: {
    async deleteLocation(locationId) {
      try {
        const response = await fetch(`${API_URL}/locations/${locationId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // remove the location from the items list
        const locationIndex = this.items.findIndex(
          (item) => item.id === locationId
        );
        this.items.splice(locationIndex, 1);

        // show a success message
        alert("Location deleted successfully");
      } catch (error) {
        console.error("There was a problem deleting the location:", error);
      }
    },

    async addLocation() {
      try {
        const response = await fetch(`${API_URL}/locations/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            lat: this.lat,
            lng: this.lng,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const newLocation = await response.json();
        this.items.push(newLocation);

        // show a success message
        alert("Location added successfully");
      } catch (error) {
        console.error("There was a problem adding the location:", error);
      }
    },
  },
};

export default Home;
