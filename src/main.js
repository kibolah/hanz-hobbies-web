// ==========================================
// 1. DATABASE PRODUK (SENTRAL)
// ==========================================
// Ini adalah 10 produk dasar. Sistem akan otomatis menggandakannya jadi 50 item (V1 sampai V5)
const baseProducts = [
    { brand: "Mini GT", carmaker: "Nissan", collection: "New Arrivals", price: 250000, priceOld: "", name: "Nissan Skyline GT-R R34 Advan", img: "R34+Advan", badge: "New", badgeStyle: "background:#3b82f6;" },
    { brand: "Inno64", carmaker: "Nissan", collection: "We Recommend", price: 310000, priceOld: "350000", name: "Nissan Silvia S15 LBWK", img: "S15+LBWK", badge: "Sale", badgeStyle: "" },
    { brand: "Tarmac Works", carmaker: "Porsche", collection: "We Recommend", price: 285000, priceOld: "", name: "Porsche 911 GT3 Gulf", img: "Porsche+Gulf", badge: "", badgeStyle: "" },
    { brand: "Hot Wheels", carmaker: "Chevrolet", collection: "New Arrivals", price: 175000, priceOld: "120000", name: "55' Chevy Gasser Custom", img: "Gasser", badge: "Rare", badgeStyle: "background:#eab308; color:black;" },
    { brand: "Mini GT", carmaker: "Datsun", collection: "We Recommend", price: 380000, priceOld: "", name: "Datsun 510 Kaido House", img: "Kaido+House", badge: "Hot", badgeStyle: "" },
    { brand: "Inno64", carmaker: "Honda", collection: "New Arrivals", price: 290000, priceOld: "330000", name: "Honda Civic EG6 Spoon", img: "Civic+Spoon", badge: "Sale", badgeStyle: "" },
    { brand: "Tarmac Works", carmaker: "Porsche", collection: "We Recommend", price: 450000, priceOld: "320000", name: "RWB Porsche 993", img: "RWB+993", badge: "Chase", badgeStyle: "background:#eab308; color:black;" },
    { brand: "Hot Wheels", carmaker: "Nissan", collection: "New Arrivals", price: 450000, priceOld: "400000", name: "Nissan Skyline R34 STH", img: "R34+STH", badge: "STH", badgeStyle: "background:#a855f7;" },
    { brand: "Tarmac Works", carmaker: "Mitsubishi", collection: "We Recommend", price: 265000, priceOld: "295000", name: "Mitsubishi Lancer Evo V", img: "Evo+V", badge: "Sale", badgeStyle: "" },
    { brand: "Hot Wheels", carmaker: "Datsun", collection: "New Arrivals", price: 150000, priceOld: "", name: "Datsun 510 Wagon", img: "Datsun+Wagon", badge: "", badgeStyle: "" }
];

const database = [];
// Gandakan otomatis jadi 50 barang (V1 sampai V5) biar kamu ga capek ngetik
for(let i=1; i<=5; i++) {
    baseProducts.forEach(p => {
        database.push({
            ...p,
            name: `${p.name} V${i}`,
            price: p.price + ((i-1) * 5000), // Harga naik 5rb tiap versi
            priceOld: p.priceOld ? (parseInt(p.priceOld) + ((i-1) * 5000)).toString() : ""
        });
    });
}

