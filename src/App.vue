<script src="./main.js"></script>
<style src="./styles.css"></style>

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
            <form @submit.prevent="search">
              <label for="phonebookSelect">Select Phonebook:</label>
              <select v-model="selectedPhonebook" id="phonebookSelect" required>
                <option v-for="phonebook in phonebooks" :key="phonebook.id" :value="phonebook.id">{{ phonebook.phonebookName }}</option>
              </select>
              <label for="searchName">Name</label>
              <input v-model="searchName" id="searchName" type="text">
              <button type="submit">Search</button>
            </form>
          </div>

          <div v-if="selectedPhonebook">
            <h2>{{ selectedPhonebook.name }} Details</h2>
            <ul>
              <li v-for="entry in selectedPhonebook.entries" :key="entry.id">
                {{ entry.name }} - {{ entry.number }}
              </li>
            </ul>
          </div>

          <div class="card" v-else-if="activeTab === 'add-entry'">
            <h2>Add Contact</h2>
            <!-- Form to Add User Entry -->
            <form @submit.prevent="addEntry">
              <label for="phonebookSelect">Select Phonebook:</label>
              <select v-model="selectedPhonebook" id="phonebookSelect" required>
                <option v-for="phonebook in phonebooks" :key="phonebook.id" :value="phonebook.id">{{ phonebook.phonebookName }}</option>
              </select>
              <label for="name">Name:</label>
              <input v-model="name" id="name" type="text" required>
              <label for="phoneNumber">Phone Number:</label>
              <input v-model="phoneNumber" id="phoneNumber" type="tel" 
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
              maxlength="13" 
              placeholder="123-456-7890" required>
              <button type="submit">Add Contact</button>
            </form>
            <div v-if="showMessage" class="message">Contact added successfully!</div>
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

