const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");
const downloadBtn = document.getElementById("downloadBtn");

function generateQR() {
    const inputValue = qrText.value.trim();

    if (inputValue.length > 0) {
        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inputValue)}`;
        
        qrImage.src = qrCodeURL;
        imgBox.classList.add("show-img");

        // Show download button
        downloadBtn.style.display = "block";

        // Set download link
        downloadBtn.onclick = () => {
            const link = document.createElement("a");
            link.href = qrCodeURL;
            link.download = `QRCode_${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    } else {
        qrText.classList.add("error");
        setTimeout(() => {
            qrText.classList.remove("error");
        }, 1000);
    }
}

// Add event listener for "Enter" key
qrText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        generateQR();
    }
});