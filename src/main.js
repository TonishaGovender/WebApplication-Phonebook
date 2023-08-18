import { createApp } from 'vue'
import App from './App.vue'
import "./main.js";
import axios from 'axios';

export default {
  data() {
    return {
      activeTab: 'search',
      isDropdownOpen: false,
      showMessage: false,
      name: '',
      phoneNumber: '',
      phonebookName: '',
      entries: [],
      phonebooks: [],
      selectedPhonebook: null,
    };
  },
  methods: {
    async addEntry() {
      const newEntry = {
        name: this.name,
        phoneNumber: this.phoneNumber,
      };

      try {
        const response = await axios.post('http://localhost:3000/entries', newEntry);
        console.log('Entry added:', response.data);
        this.showMessage = true; 
        setTimeout(() => {
          this.showMessage = false; 
          window.location.reload(); 
        }, 6000); 
      } catch (error) {
        console.error('Error adding entry:', error);
      }
    },

    async addPhonebook() {
      const newPhonebook = {
        phonebookName: this.phonebookName,
      };

      try {
        const response = await axios.post('http://localhost:3000/phonebooks', newPhonebook);
        console.log('Phonebook added:', response.data);
      } catch (error) {
        console.error('Error adding phonebook:', error);
      }
    },

    async search() {
      if (this.selectedPhonebook) {
        try {
          const responseEntries = await axios.get('http://localhost:3000/entries');
          const filteredEntries = responseEntries.data.filter(entry => {
            const entryName = entry.name.toLowerCase();
            const phonebook = this.phonebooks.find(pb => pb.id === this.selectedPhonebook);
            const phonebookName = phonebook ? phonebook.phonebookName.toLowerCase() : '';

            const nameMatches = entryName.includes(this.searchName.toLowerCase());
            const phonebookMatches = phonebookName.includes(this.searchName.toLowerCase());

            return nameMatches || phonebookMatches;
          });

          // Update the entries with filtered results
          this.entries = filteredEntries;

          // Clear the selected phonebook and search name after search
          this.selectedPhonebook = null;
          this.searchName = '';
        } catch (error) {
          console.error('Error searching:', error);
        }
      }
    },
    async fetchData() {
      try {
        const responseEntries = await axios.get('http://localhost:3000/entries');
        this.entries = responseEntries.data;
        const responsePhonebooks = await axios.get('http://localhost:3000/phonebooks');
        this.phonebooks = responsePhonebooks.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  watch: {
    selectedPhonebook: 'fetchData', // Watch for changes in selectedPhonebook and trigger fetchData
  },
  created() {
  if (this.activeTab === 'search') {
    this.fetchData();
  }
},
};

createApp(App).mount('#app')
