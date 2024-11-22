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

