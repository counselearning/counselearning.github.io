document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const body = document.body;

    menuToggle.addEventListener('click', function() {
        siteNav.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // 更新 aria-expanded 狀態
        const isExpanded = siteNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // 點擊選單連結時關閉選單
    siteNav.addEventListener('click', function(event) {
        if (event.target.classList.contains('nav-link')) {
            siteNav.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // 點擊選單外部時關閉選單
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.site-header')) {
            siteNav.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}); 