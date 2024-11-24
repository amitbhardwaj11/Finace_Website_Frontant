export const bankingView = {
    render(container) {
      container.innerHTML = `
        <div class="banking">
          <div class="banking-header">
            <h2>Digital Banking</h2>
          </div>
          
          <div class="banking-grid">
            <div class="card accounts-card">
              <h3>Bank Accounts</h3>
              <div class="accounts-list"></div>
              <button class="btn-primary">Add Account</button>
            </div>
            
            <div class="card transfers-card">
              <h3>Money Transfers</h3>
              <form id="transferForm" class="transfer-form">
                <select class="form-input" required>
                  <option value="">Select Account</option>
                </select>
                <input type="text" class="form-input" placeholder="UPI ID or Account Number" required>
                <input type="number" class="form-input" placeholder="Amount" required>
                <button type="submit" class="btn-primary">Send Money</button>
              </form>
            </div>
            
            <div class="card transactions-card">
              <h3>Recent Transactions</h3>
              <div class="transactions-list"></div>
            </div>
          </div>
        </div>
      `;
    }
  };