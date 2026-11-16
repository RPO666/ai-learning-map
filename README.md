# AI 學習地圖 — 第九週小專案

以「讓完全沒有 AI 基礎的人也能開始學習」為出發點的繁體中文互動式網站。

## 專案簡介（交作業可直接使用）

**專案名稱：** AI 學習地圖（AI Learning Atlas）

**專案目的：** 把 AI 領域常見的抽象名詞拆解成容易閱讀的學習卡，讓初學者能從生活類比與實際應用理解概念，並依自己的進度持續學習。網站收錄四大主題、13 個概念，提供搜尋、分類、詳細介紹與已學會進度標記。

**技術：** HTML、CSS、原生 JavaScript（ES Modules），不依賴後端與第三方框架，可以直接部署到 GitHub Pages。

## 網站頁面

- `index.html`：首頁、四條學習路線、概念卡片、搜尋、分類、進度條與詳情視窗。
- `guide.html`：網站使用指南、資料架構與 AI 後續擴充示範。

## 如何在自己的電腦開啟

> 因為 JavaScript 使用 ES Modules，**請不要直接雙擊 `index.html` 使用 `file://` 開啟**；部分瀏覽器會阻擋模組讀取。

1. 解壓縮專案，使用 VS Code 開啟 `ai-learning-map` 資料夾。
2. 在 VS Code 終端機或命令提示字元執行：

   ```bash
   python -m http.server 8000
   ```

   若電腦是 Windows 且 `python` 無法使用，可試 `py -m http.server 8000`。
3. 瀏覽器輸入 `http://localhost:8000/` 即可開啟首頁。
4. 如果暫時沒有 Python，也可使用 VS Code 的 Live Server 擴充套件提供本地伺服器。

## 如何部署到 GitHub Pages（免寫 Git 指令）

1. 登入 [GitHub](https://github.com/)，按右上角 `+` → `New repository`。
2. Repository name 輸入 `ai-learning-map`，Visibility 選 **Public**，按 `Create repository`。
3. 進入空白儲存庫，點 `uploading an existing file`（或 `Add file` → `Upload files`）。
4. **上傳解壓縮後 `ai-learning-map` 資料夾裡的全部檔案與子資料夾**。確認 `index.html`、`guide.html`、`AGENTS.md` 在儲存庫**最外層**，且 `styles/main.css`、`scripts/app.js`、`scripts/data.js` 目錄正確。不要把整個專案包到多一層子資料夾。
5. 輸入 commit 訊息，例如 `Initial AI learning atlas site`，按 `Commit changes`。
6. 進入 `Settings` → 左側 `Pages`，`Build and deployment` 的 `Source` 選 `Deploy from a branch`。
7. Branch 選 `main`，Folder 選 `/(root)`，按 `Save`。
8. 等 GitHub 部署完成後，在 `Settings` → `Pages` 找到網站連結。**常見格式：** `https://你的帳號.github.io/ai-learning-map/`。
9. 打開實際網址，測試首頁、使用指南、搜尋與進度功能；再把 **Repository 網址和 Pages 網址**放進交件內容。

提醒：GitHub Pages 發布可能不會立刻完成；請以 GitHub Pages 顯示的實際網址與部署狀態為準。公用儲存庫中的檔案可公開瀏覽，勿放 API key 或私密資訊。

GitHub 官方說明：
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## AGENTS.md 設計與重複使用性（交作業可直接使用）

本專案以 `AGENTS.md` 作為 AI 的專案操作手冊，明確記載專案目的、檔案結構、四大分類、統一的視覺設計、概念卡資料格式、修改流程與測試標準。未來只要把這份專案交給 AI 並要求先閱讀 `AGENTS.md`，AI 就能知道應該修改哪個檔案、不破壞哪些功能，以及完成後如何驗證。

**例子：** 要新增「API」概念卡時，AI 不必重新製作整個網站，只要依規範將物件加入 `scripts/data.js`，卡片就會自動出現在清單中，並保留既有搜尋、分類、詳情視窗和學習進度功能；再執行測試與更新變更紀錄。專案中已新增「RAG 檢索增強生成」作為依規則擴充的實例，詳見 `CHANGELOG.md`。

## 專案規則與測試

- AI 編輯規則：[AGENTS.md](./AGENTS.md)
- 修改紀錄：[CHANGELOG.md](./CHANGELOG.md)
- 結構測試：在根目錄執行 `node --test tests/check.mjs`
- 人工檢查：桌面和手機版、連結、搜尋、篩選、詳情視窗、進度保存。

## 交作業文字範例

```text
學校 學號 系級 姓名 AI學習地圖

1. 專案簡介
這次建立「AI 學習地圖」，以生活例子介紹 AI 相關概念，提供四個主題的學習卡、搜尋與進度紀錄功能，讓初學者可以循序漸進學習。

2. GitHub Repository 連結
https://github.com/你的GitHub帳號/ai-learning-map

3. 網頁連結
https://你的GitHub帳號.github.io/ai-learning-map/

4. AGENTS.md
https://github.com/你的GitHub帳號/ai-learning-map/blob/main/AGENTS.md

5. 如何讓 AI 持續完成？
我在 AGENTS.md 中訂出網站目的、目錄分工、視覺風格、卡片資料欄位、修改限制與測試流程。日後新增一個 AI 概念，只要照資料格式放進 scripts/data.js，就會自動套用原本的版型及互動功能，不用重做頁面；新增頁面也需沿用共用導覽、樣式及相對路徑，並在修改後執行測試、留下紀錄。因此這些規則能提高後續維護與擴充的一致性。
```

**注意：** 範例中的學校、學號、系級、姓名和 GitHub 帳號都需換成自己的資訊；GitHub 網址必須在實際建立儲存庫且啟用 Pages 後再確認，不能直接交占位文字。
