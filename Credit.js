const apiBaseURL = 'http://localhost:5000/deals';

// Get the deals from the API and render them
function fetchDeals() {
    fetch(apiBaseURL)
        .then((response) => response.json())
        .then((deals) => {
            const dealsList = document.getElementById('deals-list');
            dealsList.innerHTML = ''; // Clear existing deals

            // Loop through each deal and display it
            deals.forEach((deal) => {
                const dealCard = document.createElement('div');
                dealCard.classList.add('deal-card');
                dealCard.innerHTML = `
                    <h3>${deal.name}</h3>
                    <p><strong>Benefits:</strong> ${deal.benefits.join(', ')}</p>
                    <p><strong>Eligibility:</strong> ${deal.eligibility}</p>
                    <p><strong>Interest Rate:</strong> ${deal.interestRate}</p>
                `;
                dealsList.appendChild(dealCard);
            });
        })
        .catch((error) => {
            console.error('Error fetching deals:', error);
        });
}

// Add a new deal
document.getElementById('add-deal-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const newDeal = {
        name: document.getElementById('deal-name').value,
        benefits: document.getElementById('deal-benefits').value.split(','),
        eligibility: document.getElementById('deal-eligibility').value,
        interestRate: document.getElementById('deal-interest').value,
    };

    fetch(apiBaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDeal),
    })
        .then((response) => response.json())
        .then(() => {
            alert('New deal added successfully!');
            fetchDeals(); // Refresh the list
        })
        .catch((error) => {
            console.error('Error adding deal:', error);
        });
});

// Delete a deal by ID
document.getElementById('delete-deal-btn').addEventListener('click', () => {
    const dealId = document.getElementById('deal-id-to-delete').value;

    if (dealId) {
        fetch(`${apiBaseURL}/${dealId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert('Deal deleted successfully!');
                    fetchDeals(); // Refresh the list
                } else {
                    alert('Error: Deal not found.');
                }
            })
            .catch((error) => {
                console.error('Error deleting deal:', error);
            });
    } else {
        alert('Please enter a deal ID to delete.');
    }
});

// Initial fetch of credit card deals
fetchDeals();
