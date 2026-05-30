<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>倉儲管理系統 (WMS) 與庫存最佳化 · 專題大屏</title>
  
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
      },
      svg: { fontCache: 'global' }
    };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

  <style>
    /* ── 🎨 日系櫻花蜜桃焦糖色調優雅 Token ── */
    :root {
      --bg-milk: #FDF6EE;          /* 溫柔牛奶基底色 */
      --bg-card: rgba(255, 255, 255, 0.9); /* 純白半透明卡片 */
      --border-soft: #FAF0E6;      /* 亞麻輕透邊框 */
      --sakura: #F9C8D0;           /* 核心櫻花粉 */
      --sakura-dark: #F0A8B5;      /* 玫瑰深櫻花 */
      --peach: #FDDAB4;            /* 蜜桃膚橘 */
      --peach-dark: #F8C59A;       /* 深蜜桃 */
      --caramel: #C8956C;          /* 焦糖木質調（重點點綴） */
      --text-dark: #3D2B1F;        /* 深濃茶字體 */
      --text-muted: #6E5340;       /* 淺茶字體 */
      
      --radius: 16px;
      --font: "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font);
      background-color: var(--bg-milk);
      color: var(--text-dark);
      line-height: 1.7;
      padding: 0;
    }

    /* 頂部主視覺 Banner */
    .hero-banner {
      background: linear-gradient(135deg, #FAF0E6 0%, var(--peach) 50%, var(--sakura) 100%);
      padding: 60px 20px;
      text-align: center;
      border-bottom: 3px solid var(--sakura-dark);
    }

    .hero-banner h1 {
      font-size: 2.6rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 10px;
      letter-spacing: 1px;
    }

    .hero-banner p {
      font-size: 1.2rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    /* 主容器 */
    .main-container {
      max-width: 1200px;
      margin: -30px auto 60px;
      padding: 0 20px;
    }

    /* 頂部中介資訊區塊 */
    .meta-card {
      background: var(--bg-card);
      border: 1px solid rgba(255, 255, 255, 0.7);
      border-radius: var(--radius);
      padding: 25px 35px;
      box-shadow: 0 10px 30px rgba(200, 149, 108, 0.08);
      backdrop-filter: blur(10px);
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 35px;
    }

    .meta-item {
      font-size: 0.95rem;
      color: var(--text-muted);
    }

    .meta-item strong {
      color: var(--caramel);
      display: block;
      font-size: 0.85rem;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    /* KPI 數據亮點區 */
    .kpi-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      margin-bottom: 40px;
    }

    .kpi-card {
      background: #fff;
      border: 1px solid var(--border-soft);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 6px 15px rgba(200, 149, 108, 0.04);
      transition: transform 0.2s;
    }

    .kpi-card:hover {
      transform: translateY(-3px);
      border-color: var(--sakura);
    }

    .kpi-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--caramel);
      margin-bottom: 4px;
    }

    .kpi-label {
      font-size: 0.9rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    /* 章節版面設定 */
    section {
      background: #fff;
      border-radius: var(--radius);
      padding: 40px;
      margin-bottom: 35px;
      box-shadow: 0 8px 25px rgba(200, 149, 108, 0.05);
      border: 1px solid var(--border-soft);
    }

    h2.section-title {
      font-size: 1.6rem;
      color: var(--text-dark);
      margin-bottom: 25px;
      border-bottom: 2px solid var(--peach);
      padding-bottom: 10px;
      display: flex;
      align-items: center;
    }

    h2.section-title::before {
      content: "🌸";
      margin-right: 10px;
      font-size: 1.3rem;
    }

    /* 網格與排版 */
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 30px;
    }

    .card {
      background: var(--bg-milk);
      border-radius: 12px;
      padding: 25px;
      border: 1px solid var(--peach);
    }

    .card h3 {
      color: var(--caramel);
      font-size: 1.2rem;
      margin-bottom: 15px;
    }

    /* 完美相容交叉比對表格 */
    .table-responsive {
      overflow-x: auto;
      margin-top: 15px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
    }

    th, td {
      padding: 14px 16px;
      text-align: left;
      font-size: 0.95rem;
      border-bottom: 1px solid var(--border-soft);
    }

    th {
      background-color: var(--peach);
      color: var(--text-dark);
      font-weight: 600;
    }

    tr:hover td {
      background-color: #FFFDF9;
    }

    /* 流程條樣式 */
    .step-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .step-node {
      display: flex;
      background: #fff;
      padding: 15px 20px;
      border-radius: 8px;
      border-left: 4px solid var(--sakura-dark);
      box-shadow: 0 2px 5px rgba(0,0,0,0.01);
    }

    .step-idx {
      background: var(--peach);
      color: var(--text-dark);
      font-weight: bold;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      flex-shrink: 0;
      font-size: 0.85rem;
    }

    /* 公式容器 */
    .math-card {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 15px 0;
      border: 1px dashed var(--caramel);
      overflow-x: auto;
    }

    /* 圖表框 */
    .chart-box {
      position: relative;
      height: 280px;
      width: 100%;
      margin-top: 15px;
    }

    /* 頁尾 */
    footer {
      background: #FAF0E6;
      text-align: center;
      padding: 35px 20px;
      color: var(--text-muted);
      font-size: 0.9rem;
      border-top: 1px solid var(--peach);
    }

    @media (max-width: 768px) {
      .hero-banner h1 { font-size: 2rem; }
      .grid-2 { grid-template-columns: 1fr; }
      section { padding: 25px; }
    }
  </style>
