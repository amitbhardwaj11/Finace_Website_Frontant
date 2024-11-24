export class ExpenseTracker {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        this.initializeListeners();
    }

    initializeListeners() {
        const form = document.getElementById('expense-form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });
    }

    addExpense() {
        const amount = document.getElementById('expense-amount').value;
        const category = document.getElementById('expense-category').value;
        const date = document.getElementById('expense-date').value;

        const expense = {
            amount: parseFloat(amount),
            category,
            date,
            id: Date.now()
        };

        this.expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
        this.displayExpenses();
        document.getElementById('expense-form').reset();
    }

    displayExpenses() {
        const expensesList = document.getElementById('expenses-list');
        if (!expensesList) return;

        expensesList.innerHTML = this.expenses
            .map(expense => `
                <div class="expense-item">
                    <span>₹${expense.amount}</span>
                    <span>${expense.category}</span>
                    <span>${expense.date}</span>
                </div>
            `).join('');
    }
}