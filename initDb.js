const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // Users table with KYC information
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    full_name TEXT,
    pan_number TEXT UNIQUE,
    aadhar_number TEXT UNIQUE,
    address TEXT,
    city TEXT,
    state TEXT,
    kyc_verified BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Bank Accounts table
  db.run(`CREATE TABLE IF NOT EXISTS bank_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    account_number TEXT UNIQUE,
    ifsc_code TEXT,
    bank_name TEXT,
    account_type TEXT,
    balance DECIMAL(15,2) DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Transactions table with UPI support
  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    account_id INTEGER,
    type TEXT,
    amount DECIMAL(15,2),
    description TEXT,
    upi_id TEXT,
    transaction_ref TEXT UNIQUE,
    status TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(account_id) REFERENCES bank_accounts(id)
  )`);

  // Expenses table with categories
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(15,2),
    category TEXT,
    sub_category TEXT,
    date DATE,
    description TEXT,
    payment_mode TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Savings Goals table
  db.run(`CREATE TABLE IF NOT EXISTS savings_goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    target_amount DECIMAL(15,2),
    current_amount DECIMAL(15,2) DEFAULT 0.00,
    target_date DATE,
    category TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Mutual Funds Investments
  db.run(`CREATE TABLE IF NOT EXISTS mutual_funds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    fund_name TEXT,
    investment_amount DECIMAL(15,2),
    units DECIMAL(10,4),
    nav DECIMAL(10,2),
    investment_date DATE,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Cryptocurrency Wallets
  db.run(`CREATE TABLE IF NOT EXISTS crypto_wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    currency_code TEXT,
    wallet_address TEXT,
    balance DECIMAL(20,8) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Crypto Transactions
  db.run(`CREATE TABLE IF NOT EXISTS crypto_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    wallet_id INTEGER,
    type TEXT,
    amount DECIMAL(20,8),
    currency_code TEXT,
    transaction_hash TEXT UNIQUE,
    status TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(wallet_id) REFERENCES crypto_wallets(id)
  )`);

  // Fixed Deposits
  db.run(`CREATE TABLE IF NOT EXISTS fixed_deposits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount DECIMAL(15,2),
    interest_rate DECIMAL(5,2),
    start_date DATE,
    maturity_date DATE,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Recurring Deposits
  db.run(`CREATE TABLE IF NOT EXISTS recurring_deposits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    monthly_amount DECIMAL(15,2),
    interest_rate DECIMAL(5,2),
    start_date DATE,
    tenure_months INTEGER,
    maturity_date DATE,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  console.log('Database initialized successfully');
});