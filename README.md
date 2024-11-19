# 雲端心理測驗平台

這是一個提供各種心理測驗的網站平台，採用現代化的設計風格，注重使用者體驗和視覺美感。

## 設計規範

### 色彩系統
主要使用溫暖的棕色系配色，創造親和且專業的氛圍： 
css
:root {
--primary-color: #A17A69; / 暖棕色：主要按鈕、重點文字 /
--secondary-color: #D4B2A7; / 淺暖棕：次要元素、hover 狀態 /
--background-color: #FAF6F3; / 米白色：背景色 /
--text-color: #2C1810; / 深棕色：主要文字 /
--hover-color: #8B6355; / 深暖棕：hover 效果 /
}

### 排版規則
- 容器寬度：最大 1200px，響應式設計使用 `min(90%, max-width)`
- 內邊距：使用 `clamp()` 確保響應式間距
- 字體大小：
  - 標題：`clamp(28px, 5vw, 36px)`
  - 正文：`clamp(16px, 3vw, 18px)`
  - 小字：`clamp(14px, 2.5vw, 16px)`

### 視覺元素
1. **圓角設計**
   - 大元素（卡片）：24px
   - 中等元素（按鈕）：12px
   - 小元素：8px

2. **陰影效果**
   - 卡片：`box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05)`
   - 懸浮狀態：`box-shadow: 0 14px 40px rgba(0, 0, 0, 0.12)`
   - 按鈕：`box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)`

3. **動畫效果**
   - 過渡時間：0.3s
   - 緩動函數：`cubic-bezier(0.4, 0, 0.2, 1)`
   - hover 效果：適當的位移和陰影變化

### 字體系統
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;

## 組件規範

### 1. 導航欄
- 固定在頂部
- 半透明背景配合 blur 效果
- Logo 動畫效果
- 響應式設計適應不同螢幕尺寸

### 2. 測驗卡片
- 白色背景
- 圓角設計
- 懸浮效果
- 包含：標題、描述、測驗信息（時長、題數）

### 3. 按鈕樣式
- 主要按鈕：實心背景 + 白色文字
- 次要按鈕：半透明背景 + 主色文字
- 統一的懸浮和點擊效果

### 4. 提示文字
- 使用 `strong` 標籤強調重要文字
- 適當的透明度區分主次關係
- 合理的行高確保可讀性

## 新增測驗模組指南

1. **檔案結構**
README.md
/test-name/
├── index.html    # 單一測驗頁面（包含介紹頁和測驗內容）
├── styles.css    # 測驗樣式
└── script.js     # 測驗邏輯

2. **頁面結構**
html
<div class="container">
<!-- 入口頁面 -->
<section id="intro" class="section">
<h1>測驗名稱</h1>
<div class="description">測驗說明...</div>
<button id="startTest" class="start-btn">開始測驗</button>
</section>
<!-- 測驗頁面 -->
<section id="test" class="section hidden">
<div class="progress-bar">
<div class="progress-fill"></div>
</div>
<!-- 測驗內容 -->
</section>
<!-- 結果頁面 -->
<section id="result" class="section hidden">
<!-- 結果內容 -->
</section>
</div>

3. **必要元素**
- 返回首頁按鈕
- 測驗說明（在入口頁面）
- 進度指示器（在測驗頁面）
- 結果頁面
- 引用來源（如適用）
- 重新測驗按鈕（在結果頁面）

4. **頁面切換邏輯**
- 使用 CSS class 控制頁面顯示/隱藏
- 透過 JavaScript 事件控制頁面轉換
- 確保單向流程：入口頁 -> 測驗頁 -> 結果頁
- 提供適當的轉場動畫

5. **注意事項**
- 保持與現有設計風格一致
- 確保響應式設計
- 添加適當的載入和過渡動畫
- 保持無障礙設計原則
- 避免使用多個 HTML 檔案
- 使用 section 標籤區分不同頁面內容

## 開發原則

1. **效能優化**
- 使用 CSS 變數方便維護
- 最小化 JavaScript 依賴
- 優化圖片和資源載入

2. **可訪問性**
- 適當的顏色對比度
- 合理的標籤結構
- 鍵盤導航支援

3. **瀏覽器兼容**
- 支援主流現代瀏覽器
- 提供適當的 fallback 方案
- 使用 vendor prefix 確保兼容性

## 維護指南

1. **代碼更新**
- 遵循現有的命名規範
- 保持 CSS 結構的一致性
- 適當註釋重要的邏輯部分

2. **版本控制**
- 使用語義化版本號
- 記錄所有重要更改
- 定期檢查和更新依賴

3. **測試要求**
- 跨瀏覽器測試
- 響應式設計測試
- 使用者體驗測試
