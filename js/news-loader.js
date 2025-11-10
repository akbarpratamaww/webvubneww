/**
 * VUB News Integration Script
 * Script ini untuk menampilkan berita dinamis di halaman index.html
 * 
 * CARA PENGGUNAAN:
 * 1. Tambahkan script ini di bagian bawah index.html sebelum tag </body>
 * 2. Pastikan section berita memiliki id="news"
 * 3. Container berita memiliki id="newsContainer"
 * 
 * CARA INTEGRASI DI INDEX.HTML:
 * 
 * Ganti section berita yang ada dengan ini:
 * 
 * <section id="news" class="news">
 *   <div class="container">
 *     <div class="row text-center">
 *       <div class="col-12">
 *         <h2 class="section-title">Karya Berkualitas Tinggi</h2>
 *         <h3 class="section-sub-title">Judul Berita dan Artikel</h3>
 *       </div>
 *     </div>
 *     <div class="row" id="newsContainer">
 *       <!-- Berita akan dimuat di sini -->
 *       <div class="col-12 text-center py-5">
 *         <div class="spinner-border text-primary" role="status">
 *           <span class="visually-hidden">Loading...</span>
 *         </div>
 *         <p class="mt-3 text-muted">Memuat berita...</p>
 *       </div>
 *     </div>
 *     <div class="general-btn text-center mt-4">
 *       <a class="btn btn-primary" href="news-left-sidebar.html">Lihat Semua Berita</a>
 *     </div>
 *   </div>
 * </section>
 * 
 * Lalu tambahkan script di bawah tag penutup </body>:
 * <script src="js/news-loader.js"></script>
 */

(function() {
    'use strict';
    
    const NEWS_STORAGE_KEY = 'vub_news_data';
    const MAX_NEWS_DISPLAY = 3; // Jumlah berita yang ditampilkan di homepage
    
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
                excerpt: 'PT Varia Usaha Beton berhasil menyelesaikan proyek konstruksi klinik modern dengan total nilai kontrak mencapai 17,6 miliar rupiah.',
                content: 'Proyek ini menunjukkan komitmen PT Varia Usaha Beton dalam memberikan layanan konstruksi beton berkualitas tinggi.',
                image: 'images/news/news1.jpg',
                date: '2024-07-20',
                createdAt: new Date('2024-07-20').toISOString()
            },
            {
                id: 'default_2',
                title: 'Proyek Ekspansi Fasilitas Pengolahan Air Bandara Thandler Meraih Penghargaan',
                excerpt: 'Proyek ekspansi fasilitas pengolahan air di Bandara Thandler yang dikerjakan oleh PT Varia Usaha Beton meraih penghargaan bergengsi.',
                content: 'Penghargaan ini diberikan atas inovasi dan kualitas konstruksi beton yang luar biasa.',
                image: 'images/news/news2.jpg',
                date: '2024-06-17',
                createdAt: new Date('2024-06-17').toISOString()
            },
            {
                id: 'default_3',
                title: 'Silicon Bench dan Cornike Memulai Konstruksi Fasilitas Tenaga Surya',
                excerpt: 'Kerjasama konstruksi fasilitas tenaga surya antara Silicon Bench dan Cornike dengan PT Varia Usaha Beton sebagai kontraktor utama.',
                content: 'Proyek ini merupakan bagian dari komitmen terhadap energi terbarukan dan konstruksi berkelanjutan.',
                image: 'images/news/news3.jpg',
                date: '2024-08-13',
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
     * Create news card HTML
     */
    function createNewsCard(newsItem) {
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="latest-post">
                    <div class="latest-post-media">
                        <a href="news-single.html?id=${newsItem.id}" class="latest-post-img">
                            <img loading="lazy" 
                                 class="img-fluid" 
                                 src="${newsItem.image}" 
                                 alt="${newsItem.title}"
                                 onerror="this.src='images/news/placeholder.jpg'">
                        </a>
                    </div>
                    <div class="post-body">
                        <h4 class="post-title">
                            <a href="news-single.html?id=${newsItem.id}" class="d-inline-block">
                                ${newsItem.title}
                            </a>
                        </h4>
                        <div class="latest-post-meta">
                            <span class="post-item-date">
                                <i class="fa fa-clock-o"></i> ${formatDate(newsItem.date)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Load and display news
     */
    function loadNews() {
        const container = document.getElementById('newsContainer');
        
        if (!container) {
            console.warn('News container not found. Make sure element with id="newsContainer" exists.');
            return;
        }
        
        const news = getNewsData();
        
        // Sort by date, newest first
        news.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Get only the latest news
        const latestNews = news.slice(0, MAX_NEWS_DISPLAY);
        
        if (latestNews.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-newspaper fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Belum ada berita tersedia.</p>
                </div>
            `;
            return;
        }
        
        // Generate HTML for all news cards
        container.innerHTML = latestNews.map(item => createNewsCard(item)).join('');
        
        console.log(`Loaded ${latestNews.length} news items successfully`);
    }
    
    /**
     * Initialize news loader
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadNews);
        } else {
            loadNews();
        }
        
        // Reload news when localStorage changes (optional - untuk sync antar tab)
        window.addEventListener('storage', function(e) {
            if (e.key === NEWS_STORAGE_KEY) {
                loadNews();
            }
        });
    }
    
    // Initialize
    init();
    
    // Export functions for debugging (optional)
    window.VUBNews = {
        reload: loadNews,
        getData: getNewsData,
        resetToDefault: function() {
            localStorage.removeItem(NEWS_STORAGE_KEY);
            loadNews();
        }
    };
    
})();

/**
 * DEBUGGING COMMANDS (gunakan di browser console):
 * 
 * VUBNews.reload()           - Reload berita
 * VUBNews.getData()          - Lihat data berita
 * VUBNews.resetToDefault()   - Reset ke berita default
 */