import { API_URL } from "../config.js";

const PlacePage = {
  template:
    "<div className='header-part'><div class='top-part' ><p>{{ place.name }} <span class='page-update'>Update Page!</span></p><router-link :to='`/locations/${place.location_id}/places`'>Go Back</router-link></div> <br> <br>       <form v-if='!message && !message.length' @submit.prevent='updatePlace()'><h2>Update the place</h2> <div style='display:flex;flex-direction: column;'><label for='name'>Place Name</label><input  name='name'  v-model='place.name' type='text' /></div><div class='lat-long'><div><label for='latitude'>Latitude</label><input  v-model='place.lat' name='lat' type='number' /></div><div><label for='latitude'>Longitude</label><input name='lng'  v-model='place.lng' type='number' /></div></div><ul class='contains-task-list'><li class='task-list-item'><label><input @click='toggleVisited()' type='checkbox' :checked='place.visited'><span v-if='!this.place.visited '>Not visited</span><span v-if='this.place.visited '>Visited</span></label></li></ul> <button class='btn-add' type='submit'>Update place</button> <a @click='deletePlace(place.id)' class='btn-delete'>Delete</a></form></div><br> <br>   <div class='empty-page' v-if='!place '>Pas de place a afficher</div><div class='message-success' v-if='message'><p>{{message}}</p> </div>",
  data() {
    return {
      place: "",
      name: "",
      lat: "",
      lng: "",
      visited: "",
      message: "",
    };
  },

  //places
  created() {
    fetch(`${API_URL}/places/${this.$route.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.place = data;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    async updatePlace() {
      try {
        const response = await fetch(`${API_URL}/places/${this.place.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.place.name,
            lat: this.place.lat,
            lng: this.place.lng,
            visited: this.place.visited,
          }),
        });
        this.message = "Place updated !";
        setTimeout(() => {
          this.message = "";
        }, 3000);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
        this.message = "Place deleted successfully";
        // const placeIndex = this.place.findIndex(
        //   (place) => place.id === placeId
        // );
        // this.place.splice(placeIndex, 1);

        // show a success message
        alert("Place deleted successfully");
      } catch (error) {
        console.error("There was a problem deleting the place:", error);
      }
    },
    toggleVisited() {
      this.place.visited = !this.place.visited;
      console.log(this.place.visited);
    },

    // async addPlace() {
    //   try {
    //     const response = await fetch(
    //       `${API_URL}/locations/${this.$route.params.id}/places`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           name: this.name,
    //           lat: this.lat,
    //           lng: this.lng,
    //         }),
    //       }
    //     );

    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }

    //     const newPlace = await response.json();
    //     this.places.push(newPlace);

    //     // show a success message
    //     alert("Place added successfully");
    //   } catch (error) {
    //     console.error("There was a problem adding the place:", error);
    //   }
    // },
  },
};

export default PlacePage;