// Fungsi nge-render database ke dalam HTML
function injectDatabaseToHTML(containerId, isSearch) {
    const container = document.getElementById(containerId);
    if (!container) return false;

    container.innerHTML = ''; // Kosongkan div
    database.forEach(item => {
        const card = document.createElement('a');
        card.href = "../product/"; // Semua link ngarah ke halaman produk
        card.className = 'card';
        card.dataset.brand = item.brand;
        card.dataset.carmaker = item.carmaker;
        card.dataset.collection = item.collection;
        card.dataset.price = item.price;
        card.dataset.priceold = item.priceOld;
        card.dataset.name = item.name;

        let badgeHTML = item.badge ? `<div class="badge" style="${item.badgeStyle}">${item.badge}</div>` : '';
        let oldPriceHTML = item.priceOld ? `<div class="price-old">Rp ${item.priceOld}</div>` : '<div class="price-old"></div>';
        let trendHTML = '';
        if (item.badge === "Sale") trendHTML = '<span class="trend down">↓</span>';
        else if (item.badge === "Rare" || item.badge === "STH" || item.badge === "Chase") trendHTML = '<span class="trend up">↑</span>';

        card.innerHTML = `
            <div class="card-img-wrap">
                ${badgeHTML}
                <img src="https://via.placeholder.com/400x400/ffffff/000000?text=${item.img}" alt="${item.name}">
            </div>
            <div class="card-info">
                <div class="card-brand">${item.brand}</div>
                <div class="card-title">${item.name}</div>
                <div class="price-wrap">
                    ${oldPriceHTML}
                    <div class="price-main">
                        <span class="price-current">Rp ${item.price}</span>
                        ${trendHTML}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    return true;
}


// ==========================================
// 2. LOGIKA BURGER MENU & MATA UANG
// ==========================================
const burgerBtn = document.getElementById('burger-btn');
const mobileNav = document.getElementById('mobile-nav');
if (burgerBtn && mobileNav) burgerBtn.addEventListener('click', () => mobileNav.classList.toggle('active'));

const rates = { IDR: 1, USD: 16000, EUR: 17500, JPY: 105, MYR: 3400, SGD: 11800, GBP: 20000, AUD: 10500 };
function formatCurrency(amount, currency) {
    const value = amount / rates[currency];
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: currency, maximumFractionDigits: currency === 'IDR' || currency === 'JPY' ? 0 : 2 }).format(value);
}

function updatePrices(currency) {
    document.querySelectorAll('.card').forEach(card => {
        const price = parseInt(card.getAttribute('data-price'));
        const priceOldVal = card.getAttribute('data-priceold');
        const priceElem = card.querySelector('.price-current');
        const priceOldElem = card.querySelector('.price-old');
        if (priceElem && price) priceElem.innerText = formatCurrency(price, currency);
        if (priceOldElem && priceOldVal) priceOldElem.innerText = formatCurrency(parseInt(priceOldVal), currency);
    });
    const detailPrice = document.getElementById('detail-price');
    if (detailPrice) detailPrice.innerText = formatCurrency(parseInt(detailPrice.getAttribute('data-price')), currency);
}

const currencyDropdowns = document.querySelectorAll('.currency-dropdown');
currencyDropdowns.forEach(dd => {
    dd.addEventListener('change', (e) => {
        const selected = e.target.value;
        currencyDropdowns.forEach(d => d.value = selected);
        updatePrices(selected);
    });
});


// ==========================================
// 3. LOGIKA FILTER, SORT & PAGINATION
// ==========================================
function setupGridLogic(gridId, isSearch) {
    // Inject Database Dulu Sebelum difilter!
    if(!injectDatabaseToHTML(gridId, isSearch)) return;

    const grid = document.getElementById(gridId);
    let allCards = Array.from(grid.querySelectorAll('.card'));
    let filteredCards = [...allCards];
    const itemsPerPage = 20; 
    let currentPage = 1;
    
    const filterBrand = document.getElementById('filter-brand');
    const filterCarMaker = document.getElementById('filter-car-maker');
    const filterCollection = document.getElementById('filter-collection');
    const sortByShop = document.getElementById('sort-by');
    const searchPhrase = document.getElementById('search-phrase');
    const filterSale = document.getElementById('filter-sale');
    const sortRadios = document.querySelectorAll('input[name="sort"]');
    const pageInfo = document.getElementById(isSearch ? 'search-page-info' : 'page-info');
    const paginationControls = document.getElementById(isSearch ? 'search-pagination-controls' : 'pagination-controls');
    const matchCount = document.getElementById('match-count');

    function applyFilters() {
        filteredCards = []; 
        const brandVal = filterBrand ? filterBrand.value : 'All';
        const carMakerVal = filterCarMaker ? filterCarMaker.value : 'All';
        const collVal = filterCollection ? filterCollection.value : 'All';
        let sortVal = sortByShop ? sortByShop.value : 'default';
        const query = searchPhrase ? searchPhrase.value.toLowerCase() : '';
        const onlySale = filterSale ? filterSale.checked : false;
        if (isSearch) sortRadios.forEach(r => { if(r.checked) sortVal = r.value; });

        allCards.forEach(card => {
            let isMatch = true;
            if (!isSearch) {
                if (brandVal !== 'All' && card.getAttribute('data-brand') !== brandVal) isMatch = false;
                if (carMakerVal !== 'All' && card.getAttribute('data-carmaker') !== carMakerVal) isMatch = false;
                if (collVal !== 'All' && card.getAttribute('data-collection') !== collVal) isMatch = false;
            } else {
                const name = card.getAttribute('data-name').toLowerCase();
                const hasSale = card.getAttribute('data-priceold') !== "";
                if (query && !name.includes(query)) isMatch = false;
                if (onlySale && !hasSale) isMatch = false;
            }
            card.style.display = 'none'; 
            if (isMatch) filteredCards.push(card);
        });

        if(matchCount) matchCount.innerText = filteredCards.length;

        filteredCards.sort((a, b) => {
            if (sortVal === 'price-asc') return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
            if (sortVal === 'price-desc') return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
            if (sortVal === 'name-asc') return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
            if (sortVal === 'name-desc') return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
            return 0; 
        });

        filteredCards.forEach(card => grid.appendChild(card));
        currentPage = 1;
        renderPagination();
        
        // Panggil update harga biar mata uangnya ngikutin dropdown yang lagi dipilih
        const currentCurrency = document.querySelector('.currency-dropdown') ? document.querySelector('.currency-dropdown').value : 'IDR';
        updatePrices(currentCurrency);
    }

    function renderPagination() {
        const totalItems = filteredCards.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        filteredCards.forEach((card, index) => {
            card.style.display = (index >= startIndex && index < endIndex) ? 'flex' : 'none';
        });

        if (totalItems === 0) {
            pageInfo.innerText = `0 items found`;
            paginationControls.innerHTML = '';
            return;
        }
        
        let endDisplay = endIndex > totalItems ? totalItems : endIndex;
        pageInfo.innerText = `${startIndex + 1} - ${endDisplay} of ${totalItems} items`;
        paginationControls.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('a');
            btn.href = "#"; btn.innerText = i;
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', (e) => {
                e.preventDefault(); currentPage = i; renderPagination();
                grid.scrollIntoView({ behavior: "smooth", block: "start" });
            });
            paginationControls.appendChild(btn);
        }

        if (currentPage < totalPages) {
            const next = document.createElement('a');
            next.href = "#"; next.classList.add('next'); next.innerText = "NEXT >";
            next.addEventListener('click', (e) => {
                e.preventDefault(); currentPage++; renderPagination();
                grid.scrollIntoView({ behavior: "smooth", block: "start" });
            });
            paginationControls.appendChild(next);
        }
    }

    if(!isSearch) {
        document.getElementById('btn-filter').addEventListener('click', () => document.getElementById('filter-panel').classList.toggle('show'));
        filterBrand.addEventListener('change', applyFilters);
        filterCarMaker.addEventListener('change', applyFilters);
        filterCollection.addEventListener('change', applyFilters);
        sortByShop.addEventListener('change', applyFilters);
    } else {
        searchPhrase.addEventListener('input', applyFilters);
        filterSale.addEventListener('change', applyFilters);
        sortRadios.forEach(r => r.addEventListener('change', applyFilters));
    }

    applyFilters(); 
}

setupGridLogic('product-grid', false); 
setupGridLogic('search-product-grid', true);