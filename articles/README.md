# 文章系統說明文件

## 目錄結構 
/articles/
├── index.html # 文章列表頁面
├── article.css # 文章內容頁樣式
├── styles.css # 文章列表頁樣式
├── articles.js # 文章列表功能
├── data/
│ └── posts.json # 文章元數據
├── images/ # 文章圖片資源
│ └── .jpg # 文章封面圖等
└── posts/ # 文章內容頁面
└── .html # 個別文章頁面

## 新增文章流程

1. **準備文章內容**
   - 使用 `template.html` 作為模板
   - 確保內容格式正確（標題、段落、引用等）
   - 準備相關圖片資源

2. **更新 posts.json**
json
{
"id": "article-id", // 文章唯一識別碼，用於URL
"title": "文章標題",
"description": "文章簡介",
"category": "分類", // mental-health, psychological-tests, research-trends
"date": "YYYY-MM-DD",
"author": "作者名稱",
"tags": ["標籤1", "標籤2"],
"coverImage": "images/cover.jpg"
}

3. **文章圖片規範**
   - 封面圖片尺寸：1200x630px
   - 格式：JPG/PNG
   - 檔案大小：建議小於 300KB
   - 命名規則：`article-id-cover.jpg`

4. **SEO 設定**
   - 設定適當的 title 和 meta description
   - 確保圖片有適當的 alt 文字
   - 更新 sitemap.xml

## 文章分類
- 心理健康（mental-health）
- 心理測驗（psychological-tests）
- 研究趨勢（research-trends）

## 撰寫規範

### 標題層級
<h1>文章標題</h1>
<h2>主要段落標題</h2>
<h3>子段落標題</h3>
<h4>子子段落標題</h4>

### 內文格式
- 段落使用 `<p>` 標籤
- 重點文字使用 `<strong>` 標籤
- 列表使用 `<ul>` 或 `<ol>` 標籤

### 引用格式
<blockquote>
    <p>引用內容</p>
    <cite>來源</cite>
</blockquote>

## 文章導航功能

### 導航結構
文章頁面底部包含"上一篇"和"下一篇"導航，結構如下：
html
<nav class="article-navigation">
<a href="path/to/prev/article.html" class="nav-prev">
<svg><!-- 左箭頭圖標 --></svg>
<span>
<small>上一篇</small>
<strong>上一篇文章標題</strong>
</span>
</a>
<a href="path/to/next/article.html" class="nav-next">
<span>
<small>下一篇</small>
<strong>下一篇文章標題</strong>
</span>
<svg><!-- 右箭頭圖標 --></svg>
</a>
</nav>

### 導航規則
1. **順序安排**
   - 文章按發布日期排序（由新到舊）
   - 新文章將自動排在列表最前面
   - 較新的文章為"上一篇"
   - 較舊的文章為"下一篇"

2. **文章排序邏輯**
   - 在 posts.json 中，新文章應添加在陣列的開頭
   - 文章列表頁面會自動按照 posts.json 的順序顯示
   - 導航順序與 posts.json 中的順序一致

3. **特殊情況處理**
   - 最新文章（陣列第一篇）：隱藏"上一篇"按鈕
   - 最舊文章（陣列最後一篇）：隱藏"下一篇"按鈕
   - 使用 `style="visibility: hidden;"` 保持佈局一致

4. **連結設置**
   - 使用相對路徑：`../posts/article-name.html`
   - 確保路徑正確性
   - 保持一致的檔案命名規則

### 視覺設計規範
1. **按鈕樣式**
   - 背景色：白色
   - 懸停效果：使用 var(--secondary-color)
   - 圓角：0.5rem
   - 內邊距：1rem

2. **響應式設計**
   - 桌面：並排顯示
   - 移動端（<640px）：垂直堆疊
   - 最大寬度：45%（桌面）/100%（移動端）

3. **文字處理**
   - 標題過長時單行截斷
   - 使用 text-overflow: ellipsis
   - 保持適當的行高和間距

### 維護注意事項
1. **新增文章時**
   - 更新相鄰文章的導航連結
   - 檢查連結可用性
   - 確保標題正確顯示

2. **刪除文章時**
   - 更新受影響文章的導航連結
   - 移除斷開的連結
   - 重新建立導航關係

3. **修改文章時**
   - 標題變更需同步更新導航顯示
   - 確保 URL 結構保持不變
   - 測試導航功能完整性
   
## 維護注意事項

1. **文章更新**
   - 更新文章內容時保持 URL 不變
   - 在文章底部標註更新時間
   - 更新 posts.json 中的相關資訊

2. **圖片優化**
   - 使用適當的圖片壓縮工具
   - 提供適當的圖片替代文字
   - 考慮使用響應式圖片

3. **定期檢查**
   - 確保所有連結可用
   - 更新過時的內容
   - 檢查圖片是否正常顯示

4. **版本控制**
   - 重大更新時在文章底部標註版本資訊
   - 保留重要修改的歷史記錄

## 開發說明

1. **CSS 類別命名規範**
   - 使用語意化命名
   - 遵循 BEM 命名規範
   - 避免過度巢狀

2. **JavaScript 開發規範**
   - 使用 ES6+ 語法
   - 保持模組化
   - 適當的錯誤處理

3. **效能考量**
   - 最小化 CSS/JS 檔案
   - 優化圖片載入
   - 使用適當的快取策略

