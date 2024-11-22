class ArticlesManager {
    constructor() {
        this.articles = [];
        this.currentCategory = 'all';
        this.searchTerm = '';
        
        // 初始化元素
        this.articlesGrid = document.querySelector('.articles-grid');
        this.categoryTabs = document.querySelectorAll('.category-tab');
        this.searchInput = document.getElementById('searchArticles');
        
        // 綁定事件
        this.bindEvents();
        
        // 載入文章資料
        this.loadArticles();
    }

    bindEvents() {
        // 分類標籤點擊事件
        this.categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.setActiveCategory(tab.dataset.category);
            });
        });

        // 搜尋輸入事件
        this.searchInput.addEventListener('input', () => {
            this.searchTerm = this.searchInput.value.toLowerCase();
            this.filterAndDisplayArticles();
        });
    }

    async loadArticles() {
        try {
            const response = await fetch('data/posts.json');
            const data = await response.json();
            this.articles = data.posts;
            this.filterAndDisplayArticles();
        } catch (error) {
            console.error('載入文章失敗:', error);
            this.articlesGrid.innerHTML = '<p class="error-message">載入文章時發生錯誤，請稍後再試。</p>';
        }
    }

    setActiveCategory(category) {
        this.currentCategory = category;
        
        // 更新分類標籤樣式
        this.categoryTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
        
        this.filterAndDisplayArticles();
    }

    filterAndDisplayArticles() {
        let filteredArticles = this.articles;

        // 根據分類篩選
        if (this.currentCategory !== 'all') {
            filteredArticles = filteredArticles.filter(article => 
                article.category === this.currentCategory
            );
        }

        // 根據搜尋詞篩選
        if (this.searchTerm) {
            filteredArticles = filteredArticles.filter(article => 
                article.title.toLowerCase().includes(this.searchTerm) ||
                article.description.toLowerCase().includes(this.searchTerm) ||
                article.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
            );
        }

        this.displayArticles(filteredArticles);
    }

    displayArticles(articles) {
        if (articles.length === 0) {
            this.articlesGrid.innerHTML = `
                <div class="no-results">
                    <p>找不到符合的文章</p>
                </div>
            `;
            return;
        }

        this.articlesGrid.innerHTML = articles.map(article => `
            <a href="posts/${article.id}.html" class="article-card">
                <div class="article-cover-wrapper">
                    <img class="article-cover" 
                        src="${article.coverImage}" 
                        alt="${article.title}的封面圖片"
                        loading="lazy"
                        width="1200"
                        height="630">
                </div>
                <div class="article-content">
                    <div class="article-category">${this.getCategoryName(article.category)}</div>
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-description">${article.description}</p>
                    <div class="article-meta">
                        <span class="article-date">${this.formatDate(article.date)}</span>
                        <span class="article-author">${article.author}</span>
                    </div>
                </div>
            </a>
        `).join('');
    }

    getCategoryName(category) {
        const categoryNames = {
            'mental-health': '心理健康',
            'psychological-tests': '心理測驗',
            'research-trends': '研究趨勢'
        };
        return categoryNames[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// 當頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    new ArticlesManager();
}); 