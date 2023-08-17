<template>
  <div class="page-container">
    <div id="phonebookapp">
      <div class="tabs">
        <div class="dropdown">
          <button @click="isDropdownOpen = !isDropdownOpen">
          <span>+</span>
        </button>
        <div v-if="isDropdownOpen" class="dropdown-content">
          <button @click="activeTab = 'add-entry'">Contact</button>
          <button @click="activeTab = 'add-phonebook'">Phonebook</button>
        </div>
      </div>
        <button class="search-button" style = "color: white;" @click="activeTab = 'search'">
          <span>&#128269;</span>
        </button>
      </div>

      <div class="tab-content">
        <div class="card-container">
          <div class="card" v-if="activeTab === 'search'">
            <h2>Search Contact</h2>
            <!-- Search Form -->
            <form>
              <label for="searchName">Name:</label>
              <input v-model="searchName" id="searchName" type="text" @input="search">
            </form>
          </div>

          <div class="card" v-else-if="activeTab === 'add-entry'">
            <h2>Add Contact</h2>
            <!-- Form to Add User Entry -->
            <form @submit.prevent="addEntry">
              <label for="name">Name:</label>
              <input v-model="name" id="name" type="text" required>
              <label for="phoneNumber">Phone Number:</label>
              <input v-model="phoneNumber" id="phoneNumber" type="tel" required>
              <button type="submit">Add Contact</button>
            </form>
          </div>

          <div class="card" v-else-if="activeTab === 'add-phonebook'">
            <h2>Create New Phonebook</h2>
            <!-- Form to Add Phonebook -->
            <form @submit.prevent="addPhonebook">
              <label for="phonebookName">Phonebook Name:</label>
              <input v-model="phonebookName" id="phonebookName" type="text" required>
              <button type="submit">Add Phonebook</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'search',
      isDropdownOpen: false,
      name: '',
      surname: '',
      phoneNumber: '',
      phonebookName: '',
    };
  },
  methods: {
    addEntry() {
      // Logic to add entry to phonebook
      console.log('Adding entry:', this.name, this.surname, this.phoneNumber);
    },
    addPhonebook() {
      // Logic to add phonebook
      console.log('Adding phonebook:', this.phonebookName);
    },
  },
};
</script>

<style>
  .page-container {
    font-family: "Arial", sans-serif;
  }
  .tabs {
    display: flex;
    justify-content: flex-start;
    background-color: #3498db;
    padding: 15px 0;
  }

  /* Styling for tab buttons */
  .tabs button {
    padding: 10px 20px;
    margin: 0 5px;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background-color 0.3s;
  }

  .tabs button:hover {
    background-color: #2980b9;
  }

  /* Styling for the search button */
  .search-button {
    color: white;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 50px;
  }

  /* Styling for the dropdown container */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Styling for the dropdown button */
  .dropdown button {
    background: none;
    border: none;
    cursor: pointer;
    color: #ffffff;
    font-size: 20px;
    transition: color 0.3s;
  }

  .dropdown button:hover {
    color: #3498db;
  }

  /* Styling for the dropdown content */
  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #2980b9;
    border: 1px solid #ccc;
    border-top: none;
    display: none;
    flex-direction: column;
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: flex;
  }

  .dropdown-content button {
    padding: 10px;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.3s;
  }

  .dropdown-content button:hover {
    background-color: #f1f1f1;
  }

  /* Styling for form labels */
  form label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
    color: #333;
  }

  /* Styling for input fields */
  form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
  }

  /* Styling for submit buttons */
  form button[type="submit"] {
    background-color: #3498db;
    border: none;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  form button[type="submit"]:hover {
    background-color: #2980b9;
  }

  /* Styling for headings */
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  /* Styling for search results */
  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    margin-bottom: 8px;
    color: #333;
  }

  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  /* Styling for cards */
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px;
    max-width: 400px;
  }

  /* Styling for card headings */
  .card h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  /* Styling for form labels within cards */
  .card form label {
    margin-bottom: 6px;
  }

  /* Styling for input fields within cards */
  .card form input {
    margin-bottom: 12px;
  }

  /* Styling for submit buttons within cards */
  .card form button[type="submit"] {
    background-color: #3498db;
  }

  .card form button[type="submit"]:hover {
    background-color: #2980b9;
  }
</style>