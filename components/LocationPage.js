import { API_URL } from "../config.js";

const LocationPage = {
  template:
    "<div className='header-part'><div class='top-part' ><p>Welcome to the {{ location.name }} Page!</p><router-link to='/'>Go Back</router-link></div> <br> <br>       <form @submit.prevent='addPlace()'><h2>Add new places</h2> <div style='display:flex;flex-direction: column;'><label for='name'>Place Name</label><input  name='name' v-model='name' type='text' /></div><div class='lat-long'><div><label for='latitude'>Latitude</label><input name='lat' v-model='lat' type='number' /></div><div><label for='latitude'>Longitude</label><input name='lng' v-model='lng' type='number' /></div></div><button class='btn-add' type='submit'>Add new place</button></form></div>   <br> <br>   <div class='empty-page' v-if='places && !places.length'>Pas de place a afficher</div><div class='location-box' v-if='places && places.length' v-for='place in places' :key='place.id'>         <ul class='contains-task-list'><li class='task-list-item'><label><input type='checkbox' @click='() => toggleVisited(place)' :checked='place.visited'><span> {{place.name}}</span></label></li></ul>      <div class='place-btn-ctnr'><button class='btn-edit'><router-link :to='`/places/${place.id}`'>Edit</router-link></button><button @click='deletePlace(place.id)' class='btn-delete'>Delete</button></div> </div>      <br> ",
  data() {
    return {
      location: "",
      name: "",
      lat: "",
      lng: "",
      places: [],
    };
  },
  created() {
    fetch(`${API_URL}/locations/${this.$route.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.location = data;
      })
      .catch((error) => console.error(error));
    fetch(`${API_URL}/locations/${this.$route.params.id}/places`)
      .then((response) => response.json())
      .then((data) => {
        this.places = data.reverse();
      })
      .catch((error) => console.error(error));
  },
  methods: {
    async toggleVisited(place) {
      console.log(place);
      try {
        const response = await fetch(`${API_URL}/places/${place.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: place.name,
            lat: place.lat,
            lng: place.lng,
            visited: !place.visited,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        place.visited = !place.visited;
      } catch (error) {
        console.error("There was a problem updating the place:", error);
      }
    },
    async deletePlace(placeId) {
      try {
        const response = await fetch(`${API_URL}/places/${placeId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // remove the place from the places list
        const placeIndex = this.places.findIndex(
          (place) => place.id === placeId
        );
        this.places.splice(placeIndex, 1);

        // show a success message
        alert("Place deleted successfully");
      } catch (error) {
        console.error("There was a problem deleting the place:", error);
      }
    },

    async addPlace() {
      try {
        const response = await fetch(
          `${API_URL}/locations/${this.$route.params.id}/places`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.name,
              lat: this.lat,
              lng: this.lng,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const newPlace = await response.json();
        this.places.push(newPlace);

        // show a success message
        alert("Place added successfully");
      } catch (error) {
        console.error("There was a problem adding the place:", error);
      }
    },
  },
};

export default LocationPage;
