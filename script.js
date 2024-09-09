document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const searchForm = document.getElementById('search-form');
    const addMessageDiv = document.getElementById('add-message');
    const resultsList = document.getElementById('results-list');

    // Initialize records in localStorage if not already present
    if (!localStorage.getItem('criminalRecords')) {
        localStorage.setItem('criminalRecords', JSON.stringify([]));
    }

    // Handle adding a new criminal record
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const offense = document.getElementById('offense').value;
        const date = document.getElementById('date').value;
        const badgeNumber = document.getElementById('badge-number').value;
        const rank = document.getElementById('rank').value;

        if (name.trim() && offense.trim() && date.trim() && badgeNumber.trim() && rank.trim()) {
            const newRecord = { name, offense, date, badgeNumber, rank };
            const records = JSON.parse(localStorage.getItem('criminalRecords'));
            records.push(newRecord);
            localStorage.setItem('criminalRecords', JSON.stringify(records));

            addMessageDiv.textContent = 'Criminal record added successfully!';
            addForm.reset();
        } else {
            addMessageDiv.textContent = 'Please fill out all fields.';
        }
    });

    // Handle searching criminal records
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const searchQuery = document.getElementById('search-query').value.toLowerCase();
        resultsList.innerHTML = '';  // Clear previous results

        const records = JSON.parse(localStorage.getItem('criminalRecords'));
        const filteredRecords = records.filter(record =>
            record.name.toLowerCase().includes(searchQuery) ||
            record.offense.toLowerCase().includes(searchQuery) ||
            record.badgeNumber.toLowerCase().includes(searchQuery) ||
            record.rank.toLowerCase().includes(searchQuery)
        );

        if (filteredRecords.length > 0) {
            filteredRecords.forEach(record => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${record.name}, Offense: ${record.offense}, Date: ${record.date}, Badge Number: ${record.badgeNumber}, Rank: ${record.rank}`;
                resultsList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = 'No results found.';
            resultsList.appendChild(listItem);
        }
    });
});
