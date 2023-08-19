<script src="./main.js"></script>
<style src="./styles.css"></style>

<template>
  <div class="container">
    <div class="tabs">
      <div class="tab-dropdown">
        <button class="tablinks">Add</button>
        <div class="dropdown-content">
          <button @click="openTab('AddEntries')">Add Contact</button>
          <button @click="openTab('AddPhonebook')">Add Phonebook</button>
        </div>
        <button class="tablinks" @click="openTab('Phonebook')">Search</button>
      </div>
    </div>

    <!-- Phonebook Tab -->
    <form id="Phonebook" class="tabcontent">
      <h2>Search</h2>
      <input class="search-input" type="text" v-model="phonebookFilter" placeholder="Enter Phonebook" />
      <ul class="phonebook-list">
        <p>Phonebooks:</p><br>
        <li v-for="phonebook in filteredPhonebooks" :key="phonebook.id" @click="selectPhonebook(phonebook)">
          {{ phonebook.name }}
        </li>
      </ul>
      <div v-if="selectedPhonebook" class="phonebook-details">
        <form id="PhonebookDetails">
          <h2>Contact Name</h2>
          <input class="search-input" type="text" v-model="entryFilter" placeholder="Enter Contact Name" />
          <ul class="entry-list">
            <p>Contacts:</p><br>
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
      <select class="select-input" id="phonebookSelect" v-model="selectedPhonebook" required>
        <option v-for="phonebook in phonebooks" :key="phonebook.id" :value="phonebook.id" placeholder="Name">{{ phonebook.name }}</option>
      </select>
      <input class="text-input" type="text" v-model="nameInput" placeholder="Name" required>
      <input class="text-input" type="tel" v-model="numberInput" placeholder="098-765-4321"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxlength="12" 
            required />
      <button class="btn btn-primary" @click="saveEntry">Save</button>
    </form>

    <!-- Add Phonebook Tab -->
    <form id="AddPhonebook" class="tabcontent" @submit.prevent="addPhonebook">
      <h2>Add Phonebook</h2>
      <input class="text-input" type="text" v-model="newPhonebookInput" placeholder="Phonebook Name" />
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>
