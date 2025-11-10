/**
 * VUB News Single Page Loader
 * Script untuk menampilkan detail berita di news-single.html
 * 
 * CARA PENGGUNAAN:
 * Tambahkan script ini di bagian bawah news-single.html sebelum tag </body>
 * <script src="js/news-single-loader.js"></script>
 */

(function() {
    'use strict';
    
    const NEWS_STORAGE_KEY = 'vub_news_data';
    
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
                content: `<p>PT Varia Usaha Beton dengan bangga mengumumkan penyelesaian proyek konstruksi klinik modern yang berlokasi di kawasan strategis Mid-Missouri. Proyek senilai 17,6 miliar rupiah ini menunjukkan komitmen perusahaan dalam memberikan layanan konstruksi beton berkualitas tinggi untuk sektor kesehatan.</p>

<p>Proyek ini meliputi pembangunan fasilitas medis lengkap dengan teknologi terkini, termasuk ruang operasi, ruang rawat inap, laboratorium, dan fasilitas pendukung lainnya. Semua struktur beton dikerjakan dengan standar internasional menggunakan material berkualitas tinggi dan teknologi konstruksi terdepan.</p>

<p>Tim ahli PT Varia Usaha Beton bekerja selama 18 bulan untuk menyelesaikan proyek ini tepat waktu. Kualitas beton yang digunakan telah melalui berbagai tes dan sertifikasi untuk memastikan keamanan dan ketahanan struktur bangunan dalam jangka panjang.</p>

<blockquote>
  <p>"Proyek ini adalah bukti nyata komitmen PT Varia Usaha Beton dalam memberikan solusi konstruksi terbaik untuk sektor kesehatan. Kami bangga dapat berkontribusi dalam penyediaan fasilitas kesehatan berkualitas tinggi bagi masyarakat." <cite>- Direktur Proyek PT VUB</cite></p>
</blockquote>

<p>Klinik ini dilengkapi dengan sistem struktural yang kuat dan tahan gempa, sistem drainase yang efisien, serta desain yang memperhatikan aspek kesehatan lingkungan. Seluruh proses konstruksi dilakukan dengan memperhatikan standar keselamatan kerja yang ketat dan ramah lingkungan.</p>

<p>PT Varia Usaha Beton terus berkomitmen untuk menghadirkan proyek-proyek konstruksi beton berkualitas tinggi yang tidak hanya memenuhi standar teknis, tetapi juga memberikan nilai tambah bagi masyarakat dan lingkungan sekitar.</p>`,
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
                excerpt: 'Proyek ekspansi fasilitas pengolahan air di Bandara Thandler yang dikerjakan oleh PT Varia Usaha Beton meraih penghargaan bergengsi.',
                content: `<p>PT Varia Usaha Beton meraih penghargaan bergengsi untuk proyek ekspansi fasilitas pengolahan air di Bandara Thandler. Penghargaan ini diberikan atas inovasi dan kualitas konstruksi beton yang luar biasa dalam menyelesaikan proyek infrastruktur vital ini.</p>

<p>Proyek ekspansi ini meliputi pembangunan sistem pengolahan air bersih yang canggih dengan kapasitas 5000 m³ per hari, lengkap dengan struktur beton bertulang untuk tangki penyimpanan, bangunan pengolahan, dan sistem distribusi yang terintegrasi dengan infrastruktur bandara yang sudah ada.</p>

<p>Tim engineering PT Varia Usaha Beton mengimplementasikan teknologi terkini dalam desain dan konstruksi, termasuk penggunaan beton self-compacting untuk memastikan kualitas struktur yang optimal dan meminimalkan perawatan jangka panjang.</p>

<blockquote>
  <p>"Penghargaan ini adalah apresiasi atas dedikasi tim kami dalam menghadirkan solusi konstruksi yang inovatif dan berkelanjutan. Kami berkomitmen untuk terus meningkatkan standar kualitas dalam setiap proyek." <cite>- Manajer Teknik PT VUB</cite></p>
</blockquote>

<p>Proyek ini diselesaikan dalam waktu 14 bulan dengan menerapkan sistem manajemen proyek yang ketat dan standar keselamatan kerja yang tinggi. Seluruh struktur beton telah melalui quality control yang ketat untuk memastikan ketahanan terhadap kondisi lingkungan yang challenging.</p>

<p>Keberhasilan proyek ini memperkuat posisi PT Varia Usaha Beton sebagai kontraktor terpercaya untuk proyek-proyek infrastruktur skala besar di Indonesia.</p>`,
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
                excerpt: 'Kerjasama konstruksi fasilitas tenaga surya antara Silicon Bench dan Cornike dengan PT Varia Usaha Beton sebagai kontraktor utama.',
                content: `<p>PT Varia Usaha Beton ditunjuk sebagai kontraktor utama dalam proyek pembangunan fasilitas tenaga surya hasil kerjasama Silicon Bench dan Cornike. Proyek ini merupakan bagian dari komitmen terhadap energi terbarukan dan konstruksi berkelanjutan di Indonesia.</p>

<p>Proyek senilai triliunan rupiah ini meliputi pembangunan struktur beton untuk fondasi panel surya seluas 50 hektar, bangunan control center, dan infrastruktur pendukung lainnya. PT Varia Usaha Beton bertanggung jawab atas seluruh aspek konstruksi beton dari fase persiapan hingga finishing.</p>

<p>Teknologi konstruksi yang digunakan mempertimbangkan aspek keberlanjutan dan efisiensi energi. Material beton diproduksi dengan standar ramah lingkungan dan proses konstruksi dirancang untuk meminimalkan dampak lingkungan.</p>

<blockquote>
  <p>"Proyek ini menandai komitmen kami terhadap pembangunan berkelanjutan. Kami bangga dapat berkontribusi dalam pengembangan energi terbarukan di Indonesia." <cite>- Direktur Utama PT VUB</cite></p>
</blockquote>

<p>Struktur beton yang dibangun dirancang untuk menahan beban panel surya dalam jangka waktu minimal 30 tahun dengan perawatan minimal. Desain struktur juga mempertimbangkan kondisi cuaca ekstrem dan aktivitas seismik di wilayah tersebut.</p>

<p>Proyek ini diharapkan selesai dalam waktu 24 bulan dan akan menjadi salah satu fasilitas tenaga surya terbesar di Indonesia, mampu menghasilkan energi bersih untuk kebutuhan ribuan rumah tangga.</p>`,
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
     * Get news ID from URL parameter
     */
    function getNewsIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
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
     * Load and display news detail
     */
    function loadNewsDetail() {
        const newsId = getNewsIdFromUrl();
        
        if (!newsId) {
            showError('ID berita tidak ditemukan');
            return;
        }
        
        const allNews = getNewsData();
        const newsItem = allNews.find(n => n.id === newsId);
        
        if (!newsItem) {
            showError('Berita tidak ditemukan');
            return;
        }
        
        // Update page title
        document.title = `${newsItem.title} - PT Varia Usaha Beton`;
        
        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', newsItem.excerpt);
        }
        
        // Update featured image
        const featuredImage = document.querySelector('.post-media img');
        if (featuredImage) {
            featuredImage.src = newsItem.image;
            featuredImage.alt = newsItem.title;
            featuredImage.onerror = function() {
                this.src = 'images/news/placeholder.jpg';
            };
        }
        
        // Update post meta
        const postAuthor = document.querySelector('.post-author a');
        if (postAuthor) {
            postAuthor.textContent = newsItem.author || 'Admin VUB';
        }
        
        const postCategory = document.querySelector('.post-cat a');
        if (postCategory) {
            postCategory.textContent = newsItem.category || 'Berita';
        }
        
        const postDate = document.querySelector('.post-meta-date');
        if (postDate) {
            postDate.innerHTML = `<i class="far fa-calendar"></i> ${formatDate(newsItem.date)}`;
        }
        
        // Update title
        const entryTitle = document.querySelector('.entry-title');
        if (entryTitle) {
            entryTitle.textContent = newsItem.title;
        }
        
        // Update content
        const entryContent = document.querySelector('.entry-content');
        if (entryContent) {
            entryContent.innerHTML = newsItem.content || `<p>${newsItem.excerpt}</p>`;
        }
        
        // Update tags
        if (newsItem.tags && newsItem.tags.length > 0) {
            const tagsContainer = document.querySelector('.post-tags');
            if (tagsContainer) {
                tagsContainer.innerHTML = newsItem.tags.map(tag => 
                    `<a href="news-left-sidebar.html?tag=${encodeURIComponent(tag)}">${tag}</a>`
                ).join('');
            }
        }
        
        // Load recent posts in sidebar
        loadRecentPosts(newsId);
        
        console.log('News loaded successfully:', newsItem.title);
    }
    
    /**
     * Load recent posts for sidebar
     */
    function loadRecentPosts(currentId) {
        const allNews = getNewsData();
        
        // Get other news (exclude current one)
        const recentNews = allNews
            .filter(n => n.id !== currentId)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
        
        const recentPostsContainer = document.querySelector('.recent-posts ul');
        if (!recentPostsContainer || recentNews.length === 0) return;
        
        recentPostsContainer.innerHTML = recentNews.map(item => `
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
     * Show error message
     */
    function showError(message) {
        const mainContainer = document.querySelector('#main-container .col-lg-8');
        if (mainContainer) {
            mainContainer.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">
                        <i class="fas fa-exclamation-triangle"></i> ${message}
                    </h4>
                    <p>Berita yang Anda cari tidak tersedia atau telah dihapus.</p>
                    <hr>
                    <p class="mb-0">
                        <a href="index.html" class="btn btn-primary">Kembali ke Beranda</a>
                        <a href="news-left-sidebar.html" class="btn btn-secondary">Lihat Semua Berita</a>
                    </p>
                </div>
            `;
        }
    }
    
    /**
     * Initialize news detail loader
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadNewsDetail);
        } else {
            loadNewsDetail();
        }
    }
    
    // Initialize
    init();
    
    // Export for debugging
    window.VUBNewsSingle = {
        reload: loadNewsDetail,
        getNews: function() {
            const id = getNewsIdFromUrl();
            return getNewsData().find(n => n.id === id);
        }
    };
    
})();

/**
 * DEBUGGING COMMANDS (gunakan di browser console):
 * 
 * VUBNewsSingle.reload()    - Reload berita
 * VUBNewsSingle.getNews()   - Lihat data berita saat ini
 */