// Script sederhana buat fitur interaktif di Admin
document.addEventListener("DOMContentLoaded", () => {
    
    // Bikin tanggal dinamis di Topbar
    const dateDisplay = document.getElementById("admin-date");
    if(dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = new Date().toLocaleDateString('en-US', options);
    }

    // Efek klik di baris tabel pesanan
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach(row => {
        row.addEventListener("click", () => {
            const orderId = row.querySelector(".order-id");
            if(orderId) {
                console.log("Membuka detail pesanan: " + orderId.innerText);
                // Nanti ini bisa diarahkan ke halaman detail pesanan sungguhan
            }
        });
    });
});