// Import necessary modules and components
import { createApp } from 'vue';
import App from './App.vue';
import "./main.js";
import axios from "axios";

// Export the default Vue component options
export default {
  // Data properties that will hold the component's state
  data() {
    return {
      phonebooks: [],           // Holds the list of phonebooks
      selectedPhonebook: null,  // Holds the currently selected phonebook
      entries: [],              // Holds the list of entries
      nameInput: "",            // Holds the input value for entry name
      numberInput: "",          // Holds the input value for entry number
      newPhonebookInput: "",    // Holds the input value for new phonebook name
      phonebookFilter: "",      // Holds the filter value for phonebooks
      entryFilter: "",          // Holds the filter value for entries
    };
  },
  // Computed properties that dynamically calculate values based on data
  computed: {
    filteredPhonebooks() {
      if (this.phonebookFilter) {
        return this.phonebooks.filter(phonebook =>
          phonebook.name.toLowerCase().includes(this.phonebookFilter.toLowerCase())
        );
      } else {
        return [];
      }
    },
    filteredEntries() {
      if (this.entryFilter && this.selectedPhonebook) {
        return this.selectedPhonebook.entries.filter(entry =>
          entry.name.toLowerCase().includes(this.entryFilter.toLowerCase()) ||
          entry.number.includes(this.entryFilter)
        );
      } else if (this.selectedPhonebook) {
        return this.selectedPhonebook.entries;
      } else {
        return [];
      }
    },
  },
  // Methods that define the behavior of the component
  methods: {
    // Function to open a specific tab by adding/removing "active" class
    openTab(tabName) {
      const tabContents = document.getElementsByClassName("tabcontent");
      for (const tabContent of tabContents) {
        tabContent.classList.remove("active");
      }
      const selectedTabContent = document.getElementById(tabName);
      if (selectedTabContent) {
        selectedTabContent.classList.add("active");
      }
    },
    // Function to select a phonebook and fetch its entries
    async selectPhonebook(phonebook) {
      this.selectedPhonebook = phonebook;
      await this.fetchEntriesForPhonebook(phonebook.id);
    },
    // Function to fetch entries for a specific phonebook from the server
    async fetchEntriesForPhonebook(phonebookId) {
      try {
        const response = await axios.get(`http://localhost:3000/entries?phonebook=${phonebookId}`);
        this.selectedPhonebook.entries = response.data;
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    },
    // Function to save a new entry to the selected phonebook
    async saveEntry() {
      if (this.selectedPhonebook && this.nameInput && this.numberInput) {
        const newEntry = {
          phonebook: this.selectedPhonebook,
          name: this.nameInput,
          number: this.numberInput,
        };

        try {
          const response = await axios.post("http://localhost:3000/entries", newEntry);
          console.log("Entry saved:", response.data);

          this.entries.push(newEntry);
          this.nameInput = "";
          this.numberInput = "";
        } catch (error) {
          console.error("Error saving entry:", error);
        }
      }
    },
    // Function to add a new phonebook
    addPhonebook() {
      if (this.newPhonebookInput) {
        const newPhonebook = {
          id: this.phonebooks.length + 1,
          name: this.newPhonebookInput,
          entries: [], // Initialize with an empty entries array
        };
        this.phonebooks.push(newPhonebook);

        axios.post("http://localhost:3000/phonebooks", newPhonebook).then(response => {
          console.log("Phonebook saved:", response.data);
          this.newPhonebookInput = "";
        });
      }
    },
    // Function to fetch the list of phonebooks from the server
    async fetchPhonebooks() {
      try {
        const response = await axios.get("http://localhost:3000/phonebooks");
        this.phonebooks = response.data;
      } catch (error) {
        console.error("Error fetching phonebooks:", error);
      }
    },
  },
  // Lifecycle hook: This is called after the component is mounted on the DOM
  mounted() {
    this.fetchPhonebooks(); // Fetch phonebooks when the component is mounted
  },
};

// Create the Vue app and mount the root component to the specified element
createApp(App).mount('#app');
