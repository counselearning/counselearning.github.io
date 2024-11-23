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
            const response = await fetch('../data/posts.json');
            const articles = await response.json();
            
            // 確保文章按日期從新到舊排序
            articles.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });

            // 渲染文章列表
            this.renderArticles(articles);
            
            // 更新文章導航
            this.updateArticleNavigation(articles);
        } catch (error) {
            console.error('Error loading articles:', error);
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

    // 更新文章導航功能
    updateArticleNavigation(articles) {
        // 獲取當前文章的 URL
        const currentPath = window.location.pathname;
        const currentArticleId = currentPath.split('/').pop().replace('.html', '');
        
        // 找到當前文章在陣列中的索引
        const currentIndex = articles.findIndex(article => article.id === currentArticleId);
        
        if (currentIndex === -1) return; // 如果找不到當前文章，直接返回
        
        const prevArticle = articles[currentIndex - 1]; // 較新的文章
        const nextArticle = articles[currentIndex + 1]; // 較舊的文章
        
        // 更新上一篇文章連結
        const prevNav = document.querySelector('.nav-prev');
        if (prevNav) {
            if (prevArticle) {
                prevNav.href = `../posts/${prevArticle.id}.html`;
                prevNav.querySelector('strong').textContent = prevArticle.title;
                prevNav.style.visibility = 'visible';
            } else {
                prevNav.style.visibility = 'hidden';
            }
        }
        
        // 更新下一篇文章連結
        const nextNav = document.querySelector('.nav-next');
        if (nextNav) {
            if (nextArticle) {
                nextNav.href = `../posts/${nextArticle.id}.html`;
                nextNav.querySelector('strong').textContent = nextArticle.title;
                nextNav.style.visibility = 'visible';
            } else {
                nextNav.style.visibility = 'hidden';
            }
        }
    }

    // 渲染文章列表
    renderArticles(articles) {
        const articleList = document.querySelector('.article-list');
        if (!articleList) return;
        
        articleList.innerHTML = articles.map(article => `
            <article class="article-card">
                <a href="posts/${article.id}.html">
                    <img src="${article.coverImage}" alt="${article.title}" class="article-cover">
                    <div class="article-content">
                        <h2>${article.title}</h2>
                        <p class="article-description">${article.description}</p>
                        <div class="article-meta">
                            <span class="article-date">${this.formatDate(article.date)}</span>
                            <span class="article-category">${article.category}</span>
                        </div>
                    </div>
                </a>
            </article>
        `).join('');
    }
}

// 當頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    new ArticlesManager();
}); 