</head>
<body>

  <header class="hero-banner">
    <h1>倉儲管理系統 (WMS) 與庫存最佳化</h1>
    <p>結合零售電商倉儲實務與庫存最佳化 · 數據大屏展示</p>
  </header>

  <div class="main-container">
    
    <div class="meta-card">
      <div class="meta-item"><strong>專題作者</strong>陳玉鳳、洪依辰</div>
      <div class="meta-item"><strong>指導教授</strong>褚文明 教授</div>
      <div class="meta-item"><strong>發表單位</strong>勤益科大 行銷與流通管理系所</div>
      <div class="meta-item"><strong>系統版本</strong>v1.3.0 (2026 運維維護版)</div>
    </div>

    <div class="kpi-section">
      <div class="kpi-card"><div class="kpi-value">98.6%</div><div class="kpi-label">庫存準確率</div></div>
      <div class="kpi-card"><div class="kpi-value">8.4 次</div><div class="kpi-label">庫存週轉率 / 月</div></div>
      <div class="kpi-card"><div class="kpi-value">87%</div><div class="kpi-label">倉儲利用率</div></div>
      <div class="kpi-card"><div class="kpi-value">2.1%</div><div class="kpi-label">缺貨控制率</div></div>
      <div class="kpi-card"><div class="kpi-value">+35%</div><div class="kpi-label">揀貨效率提升</div></div>
    </div>

    <section>
      <h2 class="section-title">研究背景與 WMS 系統比對分析</h2>
      <p style="margin-bottom: 20px; color: var(--text-muted);">本研究因應 OMO 多通路電商與新零售爆量訂單的轉型趨勢，深入探討實體倉儲如何藉由智慧系統進行優化。以下是結合 SAP 與 EasyWare 等業界大廠邏輯的系統評比：</p>
      
      <div class="table-responsive">
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
              <td>AI 賦能循環動態即時盤點</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="section-title">WMS 系統核心六大標準作業流程</h2>
      <div class="step-list">
        <div class="step-node"><div class="step-idx">1</div><div><strong>資料建檔與系統初始化：</strong>建立商品主檔、供應商、使用者權限與核心 OMO 訂單參數結構。</div></div>
        <div class="step-node"><div class="step-idx">2</div><div><strong>進貨收貨與自動分配：</strong>收貨入庫掃碼，系統依據儲位演算法自動分派推薦的最佳上架儲位。</div></div>
        <div class="step-node"><div class="step-idx">3</div><div><strong>動態儲位管理：</strong>依據商品周轉特性進行高度動態化排列，極小化每日上架與巡倉路徑。</div></div>
        <div class="step-node"><div class="step-idx">4</div><div><strong>庫存管理與即時盤點：</strong>精確記錄每一次移庫、調撥，提供全自動循環盤點機制，確保帳實相符。</div></div>
        <div class="step-node"><div class="step-idx">5</div><div><strong>高效波次揀貨：</strong>系統根據訂單時效自動產生最佳化波次揀貨單，指引工作人員走最短動線。</div></div>
        <div class="step-node"><div class="step-idx">6</div><div><strong>打包包裝與出貨回傳：</strong>商品複驗與物流單產出，並將最新出貨狀態即時回傳至各大電商銷售渠道。</div></div>
      </div>
    </section>

    <section>
      <h2 class="section-title">庫存最佳化科學計量模型</h2>
      <div class="grid-2">
        <div class="card">
          <h3>1. 經濟訂購量 (EOQ)</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:10px;">平衡「訂購成本」與「持有成本」，計算出使總成本最低的最佳單次採購量。</p>
          <div class="math-card">
            $$EOQ = \sqrt{\frac{2DS}{H}}$$
          </div>
          <p style="font-size:0.85rem; color:var(--caramel);">★ $D$: 年需求量 · $S$: 單次訂購成本 · $H$: 單位年持有成本</p>
        </div>
        
        <div class="card">
          <h3>2. 安全庫存量 (Safety Stock)</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:10px;">考量市場需求與供應鏈前置時間的變動性，建立精準的斷鏈防範緩衝指標。</p>
          <div class="math-card">
            $$SS = Z \times \sqrt{L \cdot \sigma_D^2 + D^2 \cdot \sigma_L^2}$$
          </div>
          <p style="font-size:0.85rem; color:var(--caramel);">★ $Z$: 服務水準係數 · $L$: 平均前置時間 · $\sigma$: 變異標準差</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="section-title">專案效益與數據趨勢大屏</h2>
      <div class="grid-2">
        <div class="card">
          <h3>WMS 導入前後核心指標效益比對</h3>
          <div class="chart-box">
            <canvas id="wmsImpactChart"></canvas>
          </div>
        </div>
        <div class="card">
          <h3>庫存結構分佈比重 (ABC 分類法)</h3>
          <div class="chart-box">
            <canvas id="abcDistributionChart"></canvas>
          </div>
        </div>
      </div>
    </section>

  </div>

  <footer>
    <p>© 2026 國立勤益科技大學 行銷與流通管理系所 · 流通科技管理專題成果</p>
  </footer>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      
      // 1. 導入前後效益對比圖
      const ctxImpact = document.getElementById('wmsImpactChart').getContext('2d');
      new Chart(ctxImpact, {
        type: 'bar',
        data: {
          labels: ['揀貨時間(天)', '空間利用(%)', '出貨準確(%)', '帳實相符(%)'],
          datasets: [
            {
              label: '導入 WMS 前',
              data: [8.5, 35, 82, 79],
              backgroundColor: '#F0A8B5', // 深櫻花粉
              borderColor: '#E8A4A8',
              borderWidth: 1,
              borderRadius: 4
            },
            {
              label: '導入 WMS 後 (本專案成果)',
              data: [2.1, 58, 98.6, 98.6],
              backgroundColor: '#C8956C', // 焦糖木質調
              borderColor: '#3D2B1F',
              borderWidth: 1,
              borderRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: '#3D2B1F', font: { weight: '500' } } }
          },
          scales: {
            y: { beginAtZero: true, grid: { color: '#FAF0E6' }, ticks: { color: '#6E5340' } },
            x: { ticks: { color: '#6E5340' } }
          }
        }
      });

      // 2. ABC 庫存比重圓餅圖
      const ctxAbc = document.getElementById('abcDistributionChart').getContext('2d');
      new Chart(ctxAbc, {
        type: 'pie',
        data: {
          labels: ['A 類核心高值品 (75%)', 'B 類中度關注品 (18%)', 'C 類低值大批量 (7%)'],
          datasets: [{
            data: [75, 18, 7],
            backgroundColor: [
              '#F9C8D0', // 核心櫻花粉
              '#FDDAB4', // 蜜桃膚橘
              '#FAF0E6'  // 輕奶茶白
            ],
            borderColor: '#C8956C',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              position: 'bottom',
              labels: { color: '#3D2B1F', font: { weight: '500' } } 
            }
          }
        }
      });
      
    });
  </script>
</body>
</html>
