document.addEventListener("DOMContentLoaded", () => {
    const priceList = document.getElementById("price-list");
    const transactionStatus = document.getElementById("transaction-status");
    const transactionHistory = document.getElementById("transaction-history");

    // Mock Wallet Balance
    let wallet = {
        BTC: 0,
        ETH: 0,
        balanceUSD: 10000
    };

    // Fetch live prices (using a mock API endpoint for demonstration)
    const fetchPrices = async () => {
        try {
            // Replace with a real API endpoint like CoinGecko or Binance
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
            const data = await response.json();

            // Render prices
            priceList.innerHTML = `
                <p>Bitcoin (BTC): $${data.bitcoin.usd}</p>
                <p>Ethereum (ETH): $${data.ethereum.usd}</p>
            `;
            return data;
        } catch (error) {
            console.error("Error fetching prices:", error);
            priceList.innerHTML = `<p>Unable to fetch prices</p>`;
        }
    };

    // Perform Buy/Sell Operation
    const performTrade = async (type) => {
        const cryptoName = document.getElementById("crypto-name").value.toUpperCase();
        const cryptoAmount = parseFloat(document.getElementById("crypto-amount").value);
        const prices = await fetchPrices();

        if (!cryptoName || isNaN(cryptoAmount) || cryptoAmount <= 0) {
            transactionStatus.innerText = "Invalid input. Please enter valid details.";
            return;
        }

        let priceUSD = 0;
        if (cryptoName === "BTC") priceUSD = prices.bitcoin.usd;
        if (cryptoName === "ETH") priceUSD = prices.ethereum.usd;

        if (priceUSD === 0) {
            transactionStatus.innerText = "Unsupported cryptocurrency.";
            return;
        }

        const totalCost = cryptoAmount * priceUSD;

        if (type === "BUY") {
            if (wallet.balanceUSD >= totalCost) {
                wallet.balanceUSD -= totalCost;
                wallet[cryptoName] = (wallet[cryptoName] || 0) + cryptoAmount;
                transactionStatus.innerText = `Bought ${cryptoAmount} ${cryptoName} for $${totalCost}`;
            } else {
                transactionStatus.innerText = "Insufficient funds!";
            }
        } else if (type === "SELL") {
            if (wallet[cryptoName] >= cryptoAmount) {
                wallet[cryptoName] -= cryptoAmount;
                wallet.balanceUSD += totalCost;
                transactionStatus.innerText = `Sold ${cryptoAmount} ${cryptoName} for $${totalCost}`;
            } else {
                transactionStatus.innerText = `Insufficient ${cryptoName} balance!`;
            }
        }

        // Update Transaction History
        const listItem = document.createElement("li");
        listItem.innerText = `${type} ${cryptoAmount} ${cryptoName} for $${totalCost}`;
        transactionHistory.appendChild(listItem);
    };

    // Button Event Listeners
    document.getElementById("buy-btn").addEventListener("click", () => performTrade("BUY"));
    document.getElementById("sell-btn").addEventListener("click", () => performTrade("SELL"));

    // Initial Fetch
    fetchPrices();
    setInterval(fetchPrices, 30000); // Update prices every 30 seconds
});
