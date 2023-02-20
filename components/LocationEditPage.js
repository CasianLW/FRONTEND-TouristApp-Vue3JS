import { API_URL } from "../config.js";

const LocationEditPage = {
  template:
    "<div className='header-part'><div class='top-part' ><p>Welcome to the {{ location.name }} Page!</p><router-link to='/'>Go Back</router-link></div> <br> <br>       <form v-if='!message && !message.length' @submit.prevent='updateLocation()'><h2>Update the location</h2> <div style='display:flex;flex-direction: column;'><label for='name'>Location Name</label><input  name='name'  v-model='location.name' type='text' /></div><div class='lat-long'><div><label for='latitude'>Latitude</label><input  v-model='location.lat' name='lat' type='number' /></div><div><label for='latitude'>Longitude</label><input name='lng'  v-model='location.lng' type='number' /></div></div><ul class='contains-task-list'><li class='task-list-item'><label for='slug'><input name='slug' type='text' v-model='location.slug'></label></li></ul> <button class='btn-add' type='submit'>Update location</button> <a @click='deleteLocation(location.id)' class='btn-delete'>Delete</a></form></div><br> <br>   <div class='empty-page' v-if='!location '>Pas de location a afficher</div><div class='message-success' v-if='message'><p>{{message}}</p> </div>",
  data() {
    return {
      location: "",
      name: "",
      lat: "",
      lng: "",
      slug: "",
      message: "",
    };
  },

  //locations
  created() {
    fetch(`${API_URL}/locations/${this.$route.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.location = data;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    async updateLocation() {
      try {
        const response = await fetch(
          `${API_URL}/locations/update/${this.location.id}`,
          //   http://localhost:8000/api/locations/update/2
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.location.name,
              lat: this.location.lat,
              lng: this.location.lng,
              slug: this.location.slug,
            }),
          }
        );
        this.message = "Location updated !";
        setTimeout(() => {
          this.message = "";
        }, 3000);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("There was a problem updating the location:", error);
      }
    },
    async deleteLocation(locationId) {
      try {
        const response = await fetch(`${API_URL}/locations/${locationId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // remove the location from the locations list
        this.message = "Location deleted successfully";

        // show a success message
        alert("Location deleted successfully");
      } catch (error) {
        console.error("There was a problem deleting the location:", error);
      }
    },
  },
};

export default LocationEditPage;
