/**
 * VUB News All Page Loader
 * Script untuk menampilkan semua berita di news-left-sidebar.html
 * 
 * CARA PENGGUNAAN:
 * Tambahkan script ini di bagian bawah news-left-sidebar.html sebelum tag </body>
 * <script src="js/news-all-loader.js"></script>
 */

(function() {
    'use strict';
    
    const NEWS_STORAGE_KEY = 'vub_news_data';
    const ITEMS_PER_PAGE = 6; // Jumlah berita per halaman
    let currentPage = 1;
    let filteredNews = [];
    let allNews = [];
    
    /**
     * Get news data from localStorage
     */
    function getNewsData() {
        try {
            const data = localStorage.getItem(NEWS_STORAGE_KEY);
            if (!data) return getDefaultNews();
            
            const news = JSON.parse(data);
            return news.length > 0 ? news : getDefaultNews();
        } catch (e) {
            console.error('Error loading news:', e);
            return getDefaultNews();
        }
    }
    
    /**
     * Default news jika belum ada data
     */
    function getDefaultNews() {
        return [
            {
                id: 'default_1',
                title: 'PT Varia Usaha Beton Menyelesaikan Proyek Klinik Senilai 17,6 Miliar',
                excerpt: 'PT Varia Usaha Beton berhasil menyelesaikan proyek konstruksi klinik modern dengan total nilai kontrak mencapai 17,6 miliar rupiah. Proyek ini menunjukkan komitmen perusahaan dalam memberikan layanan konstruksi beton berkualitas tinggi untuk sektor kesehatan.',
                content: '<p>Konten lengkap berita...</p>',
                image: 'images/news/news1.jpg',
                date: '2024-07-20',
                author: 'Admin VUB',
                category: 'Proyek Kesehatan',
                tags: ['Konstruksi', 'Kesehatan', 'Beton Berkualitas'],
                createdAt: new Date('2024-07-20').toISOString()
            },
            {
                id: 'default_2',
                title: 'Proyek Ekspansi Fasilitas Pengolahan Air Bandara Thandler Meraih Penghargaan',
                excerpt: 'Proyek ekspansi fasilitas pengolahan air di Bandara Thandler yang dikerjakan oleh PT Varia Usaha Beton meraih penghargaan bergengsi atas inovasi dan kualitas konstruksi beton yang luar biasa.',
                content: '<p>Konten lengkap berita...</p>',
                image: 'images/news/news2.jpg',
                date: '2024-06-17',
                author: 'Admin VUB',
                category: 'Penghargaan',
                tags: ['Infrastruktur', 'Penghargaan', 'Inovasi'],
                createdAt: new Date('2024-06-17').toISOString()
            },
            {
                id: 'default_3',
                title: 'Silicon Bench dan Cornike Memulai Konstruksi Fasilitas Tenaga Surya',
                excerpt: 'Kerjasama konstruksi fasilitas tenaga surya antara Silicon Bench dan Cornike dengan PT Varia Usaha Beton sebagai kontraktor utama. Proyek ini merupakan bagian dari komitmen terhadap energi terbarukan dan konstruksi berkelanjutan.',
                content: '<p>Konten lengkap berita...</p>',
                image: 'images/news/news3.jpg',
                date: '2024-08-13',
                author: 'Admin VUB',
                category: 'Energi Terbarukan',
                tags: ['Tenaga Surya', 'Berkelanjutan', 'Infrastruktur'],
                createdAt: new Date('2024-08-13').toISOString()
            }
        ];
    }
    
    /**
     * Format date to Indonesian format
     */
    function formatDate(dateString) {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day} ${month}, ${year}`;
    }
    
    /**
     * Get unique categories from all news
     */
    function getCategories() {
        const categories = new Set();
        allNews.forEach(item => {
            if (item.category) {
                categories.add(item.category);
            }
        });
        return Array.from(categories);
    }
    
    /**
     * Get unique tags from all news
     */
    function getTags() {
        const tags = new Set();
        allNews.forEach(item => {
            if (item.tags && Array.isArray(item.tags)) {
                item.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags);
    }
    
    /**
     * Get archives (months with news)
     */
    function getArchives() {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        const archives = new Map();
        allNews.forEach(item => {
            const date = new Date(item.date);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            const label = `${months[date.getMonth()]} ${date.getFullYear()}`;
            
            if (!archives.has(key)) {
                archives.set(key, {
                    label: label,
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    count: 0
                });
            }
            archives.get(key).count++;
        });
        
        return Array.from(archives.values()).sort((a, b) => {
            if (b.year !== a.year) return b.year - a.year;
            return b.month - a.month;
        });
    }
    
    /**
     * Create news post HTML
     */
    function createNewsPost(newsItem) {
        return `
            <div class="post" data-news-id="${newsItem.id}">
                <div class="post-media post-image">
                    <a href="news-single.html?id=${encodeURIComponent(newsItem.id)}">
                        <img loading="lazy" 
                             src="${newsItem.image}" 
                             class="img-fluid" 
                             alt="${newsItem.title}"
                             onerror="this.src='images/news/placeholder.jpg'">
                    </a>
                </div>

                <div class="post-body">
                    <div class="entry-header">
                        <div class="post-meta">
                            <span class="post-author">
                                <i class="far fa-user"></i><a href="#"> ${newsItem.author || 'Admin VUB'}</a>
                            </span>
                            <span class="post-cat">
                                <i class="far fa-folder-open"></i><a href="?category=${encodeURIComponent(newsItem.category || 'Berita')}"> ${newsItem.category || 'Berita'}</a>
                            </span>
                            <span class="post-meta-date">
                                <i class="far fa-calendar"></i> ${formatDate(newsItem.date)}
                            </span>
                        </div>
                        <h2 class="entry-title">
                            <a href="news-single.html?id=${encodeURIComponent(newsItem.id)}">${newsItem.title}</a>
                        </h2>
                    </div>

                    <div class="entry-content">
                        <p>${newsItem.excerpt}</p>
                    </div>

                    <div class="post-footer">
                        <a href="news-single.html?id=${encodeURIComponent(newsItem.id)}" class="btn btn-primary">
                            Baca Selengkapnya <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Create pagination HTML
     */
    function createPagination() {
        const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
        
        if (totalPages <= 1) return '';
        
        let html = '<nav class="paging" aria-label="Page navigation"><ul class="pagination">';
        
        // Previous button
        html += `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="VUBNewsAll.goToPage(${currentPage - 1}); return false;">
                    <i class="fas fa-angle-double-left"></i>
                </a>
            </li>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                html += `
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="VUBNewsAll.goToPage(${i}); return false;">${i}</a>
                    </li>
                `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                html += '<li class="page-item disabled"><a class="page-link">...</a></li>';
            }
        }
        
        // Next button
        html += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="VUBNewsAll.goToPage(${currentPage + 1}); return false;">
                    <i class="fas fa-angle-double-right"></i>
                </a>
            </li>
        `;
        
        html += '</ul></nav>';
        return html;
    }
    
    /**
     * Load and display news
     */
    function loadNews() {
        const container = document.querySelector('.col-lg-8.order-0');
        
        if (!container) {
            console.warn('News container not found');
            return;
        }
        
        // Get URL parameters for filtering
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFilter = urlParams.get('category');
        const tagFilter = urlParams.get('tag');
        const searchQuery = urlParams.get('search');
        const archiveMonth = urlParams.get('month');
        const archiveYear = urlParams.get('year');
        
        // Filter news based on parameters
        filteredNews = allNews.filter(item => {
            if (categoryFilter && item.category !== categoryFilter) return false;
            if (tagFilter && (!item.tags || !item.tags.includes(tagFilter))) return false;
            if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
                !item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (archiveMonth && archiveYear) {
                const itemDate = new Date(item.date);
                if (itemDate.getMonth() !== parseInt(archiveMonth) || 
                    itemDate.getFullYear() !== parseInt(archiveYear)) return false;
            }
            return true;
        });
        
        // Sort by date, newest first
        filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageNews = filteredNews.slice(startIndex, endIndex);
        
        // Display results info
        let resultsInfo = '';
        if (categoryFilter) resultsInfo = `Kategori: <strong>${categoryFilter}</strong>`;
        if (tagFilter) resultsInfo = `Tag: <strong>${tagFilter}</strong>`;
        if (searchQuery) resultsInfo = `Pencarian: <strong>${searchQuery}</strong>`;
        
        if (resultsInfo) {
            resultsInfo = `
                <div class="alert alert-info mb-4">
                    ${resultsInfo} 
                    <a href="news-left-sidebar.html" class="float-right">Reset Filter</a>
                </div>
            `;
        }
        
        // Generate HTML
        if (pageNews.length === 0) {
            container.innerHTML = resultsInfo + `
                <div class="text-center py-5">
                    <i class="fas fa-newspaper fa-3x text-muted mb-3"></i>
                    <h4>Tidak ada berita ditemukan</h4>
                    <p class="text-muted">Coba ubah filter atau pencarian Anda</p>
                    <a href="news-left-sidebar.html" class="btn btn-primary mt-3">Lihat Semua Berita</a>
                </div>
            `;
            return;
        }
        
        const newsHtml = pageNews.map(item => createNewsPost(item)).join('');
        const paginationHtml = createPagination();
        
        container.innerHTML = resultsInfo + newsHtml + paginationHtml;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    /**
     * Load recent posts in sidebar
     */
    function loadRecentPosts() {
        const container = document.querySelector('.recent-posts ul');
        if (!container) return;
        
        const recentNews = allNews
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        container.innerHTML = recentNews.map(item => `
            <li class="d-flex align-items-center">
                <div class="posts-thumb">
                    <a href="news-single.html?id=${encodeURIComponent(item.id)}">
                        <img loading="lazy" alt="${item.title}" src="${item.image}"
                             onerror="this.src='images/news/placeholder.jpg'">
                    </a>
                </div>
                <div class="post-info">
                    <h4 class="entry-title">
                        <a href="news-single.html?id=${encodeURIComponent(item.id)}">${item.title}</a>
                    </h4>
                </div>
            </li>
        `).join('');
    }
    
    /**
     * Load categories in sidebar
     */
    function loadCategories() {
        const container = document.querySelector('.widget:has(.widget-title:contains("Categories")) ul');
        if (!container) return;
        
        const categories = getCategories();
        
        if (categories.length === 0) {
            container.innerHTML = '<li class="text-muted">Belum ada kategori</li>';
            return;
        }
        
        container.innerHTML = categories.map(cat => {
            const count = allNews.filter(n => n.category === cat).length;
            return `<li><a href="?category=${encodeURIComponent(cat)}">${cat} <span class="float-right">(${count})</span></a></li>`;
        }).join('');
    }
    
    /**
     * Load archives in sidebar
     */
    function loadArchives() {
        const container = document.querySelector('.widget:has(.widget-title:contains("Archives")) ul');
        if (!container) return;
        
        const archives = getArchives();
        
        if (archives.length === 0) {
            container.innerHTML = '<li class="text-muted">Belum ada arsip</li>';
            return;
        }
        
        container.innerHTML = archives.slice(0, 6).map(archive => `
            <li>
                <a href="?month=${archive.month}&year=${archive.year}">
                    ${archive.label} <span class="float-right">(${archive.count})</span>
                </a>
            </li>
        `).join('');
    }
    
    /**
     * Load tags in sidebar
     */
    function loadTags() {
        const container = document.querySelector('.widget-tags ul');
        if (!container) return;
        
        const tags = getTags();
        
        if (tags.length === 0) {
            container.innerHTML = '<li class="text-muted">Belum ada tag</li>';
            return;
        }
        
        container.innerHTML = tags.map(tag => 
            `<li><a href="?tag=${encodeURIComponent(tag)}">${tag}</a></li>`
        ).join('');
    }
    
    /**
     * Add search functionality
     */
    function initSearch() {
        // Add search box if not exists
        const sidebar = document.querySelector('.sidebar-left');
        if (!sidebar) return;
        
        const searchWidget = `
            <div class="widget widget-search">
                <h3 class="widget-title">Cari Berita</h3>
                <form onsubmit="VUBNewsAll.search(event)">
                    <div class="input-group">
                        <input type="text" 
                               class="form-control" 
                               id="searchInput"
                               placeholder="Ketik kata kunci..."
                               value="${new URLSearchParams(window.location.search).get('search') || ''}">
                        <button class="btn btn-primary" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        // Insert search widget at the top
        sidebar.insertAdjacentHTML('afterbegin', searchWidget);
    }
    
    /**
     * Handle search
     */
    function handleSearch(event) {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (query) {
            window.location.href = `?search=${encodeURIComponent(query)}`;
        } else {
            window.location.href = 'news-left-sidebar.html';
        }
    }
    
    /**
     * Go to specific page
     */
    function goToPage(page) {
        const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
        
        if (page < 1 || page > totalPages) return;
        
        currentPage = page;
        loadNews();
    }
    
    /**
     * Initialize all news loader
     */
    function init() {
        // Load data
        allNews = getNewsData();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                loadNews();
                loadRecentPosts();
                loadCategories();
                loadArchives();
                loadTags();
                initSearch();
            });
        } else {
            loadNews();
            loadRecentPosts();
            loadCategories();
            loadArchives();
            loadTags();
            initSearch();
        }
        
        console.log(`Loaded ${allNews.length} news items`);
    }
    
    // Initialize
    init();
    
    // Export functions
    window.VUBNewsAll = {
        reload: function() {
            allNews = getNewsData();
            currentPage = 1;
            loadNews();
            loadRecentPosts();
            loadCategories();
            loadArchives();
            loadTags();
        },
        goToPage: goToPage,
        search: handleSearch,
        getData: function() {
            return {
                all: allNews,
                filtered: filteredNews,
                currentPage: currentPage,
                totalPages: Math.ceil(filteredNews.length / ITEMS_PER_PAGE)
            };
        }
    };
    
})();

/**
 * DEBUGGING COMMANDS (gunakan di browser console):
 * 
 * VUBNewsAll.reload()        - Reload semua berita
 * VUBNewsAll.getData()       - Lihat data berita
 * VUBNewsAll.goToPage(2)     - Pindah ke halaman 2
 */