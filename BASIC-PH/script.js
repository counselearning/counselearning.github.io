class AdventureTest {
    constructor() {
        this.currentStep = 0;
        this.answers = new Array(6).fill(null);
        this.dimensions = {
            'B': 0, // Belief
            'A': 0, // Affect
            'S': 0, // Social
            'I': 0, // Imagination
            'C': 0, // Cognition
            'PH': 0 // Physiological
        };
        
        // 故事內容
        this.story = [
            {
                text: "從前從前，有一位冒險者…",
                type: "intro",
                options: ["繼續"]
            },
            {
                text: "有一天，他/她…",
                options: [
                    { text: "聽到了一則令人憤怒的消息", dimension: "A" },
                    { text: "看到一位很需要幫助的村民", dimension: "S" },
                    { text: "收到了一則天上的神諭", dimension: "B" },
                    { text: "發現了一個進入森林的新捷徑", dimension: "C" },
                    { text: "進入了一個夢幻的奇幻世界", dimension: "I" },
                    { text: "在營地得到了充分的休息", dimension: "PH" }
                ]
            },
            {
                text: "於是，他/她…",
                options: [
                    { text: "思考如何完成目的，開始了冒險", dimension: "C" },
                    { text: "感到心情激動，開始了冒險", dimension: "A" },
                    { text: "想像旅程中會發生的事，開始了冒險", dimension: "I" },
                    { text: "活動身體蓄勢待發，開始了冒險", dimension: "PH" },
                    { text: "招募了一群夥伴，開始了冒險", dimension: "S" },
                    { text: "謹記自己的使命，開始了冒險", dimension: "B" }
                ]
            },
            {
                text: "後來，他/她遇到了一個危機，他/她決定...",
                options: [
                    { text: "運用創意，面對危機", dimension: "I" },
                    { text: "相信自己，面對危機", dimension: "B" },
                    { text: "思考策略，面對危機", dimension: "C" },
                    { text: "尋求協助，面對危機", dimension: "S" },
                    { text: "鼓勵自己，面對危機", dimension: "A" },
                    { text: "起身行動，面對危機", dimension: "PH" }
                ]
            },
            {
                text: "即使遇到許多挫折與挑戰，他/她...",
                options: [
                    { text: "仍然精力充沛、體力十足", dimension: "PH" },
                    { text: "仍然試圖從環境中找到解決方式", dimension: "S" },
                    { text: "仍然保持心態穩定", dimension: "A" },
                    { text: "仍然努力找出問題所在", dimension: "C" },
                    { text: "仍然嘗試不同新方法", dimension: "I" },
                    { text: "仍然堅定自己的目標", dimension: "B" }
                ]
            },
            {
                text: "最後，危機成功解除，他/她...",
                options: [
                    { text: "充滿成就感，滿足地結束了這次冒險", dimension: "A" },
                    { text: "感謝所有幫助自己的人，結束了這次冒險", dimension: "S" },
                    { text: "只想回家好好睡一覺，結束了這次冒險", dimension: "PH" },
                    { text: "想著如何避免危機再度發生，結束了這次冒險", dimension: "C" },
                    { text: "保護了許多人，結束了這次冒險", dimension: "B" },
                    { text: "在冒險中發現了獨特的新技能，結束了這次冒險", dimension: "I" }
                ]
            }
        ];

        // 職業說明
        this.professions = {
            'B': {
                title: '聖騎士',
                subTitle: '信念（Belief）',
                description: '你擁有堅定的信念、信仰或理想。面對挑戰時，這些信念、信仰或理想是你堅持面對困難並前進的動力。',
                examples: '#有志者事竟成　　#信心最重要　　#不放手直到夢想到手'
            },
            'A': {
                title: '吟遊詩人',
                subTitle: '情感（Affect）',
                description: '你善於表達和處理情感，能夠準確理解自己和他人的情緒。面對挑戰時，你往往先透過調節自身情感來面對挑戰。在壓力下，你會做一些能夠抒發情緒的事情。',
                examples: '#情緒對了做什麼都對　　#情緒不對都免談　　#善於情緒調節'
            },
            'S': {
                title: '商人',
                subTitle: '社會（Social）',
                description: '你具有出色的人際互動能力，善於建立和維護關係。面對挑戰時，你會尋求他人的支持與合作。在壓力下，你會與朋友相聚，吐吐苦水就是一種紓壓方式。',
                examples: '#人際關係很重要　　#喜歡聊天　　#你幫我我幫你'
            },
            'I': {
                title: '魔法師',
                subTitle: '想像力（Imagination）',
                description: '你富有創造力和想像力，能夠用獨特的方式看待事物。面對挑戰時，你常能運用想像力或創造力，突破框架並想出創新的解決方案。壓力下，你會想像事情的不同可能性。',
                examples: '#白日夢冒險王　　#創意無限　　#創新思維'
            },
            'C': {
                title: '賢者',
                subTitle: '認知（Cognition）',
                description: '你擅長分析問題和制定策略，喜歡用邏輯思維解決問題。面對挑戰時，你會仔細思考並尋找最佳解決方案。在壓力下，你會思考問題發生的原因。',
                examples: '#分析問題　　#真相只有一個　　#計畫通'
            },
            'PH': {
                title: '戰士',
                subTitle: '身體性（Physiological）',
                description: '你具有強大的行動力，善於通過身體活動來釋放壓力。面對挑戰時，你會起身行動，用實際行動解決問題。在壓力下，你會透過吃／喝／睡或是性來紓壓。',
                examples: '#心情不好吃東西　　#吃完東西去睡覺　　#一天一杯手搖飲'
            }
        };
    }

    initialize() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.introSection = document.getElementById('intro');
        this.testSection = document.getElementById('test');
        this.resultSection = document.getElementById('result');
        this.startButton = document.getElementById('startTest');
        this.prevButton = document.getElementById('prevQuestion');
        this.progressFill = document.querySelector('.progress-fill');
        this.questionCounter = document.querySelector('.question-counter');
        this.questionContainer = document.querySelector('.question-container');
    }

    bindEvents() {
        if (this.startButton) {
            this.startButton.addEventListener('click', () => this.startTest());
        }
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.previousStep());
        }
    }

    startTest() {
        this.introSection.style.display = 'none';
        this.testSection.style.display = 'block';
        this.showStep();
    }

    showStep() {
        const step = this.story[this.currentStep];
        
        // 先清空容器
        this.questionContainer.innerHTML = '';
        
        // 創建並添加題目元素
        const questionElement = document.createElement('div');
        questionElement.id = 'current-question';
        questionElement.setAttribute('role', 'heading');
        questionElement.setAttribute('aria-level', '2');
        questionElement.className = 'fade-in';
        questionElement.textContent = step.text;
        this.questionContainer.appendChild(questionElement);

        // 創建選項容器但先不顯示
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options';
        optionsContainer.style.opacity = '0';
        
        // 準備選項內容
        if (step.type === 'intro') {
            optionsContainer.innerHTML = `
                <button class="option continue-btn" data-value="continue">開始冒險故事</button>
            `;
        } else {
            optionsContainer.innerHTML = step.options.map((option, index) => `
                <button class="option" data-value="${index}" data-dimension="${option.dimension}">
                    ${option.text}
                </button>
            `).join('');
        }
        
        // 1秒後添加並顯示選項
        setTimeout(() => {
            this.questionContainer.appendChild(optionsContainer);
            // 使用 requestAnimationFrame 確保過渡效果正常運作
            requestAnimationFrame(() => {
                optionsContainer.style.opacity = '1';
                
                // 綁定選項點擊事件
                optionsContainer.querySelectorAll('.option').forEach(option => {
                    option.addEventListener('click', (e) => this.selectOption(e));
                });
            });
        }, 1000);

        this.updateProgress();
    }

    selectOption(event) {
        const button = event.target;
        
        if (button.classList.contains('continue-btn')) {
            this.currentStep++;
            this.showStep();
            return;
        }

        const dimension = button.dataset.dimension;
        this.answers[this.currentStep] = dimension;
        
        if (dimension) {
            this.dimensions[dimension]++;
        }

        setTimeout(() => {
            if (this.currentStep === this.story.length - 1) {
                this.showResult();
            } else {
                this.currentStep++;
                this.showStep();
            }
        }, 300);
    }

    getTopDimensions() {
        const sortedDimensions = Object.entries(this.dimensions)
            .sort((a, b) => b[1] - a[1]);
        
        return {
            primary: sortedDimensions[0][0],
            secondary: sortedDimensions[1][0]
        };
    }

    showResult() {
        const { primary, secondary } = this.getTopDimensions();
        const primaryProf = this.professions[primary];
        const secondaryProf = this.professions[secondary];

        this.resultSection.innerHTML = `
            <a href="index.html" class="close-button">×</a>
            <h2>你的冒險者復原力身分</h2>
            <div class="score-container">
                <div class="profession-wrapper primary">
                    <div class="profession-label">主職業</div>
                    <div class="profession-titles">
                        <div class="profession-title">${primaryProf.title}</div>
                        <div class="profession-subtitle">${primaryProf.subTitle}</div>
                    </div>
                    <div class="profession-description">
                        <p>${primaryProf.description}</p>
                        <p class="examples">${primaryProf.examples}</p>
                    </div>
                </div>
                <div class="profession-wrapper secondary">
                    <div class="profession-label">副職業</div>
                    <div class="profession-titles">
                        <div class="profession-title">${secondaryProf.title}</div>
                        <div class="profession-subtitle">${secondaryProf.subTitle}</div>
                    </div>
                    <div class="profession-description">
                        <p>${secondaryProf.description}</p>
                        <p class="examples">${secondaryProf.examples}</p>
                    </div>
                </div>
            </div>
            <button class="primary-button" onclick="location.reload()">重新測驗</button>
            <div class="result-note">
                <p>註：本測驗結果僅供參考，每個人都可能同時具備多種特質。</p>
                <p>資料來源：改編自 Mooli Lahad (2012)</p>
            </div>
        `;

        this.testSection.style.display = 'none';
        this.resultSection.style.display = 'block';
    }

    updateProgress() {
        if (this.currentStep === 0) {
            this.progressFill.style.width = '0%';
            this.questionCounter.textContent = '故事開始';
        } else {
            const progress = (this.currentStep / (this.story.length - 1)) * 100;
            this.progressFill.style.width = `${progress}%`;
            this.questionCounter.textContent = `故事進度 ${this.currentStep}/${this.story.length - 1}`;
        }
        
        this.prevButton.classList.toggle('hidden', this.currentStep === 0);
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            if (this.answers[this.currentStep]) {
                this.dimensions[this.answers[this.currentStep]]--;
                this.answers[this.currentStep] = null;
            }
            this.showStep();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const test = new AdventureTest();
    test.initialize();
}); 