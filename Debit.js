const apiBaseURL = 'http://localhost:5000/transactions';

// Get the transactions from the API and render them
function fetchTransactions() {
    fetch(apiBaseURL)
        .then((response) => response.json())
        .then((transactions) => {
            const transactionsList = document.getElementById('transactions-list');
            transactionsList.innerHTML = ''; // Clear existing transactions

            // Loop through each transaction and display it
            transactions.forEach((transaction) => {
                const transactionCard = document.createElement('div');
                transactionCard.classList.add('transaction-card');
                transactionCard.innerHTML = `
                    <h3>Transaction ID: ${transaction.id}</h3>
                    <p><strong>Amount:</strong> $${transaction.amount}</p>
                    <p><strong>Description:</strong> ${transaction.description}</p>
                    <p><strong>Date:</strong> ${transaction.date}</p>
                `;
                transactionsList.appendChild(transactionCard);
            });
        })
        .catch((error) => {
            console.error('Error fetching transactions:', error);
        });
}

// Add a new transaction
document.getElementById('add-transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const newTransaction = {
        amount: document.getElementById('transaction-amount').value,
        description: document.getElementById('transaction-description').value,
        date: document.getElementById('transaction-date').value,
    };

    fetch(apiBaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
    })
        .then((response) => response.json())
        .then(() => {
            alert('New transaction added successfully!');
            fetchTransactions(); // Refresh the list
        })
        .catch((error) => {
            console.error('Error adding transaction:', error);
        });
});

// Delete a transaction by ID
document.getElementById('delete-transaction-btn').addEventListener('click', () => {
    const transactionId = document.getElementById('transaction-id-to-delete').value;

    if (transactionId) {
        fetch(`${apiBaseURL}/${transactionId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Transaction deleted successfully!');
                    fetchTransactions(); // Refresh the list
                } else {
                    alert('Error: Transaction not found.');
                }
            })
            .catch((error) => {
                console.error('Error deleting transaction:', error);
            });
    } else {
        alert('Please enter a transaction ID to delete.');
    }
});

// Initial fetch of debit card transactions
fetchTransactions();
