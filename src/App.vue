

<template>
  <div class="container">
    <div class="tabs">
      <div class="tab-dropdown">
        <!-- Add Tab -->
        <button class="tablinks">Add</button>
        <div class="dropdown-content">
          <button @click="openTab('AddEntries')">Add Contact</button>
          <button @click="openTab('AddPhonebook')">Add Phonebook</button>
        </div>
        <!-- Search Tab -->
        <button class="tablinks" @click="openTab('Phonebook')">Search</button>
      </div>
    </div>

    <!-- Phonebook Tab -->
    <form id="Phonebook" class="tabcontent">
      <h2>Search</h2>
      <input class="search-input" type="text" v-model="phonebookFilter" placeholder="Enter Phonebook" />
      <ul class="phonebook-list">
        <p>Phonebooks:</p><br>
        <!-- Display filtered phonebooks -->
        <li v-for="phonebook in filteredPhonebooks" :key="phonebook.id" @click="selectPhonebook(phonebook)">
          {{ phonebook.name }}
        </li>
      </ul>
      <!-- Display selected phonebook's details -->
      <div v-if="selectedPhonebook" class="phonebook-details">
        <form id="PhonebookDetails">
          <h2>Contact Name</h2>
          <input class="search-input" type="text" v-model="entryFilter" placeholder="Enter Contact Name" />
          <ul class="entry-list">
            <p>Contacts:</p><br>
            <!-- Display filtered entries -->
            <li v-for="entry in filteredEntries" :key="entry.id">
              {{ entry.name }} - {{ entry.number }}
            </li>
          </ul>
        </form>
      </div>
    </form>

    <!-- Add Contact Tab -->
    <form id="AddEntries" class="tabcontent">
      <h2>Add Contact</h2>
      <br>
      <p>Select a phonebook</p>
      <!-- Select phonebook from the list -->
      <select class="select-input" id="phonebookSelect" v-model="selectedPhonebook" required>
        <option v-for="phonebook in phonebooks" :key="phonebook.id" :value="phonebook.id" placeholder="Name">{{ phonebook.name }}</option>
      </select>
      <!-- Input fields for contact details -->
      <input class="text-input" type="text" v-model="nameInput" placeholder="Name" required>
      <input class="text-input" type="tel" v-model="numberInput" placeholder="098-765-4321"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxlength="12" 
            require />
      <!-- Save button -->
      <button class="btn btn-primary" @click="saveEntry">Save</button>
    </form>

    <!-- Add Phonebook Tab -->
    <form id="AddPhonebook" class="tabcontent" @submit.prevent="addPhonebook">
      <h2>Add Phonebook</h2>
      <!-- Input field for new phonebook name -->
      <input class="text-input" type="text" v-model="newPhonebookInput" placeholder="Phonebook Name" />
      <!-- Save button -->
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<!-- Include JavaScript file -->
<script src="./main.js"></script>

<!-- Include CSS file -->
<style src="./styles.css"></style>