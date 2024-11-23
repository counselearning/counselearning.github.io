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
        this.categoryTabs?.forEach(tab => {
            tab.addEventListener('click', () => {
                this.setActiveCategory(tab.dataset.category);
            });
        });

        // 搜尋輸入事件
        this.searchInput?.addEventListener('input', () => {
            this.searchTerm = this.searchInput.value.toLowerCase();
            this.filterAndDisplayArticles();
        });
    }

    async loadArticles() {
        try {
            // 修正 fetch 路徑，使用相對路徑
            const response = await fetch('./data/posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.articles = data.posts;
            
            // 確保文章按日期從新到舊排序
            this.articles.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });

            // 渲染文章列表
            this.filterAndDisplayArticles();
            
            // 如果在文章頁面，則更新文章導航
            if (window.location.pathname.includes('/posts/')) {
                this.updateArticleNavigation();
            }
        } catch (error) {
            console.error('Error loading articles:', error);
            // 顯示錯誤訊息給使用者
            if (this.articlesGrid) {
                this.articlesGrid.innerHTML = `
                    <div class="error-message">
                        <p>抱歉，載入文章時發生錯誤。請稍後再試。</p>
                    </div>
                `;
            }
        }
    }

    setActiveCategory(category) {
        this.currentCategory = category;
        
        // 更新分類標籤樣式
        this.categoryTabs?.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
        
        this.filterAndDisplayArticles();
    }

    filterAndDisplayArticles() {
        if (!this.articlesGrid) return;

        let filteredArticles = this.articles;

        // 根據分類篩選
        if (this.currentCategory !== 'all') {
            filteredArticles = filteredArticles.filter(article => {
                if (article.categories) {
                    return article.categories.includes(this.currentCategory);
                }
                return article.category === this.currentCategory;
            });
        }

        // 根據搜尋詞篩選
        if (this.searchTerm) {
            filteredArticles = filteredArticles.filter(article => 
                article.title.toLowerCase().includes(this.searchTerm) ||
                article.description.toLowerCase().includes(this.searchTerm) ||
                (article.tags && article.tags.some(tag => 
                    tag.toLowerCase().includes(this.searchTerm)
                ))
            );
        }

        this.displayArticles(filteredArticles);
    }

    displayArticles(articles) {
        if (!this.articlesGrid) return;

        if (articles.length === 0) {
            this.articlesGrid.innerHTML = `
                <div class="no-results">
                    <p>找不到符合的文章</p>
                </div>
            `;
            return;
        }

        this.articlesGrid.innerHTML = articles.map(article => `
            <a href="${article.url}" class="article-card">
                <div class="article-cover-wrapper">
                    <img class="article-cover" 
                        src="${article.coverImage}" 
                        alt="${article.title}的封面圖片"
                        loading="lazy">
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

    updateArticleNavigation() {
        const currentPath = window.location.pathname;
        const currentArticleId = currentPath.split('/').pop().replace('.html', '');
        
        // 找到當前文章在陣列中的索引
        const currentIndex = this.articles.findIndex(article => article.id === currentArticleId);
        
        if (currentIndex === -1) return;
        
        const prevArticle = this.articles[currentIndex - 1];
        const nextArticle = this.articles[currentIndex + 1];
        
        // 更新上一篇文章連結
        const prevNav = document.querySelector('.nav-prev');
        if (prevNav) {
            if (prevArticle) {
                prevNav.href = prevArticle.url;
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
                nextNav.href = nextArticle.url;
                nextNav.querySelector('strong').textContent = nextArticle.title;
                nextNav.style.visibility = 'visible';
            } else {
                nextNav.style.visibility = 'hidden';
            }
        }
    }
}

// 當頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    new ArticlesManager();
}); 