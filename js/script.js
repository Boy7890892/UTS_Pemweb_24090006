document.addEventListener('DOMContentLoaded', function() {
    
    // =======================================
    // I. FUNGSIONALITAS UMUM (Format Rupiah)
    // =======================================
    
    /**
     * Fungsi untuk memformat angka menjadi format Rupiah Indonesia (IDR).
     */
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // =======================================
    // II. FUNGSIONALITAS HALAMAN LOGIN
    // =======================================

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) { // Hanya jalankan jika form login ada
        
        function displayError(message) {
            if (errorMessage) {
                errorMessage.textContent = message;
                errorMessage.classList.add('visible');
            }
        }

        function hideError() {
            if (errorMessage) {
                errorMessage.textContent = '';
                errorMessage.classList.remove('visible');
            }
        }

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            hideError();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Sederhana: Hanya validasi kosong
            if (email === '' || password === '') {
                displayError('Email dan Password tidak boleh kosong!');
                if (email === '') {
                    emailInput.focus();
                } else {
                    passwordInput.focus();
                }
                return;
            }

            // --- Simulasi Login Berhasil ---
            alert('Login berhasil! Anda akan diarahkan ke Dashboard.'); 
            window.location.href = 'dashboard.html';
        });
    }

    // =======================================
    // III. FUNGSIONALITAS HALAMAN DASHBOARD
    // =======================================

    const summaryCardsContainer = document.getElementById('summaryCards');
    const viewProductsBtn = document.getElementById('viewProductsBtn');
    
    if (summaryCardsContainer) { // Hanya jalankan jika container cards ada
        
        const summary = {
            totalProducts: 120,
            totalSales: 85,
            totalRevenue: 12500000 
        };

        const cardsData = [
            { 
                title: 'Total Products', 
                value: summary.totalProducts, 
                iconClass: 'fas fa-shopping-bag', // Ikon tas belanja
                className: 'card-products'
            },
            { 
                title: 'Total Sales', 
                value: summary.totalSales, 
                iconClass: 'fas fa-shopping-bag', // Ikon tas belanja
                className: 'card-sales'
            },
            { 
                title: 'Total Revenue', 
                value: formatRupiah(summary.totalRevenue), // Format Rupiah
                iconClass: 'fas fa-dollar-sign', 
                className: 'card-revenue'
            }
        ];

        // Render Cards
        cardsData.forEach(data => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${data.className}`; 
            
            cardElement.innerHTML = `
                <div class="card-icon"><i class="${data.iconClass}"></i></div>
                <div class="card-title">${data.title}</div>
                <div class="card-value">${data.value}</div>
            `;
            
            summaryCardsContainer.appendChild(cardElement);
        });
        
        // Fungsionalitas Tombol di Dashboard
        if (viewProductsBtn) {
            viewProductsBtn.addEventListener('click', function() {
                window.location.href = 'products.html';
            });
        }
    }


    // =======================================
    // IV. FUNGSIONALITAS HALAMAN DATA PRODUK
    // =======================================
    
    const productListBody = document.getElementById('product-list-body');

    if (productListBody) { // Hanya jalankan jika tabel produk ada
        
        // Data Produk Dummy
        const products = [
            { id: 1, name: "Kopi Gayo Arabica", price: 75000, stock: 50 },
            { id: 2, name: "Teh Hijau Jasmine", price: 35000, stock: 30 },
            { id: 3, name: "Coklat Batang Premium", price: 60000, stock: 20 },
            { id: 4, name: "Madu Hutan Murni", price: 120000, stock: 15 },
        ];

        // Mengisi Tabel dengan Data Produk
        products.forEach((product, index) => {
            const row = productListBody.insertRow();
            row.classList.add('table-row-item'); 
            
            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = product.name;
            row.insertCell(2).textContent = formatRupiah(product.price);
            row.insertCell(3).textContent = product.stock;

            const actionCell = row.insertCell(4);
            actionCell.classList.add('action-cell');
            actionCell.innerHTML = `
                <i class="fas fa-edit action-icon edit-icon" data-name="${product.name}" data-id="${product.id}"></i>
                <i class="fas fa-trash-alt action-icon delete-icon" data-name="${product.name}" data-id="${product.id}"></i>
            `;
        });

        // Menambahkan Fungsionalitas Tombol Aksi (Edit/Hapus)
        productListBody.addEventListener('click', (event) => {
            const targetIcon = event.target.closest('.action-icon');
            if (!targetIcon) return;

            const productName = targetIcon.getAttribute('data-name');
            const productId = targetIcon.getAttribute('data-id');
            const row = targetIcon.closest('tr');
            
            if (targetIcon.classList.contains('edit-icon')) {
                alert(`Edit produk: ${productName} (ID: ${productId})`);
            }

            if (targetIcon.classList.contains('delete-icon')) {
                if (confirm(`Yakin ingin menghapus produk ${productName} ini?`)) {
                    // Hapus baris dari DOM
                    row.remove();
                    alert(`Produk ${productName} telah dihapus.`);
                    // NOTE: Dalam aplikasi nyata, Anda harus mengirim permintaan HAPUS ke server di sini.
                }
            }
        });
    }
});