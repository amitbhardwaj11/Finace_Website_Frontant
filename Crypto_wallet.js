document.addEventListener("DOMContentLoaded", () => {
    const outputElement = document.getElementById("output");
    const transactionSection = document.getElementById("transaction-section");
    let privateKey = null;
    let publicKey = null;

    // Generate keys
    document.getElementById("generate-keys").addEventListener("click", () => {
        // Fake keys for demonstration
        privateKey = "Generated_Private_Key_Example";
        publicKey = "Generated_Public_Key_Example";

        outputElement.innerText = `Private Key: ${privateKey}\nPublic Key: ${publicKey}`;
        transactionSection.classList.remove("hidden");
    });

    // Save private key
    document.getElementById("save-private-key").addEventListener("click", () => {
        if (privateKey) {
            const blob = new Blob([privateKey], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "private_key.txt";
            link.click();
            outputElement.innerText = "Private key saved successfully!";
        } else {
            outputElement.innerText = "No private key to save. Generate keys first.";
        }
    });

    // Load private key
    document.getElementById("load-private-key").addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                privateKey = e.target.result;
                outputElement.innerText = `Private Key Loaded: ${privateKey}`;
            };
            reader.readAsText(file);
        });

        fileInput.click();
    });

    // Sign transaction
    document.getElementById("sign-transaction").addEventListener("click", () => {
        const transactionData = document.getElementById("transaction-data").value;
        if (!privateKey || !transactionData) {
            outputElement.innerText = "Please generate/load keys and enter transaction details.";
            return;
        }
        const signature = `Signature_of(${transactionData})_Using_${privateKey}`;
        outputElement.innerText = `Transaction Signed! Signature: ${signature}`;
    });

    // Verify transaction
    document.getElementById("verify-transaction").addEventListener("click", () => {
        const transactionData = document.getElementById("transaction-data").value;
        if (!publicKey || !transactionData) {
            outputElement.innerText = "Please generate keys and enter transaction details.";
            return;
        }
        const isVerified = true; // Fake verification for demo
        outputElement.innerText = isVerified ? "Transaction verified successfully!" : "Transaction verification failed!";
    });
});
