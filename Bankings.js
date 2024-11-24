document.addEventListener("DOMContentLoaded", () => {
    const accountBalanceElement = document.getElementById("account-balance");
    const transactionHistoryElement = document.getElementById("transaction-history");
    const transactionStatusElement = document.getElementById("transaction-status");

    let accountBalance = 5000.0; // Initial balance
    let transactionHistory = []; // To store transaction history

    // Update Balance Display
    function updateBalance() {
        accountBalanceElement.textContent = `$${accountBalance.toFixed(2)}`;
    }

    // Add Transaction to History
    function addTransactionToHistory(recipient, amount) {
        const date = new Date().toLocaleString();
        transactionHistory.push({ recipient, amount, date });

        // Update History Display
        transactionHistoryElement.innerHTML = transactionHistory
            .map(
                (transaction) =>
                    `<p>${transaction.date} - Sent $${transaction.amount.toFixed(
                        2
                    )} to ${transaction.recipient}</p>`
            )
            .join("");
    }

    // Handle Transfer Button Click
    document.getElementById("transfer-btn").addEventListener("click", () => {
        const recipient = document.getElementById("recipient").value;
        const amount = parseFloat(document.getElementById("amount").value);

        if (!recipient || isNaN(amount) || amount <= 0) {
            transactionStatusElement.textContent =
                "Invalid input. Please enter a valid recipient and amount.";
            transactionStatusElement.style.color = "red";
            return;
        }

        if (amount > accountBalance) {
            transactionStatusElement.textContent =
                "Insufficient balance for this transaction.";
            transactionStatusElement.style.color = "red";
            return;
        }

        // Deduct from balance and update history
        accountBalance -= amount;
        updateBalance();
        addTransactionToHistory(recipient, amount);

        transactionStatusElement.textContent =
            `Transaction successful! Sent $${amount.toFixed(
                2
            )} to ${recipient}.`;
        transactionStatusElement.style.color = "green";

        // Clear inputs
        document.getElementById("recipient").value = "";
        document.getElementById("amount").value = "";
    });

    // Initialize Balance Display
    updateBalance();
});
