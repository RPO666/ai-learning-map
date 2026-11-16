/**
 * 內容唯一來源。新增概念時，請先閱讀專案根目錄 AGENTS.md。
 * id 為永久識別碼，發布後不得改動，否則既有 localStorage 進度會失效。
 */
export const CATEGORIES = ["基礎觀念", "模型架構", "模型效率", "工程實作"];

export const TOPICS = [
  {
    id: "ai-intro",
    title: "AI 人工智慧是什麼？",
    category: "基礎觀念",
    level: "入門",
    minutes: 4,
    summary: "讓電腦完成過去通常需要人類智慧才能完成的任務，像是辨識圖片或理解文字。",
    analogy: "想像你請一位數位助手幫忙分類照片、整理文字。AI 是這類技術與方法的總稱，不代表它像人一樣思考。",
    application: "手機語音助理、照片分類、推薦系統，以及客服自動回覆都可能使用 AI 技術。",
    takeaways: ["AI 是一個廣泛領域，不等於聊天機器人。", "AI 可以由不同方法實現，不一定要使用深度學習。", "判斷一個 AI 系統，要看它的任務、資料與限制。"],
    tags: ["AI", "人工智慧", "入門"]
  },
  {
    id: "machine-learning",
    title: "機器學習 Machine Learning",
    category: "基礎觀念",
    level: "入門",
    minutes: 5,
    summary: "不是把每條判斷規則寫死，而是讓程式從資料中學到可用的模式。",
    analogy: "教小朋友認蘋果：與其列出每個顏色與形狀的規則，不如給他看很多蘋果與其他水果的例子。",
    application: "垃圾郵件分類、預測房價、產品推薦，都可透過資料訓練模型來解決。",
    takeaways: ["訓練資料是用來讓模型學習的例子。", "模型學到的是統計模式，可能出錯或有偏差。", "驗證時要用沒參與訓練的資料測試表現。"],
    tags: ["ML", "資料", "訓練"]
  },
  {
    id: "deep-learning",
    title: "深度學習 Deep Learning",
    category: "基礎觀念",
    level: "入門",
    minutes: 5,
    summary: "一種使用多層神經網路學習資料表徵的機器學習方法。",
    analogy: "像分工合作：第一層找出簡單線條，後面的層逐步組合成形狀，最後協助辨識物體。",
    application: "影像辨識、語音轉文字與許多大型語言模型的核心技術，都屬於深度學習的應用。",
    takeaways: ["深度學習是機器學習的一部分。", "多層網路能從資料學習不同層次的特徵。", "它常需要較多資料和運算資源，但不是所有問題都一定更適合它。"],
    tags: ["DL", "神經網路", "多層"]
  },
  {
    id: "neural-network",
    title: "神經網路 Neural Network",
    category: "模型架構",
    level: "入門",
    minutes: 6,
    summary: "由許多可調整參數的計算單元組成，讓模型把輸入轉換成預測結果。",
    analogy: "像一條多站的加工線：每一站對訊息做一點運算，再傳給下一站，最後合成答案。",
    application: "手寫數字辨識、信用風險預測和聲音分類，都可以使用神經網路。",
    takeaways: ["權重是網路在訓練過程中調整的參數。", "每層會將上一層的資訊轉換成新的表示。", "訓練通常透過損失函數與梯度來更新權重。"],
    tags: ["NN", "權重", "訓練"]
  },
  {
    id: "cnn",
    title: "CNN 卷積神經網路",
    category: "模型架構",
    level: "進階",
    minutes: 7,
    summary: "透過可學習的局部濾波器來擷取影像中的特徵，常用於電腦視覺。",
    analogy: "想像拿著小小的放大鏡在照片上滑動，從每個區域找邊緣、紋理，再拼成整體判斷。",
    application: "辨識製造瑕疵、醫學影像分析、影像分類與物件偵測等。",
    takeaways: ["卷積核會在影像的不同位置重複使用。", "早期層常辨識簡單局部特徵，較深層可組合更複雜特徵。", "CNN 常見於影像任務，但也能應用於其他具有局部結構的資料。"],
    tags: ["CNN", "影像", "卷積"]
  },
  {
    id: "rnn",
    title: "RNN 循環神經網路",
    category: "模型架構",
    level: "進階",
    minutes: 6,
    summary: "依序處理資料，並把先前步驟的資訊帶到後面的步驟。",
    analogy: "聽故事時，你會記得前面幾句話，才有辦法理解後面一句在講什麼。",
    application: "時間序列分析、感測器訊號與傳統序列模型，都可能使用 RNN 或其變體。",
    takeaways: ["RNN 適合處理具有先後順序的資料。", "隱藏狀態用來傳遞先前步驟的資訊。", "長距離依賴可能難學習，LSTM 與 GRU 是常見改良。"],
    tags: ["RNN", "序列", "LSTM"]
  },
  {
    id: "transformer",
    title: "Transformer 與注意力",
    category: "模型架構",
    level: "進階",
    minutes: 8,
    summary: "利用注意力機制，讓模型評估序列中不同位置的資訊對彼此有多重要。",
    analogy: "讀一段文章時，遇到「它」這個字，你會回頭找它指的是哪個名詞；注意力機制也在評估字詞之間的關聯。",
    application: "機器翻譯、文字生成、文件理解，以及許多大型語言模型。",
    takeaways: ["Self-Attention 可以建立序列內不同位置的關聯。", "位置資訊很重要，因為詞語順序會影響意思。", "Transformer 不等於 ChatGPT；它是一類可用於不同模型的架構。"],
    tags: ["Transformer", "Attention", "LLM"]
  },
  {
    id: "quantization",
    title: "量化 Quantization",
    category: "模型效率",
    level: "入門",
    minutes: 6,
    summary: "用較少位元表示模型的權重或運算數值，降低記憶體或計算成本。",
    analogy: "原本記錄價格精確到小數點後六位，若某個情況只需要到整數，就能省下記錄空間。",
    application: "將模型從較高精度轉成 INT8 或 INT4，可能讓它更適合在記憶體有限的設備執行。",
    takeaways: ["INT8 通常用 8 位元來表示整數數值，INT4 則是 4 位元。", "量化能節省模型儲存空間，但速度提升取決於硬體與實作。", "精度可能下降，因此需要用資料評估量化後品質。"],
    tags: ["INT8", "INT4", "壓縮"]
  },
  {
    id: "pruning",
    title: "剪枝 Pruning",
    category: "模型效率",
    level: "入門",
    minutes: 5,
    summary: "移除模型裡較不重要的參數或結構，嘗試用更少資源完成相同任務。",
    analogy: "整理背包時，把很少用、又不影響旅行的物品拿掉，減輕重量。",
    application: "邊緣裝置部署或降低模型儲存需求；結構化剪枝還有機會改善實際推論效率。",
    takeaways: ["非結構化剪枝可能產生很多零值，卻不一定實際加速。", "結構化剪枝移除完整通道或區塊，通常更容易獲得硬體收益。", "剪枝後常需微調與重新評估模型表現。"],
    tags: ["Pruning", "壓縮", "稀疏"]
  },
  {
    id: "knowledge-distillation",
    title: "知識蒸餾 Distillation",
    category: "模型效率",
    level: "進階",
    minutes: 7,
    summary: "讓較小的學生模型學習較大的教師模型所提供的預測資訊或中間表示。",
    analogy: "老師不只公布考題答案，還提示哪些選項也很接近，學生可以從這些細節學到更多。",
    application: "把大型模型的能力部分轉移到輕量模型，讓手機或低功耗設備更容易部署。",
    takeaways: ["教師模型提供學習訊號，不代表學生會完全複製所有能力。", "軟標籤能反映不同答案之間的相對可能性。", "蒸餾仍需要訓練與驗證，需比較速度、資源與準確率。"],
    tags: ["Distillation", "Teacher", "Student"]
  },
  {
    id: "pytorch",
    title: "PyTorch 是什麼？",
    category: "工程實作",
    level: "入門",
    minutes: 5,
    summary: "用 Python 建立、訓練與測試機器學習模型的常見開源框架。",
    analogy: "要組家具，自己做每一顆螺絲很花時間；PyTorch 像工具箱，幫你準備好張量運算與自動微分。",
    application: "練習影像分類、實作神經網路、訓練與評估深度學習模型。",
    takeaways: ["Tensor 是 PyTorch 常用的多維資料容器。", "Autograd 可以協助計算梯度。", "訓練好的模型還要考慮匯出格式與部署環境。"],
    tags: ["PyTorch", "Python", "Tensor"]
  },
  {
    id: "edge-deployment",
    title: "邊緣部署 Edge AI",
    category: "工程實作",
    level: "進階",
    minutes: 7,
    summary: "讓 AI 模型在手機、嵌入式板子等靠近資料來源的設備上執行。",
    analogy: "不用每次遇到問題都寄信給遠方專家；讓裝在現場的小助手先做判斷，反應可能更快。",
    application: "智慧相機、工廠感測器、離線語音控制、Raspberry Pi 類型的邊緣設備。",
    takeaways: ["部署需要同時考慮模型大小、延遲、記憶體與耗電。", "量化或剪枝不保證在任何硬體上都更快。", "要在目標設備上量測，而非只看電腦上的模擬數字。"],
    tags: ["Edge AI", "部署", "Raspberry Pi"]
  },
  {
    // 依 AGENTS.md 新增的示範擴充項目；詳見 CHANGELOG.md。
    id: "rag",
    title: "RAG 檢索增強生成",
    category: "工程實作",
    level: "進階",
    minutes: 7,
    summary: "在生成回答前，先從指定資料來源找出相關內容，再讓語言模型參考它們作答。",
    analogy: "開卷考時，你先翻到相關課本段落再回答，而不是只靠腦中記得的資訊。",
    application: "公司內部文件問答、課程講義查詢、技術知識庫與客服文件助理。",
    takeaways: ["RAG 通常包含檢索與生成兩個主要步驟。", "檢索到的內容仍可能不完整或錯誤，回答需要核對來源。", "RAG 不等於重新訓練模型，常可在不更改模型權重的情況下使用。"],
    tags: ["RAG", "LLM", "檢索"]
  },
  {
    id: "ai-agent",
    title: "AI Agent 是什麼？",
    category: "工程實作",
    level: "入門",
    minutes: 5,
    summary: "能依照目標決定下一步、使用獲准工具執行任務，並根據結果調整做法的 AI 系統。",
    analogy: "像請助理規劃旅行：你給目的地與預算，助理分步查交通、比較住宿，再依查到的結果調整行程。但 AI 不像真人理解所有情況，仍可能判斷錯誤。",
    application: "行政人員整理會議時，可讓 AI Agent 在授權範圍內讀取會議紀錄、找出待辦事項、查詢行事曆並提出排程；寄信或更改行程前可設定由人確認。",
    takeaways: ["AI Agent 會依目標選擇步驟、執行動作，並根據結果決定是否調整或結束。", "一般問答型聊天機器人主要回覆訊息；AI Agent 還能透過工具採取行動，聊天介面也可以接上這類能力。", "AI Agent 能做什麼取決於工具與授權範圍，執行結果仍需核對，不能保證任務一定成功。"],
    tags: ["AI Agent", "智慧代理", "工具", "自動化"]
  }
];
