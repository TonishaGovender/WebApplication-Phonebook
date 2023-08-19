import { createApp } from 'vue'
import App from './App.vue'
import "./main.js";
import axios from "axios";

export default {
  data() {
    return {
      phonebooks: [],
      selectedPhonebook: null,
      entries: [],
      nameInput: "",
      numberInput: "",
      newPhonebookInput: "",
      phonebookFilter: "",
      entryFilter: "",
    };
  },
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
  methods: {
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
    async selectPhonebook(phonebook) {
      this.selectedPhonebook = phonebook;
      await this.fetchEntriesForPhonebook(phonebook.id);
    },
    async fetchEntriesForPhonebook(phonebookId) {
      try {
        const response = await axios.get(`http://localhost:3000/entries?phonebook=${phonebookId}`);
        this.selectedPhonebook.entries = response.data;
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    },
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
    async fetchPhonebooks() {
      try {
        const response = await axios.get("http://localhost:3000/phonebooks");
        this.phonebooks = response.data;
      } catch (error) {
        console.error("Error fetching phonebooks:", error);
      }
     
    },
  },
  mounted() {
    this.fetchPhonebooks();
  },
};

createApp(App).mount('#app')
