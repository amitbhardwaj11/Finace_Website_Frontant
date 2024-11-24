document.addEventListener("DOMContentLoaded", () => {
    const connectWalletBtn = document.getElementById("connect-wallet");
    const walletAddressSpan = document.getElementById("wallet-address");
    const walletBalanceSpan = document.getElementById("wallet-balance");
    const walletInfoDiv = document.getElementById("wallet-info");
    const swapStatus = document.getElementById("swap-status");
    const stakingStatus = document.getElementById("staking-status");

    let wallet = {
        address: null,
        balance: 0
    };

    // Mock wallet connection
    connectWalletBtn.addEventListener("click", () => {
        wallet.address = "0x1234...ABCD"; // Simulated wallet address
        wallet.balance = 10.5; // Simulated ETH balance
        walletAddressSpan.innerText = wallet.address;
        walletBalanceSpan.innerText = `${wallet.balance} ETH`;
        walletInfoDiv.classList.remove("hidden");
    });

    // Mock Swap Tokens
    document.getElementById("swap-btn").addEventListener("click", () => {
        const fromToken = document.getElementById("from-token").value.toUpperCase();
        const toToken = document.getElementById("to-token").value.toUpperCase();
        const amount = parseFloat(document.getElementById("amount").value);

        if (!fromToken || !toToken || isNaN(amount) || amount <= 0) {
            swapStatus.innerText = "Invalid input. Please check token names and amount.";
            return;
        }

        swapStatus.innerText = `Swapped ${amount} ${fromToken} to ${toToken} (simulated).`;
    });

    // Mock Staking
    document.getElementById("stake-btn").addEventListener("click", () => {
        const stakeToken = document.getElementById("stake-token").value.toUpperCase();
        const stakeAmount = parseFloat(document.getElementById("stake-amount").value);

        if (!stakeToken || isNaN(stakeAmount) || stakeAmount <= 0) {
            stakingStatus.innerText = "Invalid staking details. Please check token and amount.";
            return;
        }

        stakingStatus.innerText = `Staked ${stakeAmount} ${stakeToken} (simulated).`;
    });

    document.getElementById("unstake-btn").addEventListener("click", () => {
        stakingStatus.innerText = "Unstaked tokens successfully (simulated).";
    });
});
