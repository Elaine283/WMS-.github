<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WMS 倉儲管理系統與庫存最佳化專題大屏</title>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

    <style>
        /* ==========================================================================
           🎨 日系櫻花蜜桃焦糖色調優雅變數 (完全適配現代零售電商視覺)
           ========================================================================== */
        :root {
            --bg-milk: #FDF6EE;
            --bg-light: #FAF0E6;
            --sakura: #F9C8D0;
            --sakura-dark: #F0A8B5;
            --peach: #FDDAB4;
            --peach-dark: #F8C59A;
            --rose: #E8A4A8;
            --caramel: #C8956C;
            --text-dark: #3D2B1F;
            --text-mid: #5C4033;
            --card-white: rgba(255, 255, 255, 0.85);
            --glass-bg: rgba(255, 255, 255, 0.45);
            --glass-border: rgba(255, 255, 255, 0.65);
        }

        body {
            font-family: "PingFang TC", "Microsoft JhengHei", sans-serif;
            line-height: 1.7;
            margin: 0;
            background-color: var(--bg-milk);
            color: var(--text-dark);
        }

        /* 頂部視覺區塊 */
        header {
            background: linear-gradient(135deg, var(--bg-light) 0%, var(--peach) 100%);
            padding: 60px 20px;
            text-align: center;
            border-bottom: 3px solid var(--sakura);
        }

        header h1 {
            color: var(--text-dark);
            font-size: 2.5rem;
            margin: 0 0 10px 0;
            font-weight: 700;
        }

        header p {
            color: var(--text-mid);
            font-size: 1.2rem;
            margin: 0;
            font-weight: 500;
        }

        /* 主容器 */
        .container {
            max-width: 1100px;
            margin: -30px auto 60px;
            background: var(--card-white);
            padding: 45px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(200, 149, 108, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
        }

        /* 專題基本資訊列表 (Hero Section 優化) */
        .hero-info-box {
            background-color: var(--glass-bg);
            border: 1px solid var(--sakura);
            padding: 25px;
            margin-bottom: 40px;
            border-radius: 14px;
        }

        .hero-info-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .hero-info-list li {
            font-size: 1rem;
            color: var(--text-mid);
        }

        .hero-info-list strong {
            color: var(--caramel);
        }

        /* 章節標題 */
        h2 {
            color: var(--text-dark);
            font-size: 1.8rem;
            border-bottom: 2px solid var(--peach);
            padding-bottom: 12px;
            margin-top: 45px;
            display: flex;
            align-items: center;
        }

        h2::before {
            content: "🌸";
            margin-right: 10px;
            font-size: 1.4rem;
        }

        h3 {
            color: var(--caramel);
            font-size: 1.3rem;
            margin-top: 25px;
        }

        /* 模組與卡片排版 */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }

        .card {
            background: #fff;
            padding: 25px;
            border-radius: 14px;
            border: 1px solid var(--bg-light);
            box-shadow: 0 6px 12px rgba(200, 149, 108, 0.05);
            transition: all 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            border-color: var(--sakura);
            box-shadow: 0 12px 20px rgba(249, 200, 208, 0.4);
        }

        /* 流程步驟樣式 */
        .flow-steps {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 20px;
        }

        .step-item {
            display: flex;
            align-items: flex-start;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid var(--caramel);
            box-shadow: 0 4px 6px rgba(0,0,0,0.01);
        }

        .step-number {
            background: var(--peach);
            color: var(--text-dark);
            font-weight: bold;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;
        }

        .step-content strong {
            color: var(--text-dark);
            display: block;
            margin-bottom: 4px;
        }

        /* 業界系統交叉比對表格 */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid var(--bg-light);
        }

        th {
            background-color: var(--peach);
            color: var(--text-dark);
            font-weight: 600;
        }

        tr:hover {
            background-color: var(--bg-milk);
        }

        /* 量化指標與標籤 */
        .tag-container {
            margin-top: 10px;
        }

        .tag {
            display: inline-block;
            background: var(--bg-light);
            color: var(--text-mid);
            padding: 5px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            margin: 4px;
            font-weight: 500;
            border: 1px solid var(--peach);
        }

        .ai-tag {
            background: var(--sakura);
            color: var(--text-dark);
            border: 1px solid var(--sakura-dark);
        }

        .formula-box {
            background: var(--bg-light);
            border: 1px solid var(--peach-dark);
            padding: 20px;
            border-radius: 10px;
            margin: 15px 0;
            overflow-x: auto;
        }

        /* 圖表容器 */
        .chart-container {
            position: relative;
            margin-top: 30px;
            height: 300px;
            width: 100%;
        }

        footer {
            text-align: center;
            padding: 40px;
            color: var(--text-mid);
            font-size: 0.9rem;
            background: var(--bg-light);
            border-top: 1px solid var(--peach);
        }

        @media (max-width: 768px) {
            .container { padding: 25px; margin-top: -15px; }
            header h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>

    <header>
        <h1 id="heroTitle">倉儲管理系統 (WMS) 與庫存最佳化</h1>
        <p>WMS · Inventory Optimization System 大屏展示</p>
    </header>

    <div class="container">
        
        <div class="hero-info-box">
            <ul class="hero-info-list">
                <li><strong>專題作者：</strong><span id="heroAuthor">陳玉鳳、洪依辰</span></li>
                <li><strong>指導教授：</strong><span id="heroAdvisor">褚文明 教授</span></li>
                <li><strong>發表系所：</strong><span id="heroDepartment">國立勤益科技大學 行銷與流通管理系所</span></li>
                <li><strong>研究科目：</strong><span id="heroSubject">流通科技管理</span></li>
                <li><strong>系統版本：</strong><span>v1.3.0</span></li>
            </ul>
        </div>

        <section>
            <h2>研究背景與 WMS 系統比對</h2>
            <p>本專題深入探討現代化倉儲在多通路零售（OMO）與電商爆單環境下的應對機制，結合 SAP、EasyWare 等業界大廠邏輯，交叉比對現代化 WMS 的核心價值與傳統模組之差異。</p>
            
            <table>
                <thead>
                    <tr>
                        <th>評比維度</th>
                        <th>傳統 WMS 庫存模組</th>
                        <th>電商 ERP 倉儲功能</th>
                        <th>現代 AI 賦能/雲端 WMS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>多通路整合</strong></td>
                        <td>獨立批次更新，易產生帳實不符</td>
                        <td>僅限自有平台，難以應對跨通路</td>
                        <td>即時 OMO 庫存同步，全面自動配發</td>
                    </tr>
                    <tr>
                        <td><strong>儲位指引</strong></td>
                        <td>人工憑經驗擺放</td>
                        <td>固定儲位，空間利用率低</td>
                        <td>動態儲位優化、動線最短路徑演算法</td>
                    </tr>
                    <tr>
                        <td><strong>盤點機制</strong></td>
                        <td>定期全面停工盤點</td>
                        <td>批次異動盤點</td>
                        <td>AI 赋能循環動態即時盤點</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section>
            <h2>WMS 核心作業流程與演算法融合</h2>
            <p>現代化倉儲的核心在於將實體物流轉化為高度精準的數位流，以下為本系統標準的六大自動化階段：</p>
            
            <div class="flow-steps">
                <div class="step-item">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <strong>資料建檔與系統初始化</strong>
                        建立商品、供應商、使用者權限與核心訂單主檔，設定系統底層參數。
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <strong>進貨收貨與自動分配</strong>
                        供應商送貨抵達 → 掃描條碼入庫 → 系統依儲位優化演算法自動分配推薦儲位，必要時執行進貨品檢與標籤列印。
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <strong>動態儲位管理</strong>
                        依據商品的周轉特性（如 ABC 分類法）與出貨頻率安排最佳儲位，最大化縮短每日揀貨動線。
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <strong>庫存管理與即時盤點</strong>
                        精確記錄每一次庫存異動，結合 AI 自動化稽核進行定期或即時動態盤點，確保帳實百分之百一致。
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <strong>高效出貨揀貨 (波次揀貨)</strong>
                        系統依據 OMO 訂單特性產生最佳化波次揀貨單，並透過演算法指引人員或 AGV 最短路徑進行作業。
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-number">6</div>
                    <div class="step-content">
                        <strong>打包包裝與出貨回傳</strong>
                        完成商品複驗與打包、自動產生物流單，並將最新出貨狀態即時回傳至各大電商平台與銷售通路。
                    </div>
                </div>
            </div>
        </section>

        <section>
            <h2>庫存最佳化科學計量模型</h2>
            <p>為了使經理人能進行精確的庫存決策，系統導入了三大必備的古典與現代控制量化指標：</p>
            
            <div class="grid">
                <div class="card">
                    <h3>1. 經濟訂購量 (EOQ)</h3>
                    <p>平衡「訂購成本」與「持有成本」，計算出使總成本最低的最佳單次訂購數量。</p>
                    <div class="formula-box">
                        $$EOQ = \sqrt{\frac{2DS}{H}}$$
                    </div>
                    <span class="tag">$D$: 年需求量</span> <span class="tag">$S$: 單次訂購成本</span> <span class="tag">$H$: 單位年持有成本</span>
                </div>
                
                <div class="card">
                    <h3>2. 安全庫存量 (Safety Stock)</h3>
                    <p>考量需求與前置時間的變動性，用以防範爆單或供應鏈斷鏈突發狀況的緩衝庫存。</p>
                    <div class="formula-box">
                        $$SS = Z \times \sqrt{L \cdot \sigma_D^2 + D^2 \cdot \sigma_L^2}$$
                    </div>
                    <span class="tag">$Z$: 服務水準係數</span> <span class="tag">$L$: 平均前置時間</span> <span class="tag">$\sigma$: 標準差變異</span>
                </div>
            </div>

            <h3>3. ABC 庫存分類管理法</h3>
            <p>系統依據庫存價值的累計貢獻度，動態劃分管控等級，實施差異化精細管理：</p>
            <div class="grid">
                <div class="card">
                    <h4>A 類商品 <span class="tag ai-tag">高價值/核心管控</span></h4>
                    <p>品項數約佔 10%-15%，但價值佔總庫存的 70%-80%。採取密集盤點與嚴格周轉追蹤。</p>
                </div>
                <div class="card">
                    <h4>B 類商品 <span class="tag">中度關注</span></h4>
                    <p>品項數約佔 20%-30%，價值佔比約 15%-20%。實施常規中等程度控制。</p>
                </div>
                <div class="card">
                    <h4>C 類商品 <span class="tag">簡化管理</span></h4>
                    <p>品項數高達 50%-70%，但價值僅佔 5%-10%。採取
