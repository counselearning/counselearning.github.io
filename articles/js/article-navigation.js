async function initializeArticleNavigation() {
    try {
        // 獲取當前文章的URL
        const currentPath = window.location.pathname;
        
        // 載入文章數據
        const response = await fetch('/articles/data/posts.json');
        const data = await response.json();
        
        // 找到當前文章在列表中的位置
        const currentIndex = data.posts.findIndex(post => post.url === currentPath);
        
        if (currentIndex === -1) return;
        
        // 獲取上一篇和下一篇文章
        const prevPost = currentIndex > 0 ? data.posts[currentIndex - 1] : null;
        const nextPost = currentIndex < data.posts.length - 1 ? data.posts[currentIndex + 1] : null;
        
        // 生成導航HTML
        const navigationHTML = `
            <nav class="article-navigation">
                <a href="${prevPost?.url || '#'}" class="nav-prev" ${!prevPost ? 'style="visibility: hidden;"' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>
                        <small>上一篇</small>
                        <strong>${prevPost?.title || ''}</strong>
                    </span>
                </a>
                <a href="${nextPost?.url || '#'}" class="nav-next" ${!nextPost ? 'style="visibility: hidden;"' : ''}>
                    <span>
                        <small>下一篇</small>
                        <strong>${nextPost?.title || ''}</strong>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </nav>
        `;
        
        // 插入導航到頁面中
        const articleFooter = document.querySelector('.article-footer');
        articleFooter.insertAdjacentHTML('beforeend', navigationHTML);
        
    } catch (error) {
        console.error('Error loading article navigation:', error);
    }
}

// 當頁面載入完成時初始化導航
document.addEventListener('DOMContentLoaded', initializeArticleNavigation); 