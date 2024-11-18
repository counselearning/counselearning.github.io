class PSSTest {
    constructor() {
        this.questions = [
            "一些無法預期的事情發生而感到心煩意亂",
            "感覺無法控制自己生活中重要的事情",
            "感到緊張不安和壓力",
            "成功地處理惱人的生活麻煩",
            "感到自己是有效地處理生活中所發生的重要改變",
            "對於有能力處理自己私人的問題感到很有信心",
            "感到事情順心如意",
            "發現自己無法處理所有自己必須做的事情",
            "有辦法控制生活中惱人的事情",
            "常覺得自己是駕馭事情的主人",
            "常生氣，因為很多事情的發生是超出自己所能控制的",
            "經常想到有些事情是自己必須完成的",
            "常能掌握時間安排方式",
            "常感到困難的事情堆積如山，而自己無法克服它們"
        ];
        
        this.currentQuestion = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.positiveQuestions = [3, 4, 5, 6, 8, 9, 12]; // 正向題目的索引（從0開始）
        
        // 新增快取機制
        this.cache = {
            elements: {},
            results: {}
        };
    }

    initialize() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        // 頁面區段
        this.introSection = document.querySelector('.content');
        this.testSection = document.getElementById('test');
        this.resultSection = document.getElementById('result');
        
        // 按鈕
        this.startButton = document.getElementById('startTest');
        this.prevButton = document.getElementById('prevQuestion');
        
        // 其他元素
        this.progressFill = document.querySelector('.progress-fill');
        this.questionCounter = document.querySelector('.question-counter');
        this.questionContainer = document.querySelector('.question-container');
    }

    bindEvents() {
        if (this.startButton) {
            this.startButton.addEventListener('click', () => this.startTest());
        }
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.previousQuestion());
        }
        
        // 新增鍵盤導航
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('test').style.display === 'block') {
                if (e.key === 'ArrowLeft' && this.currentQuestion > 0) {
                    this.previousQuestion();
                } else if (e.key >= '1' && e.key <= '5') {
                    const value = parseInt(e.key) - 1;
                    const options = this.questionContainer.querySelectorAll('.option');
                    if (options[value]) {
                        options[value].click();
                    }
                }
            }
        });
    }

    startTest() {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('test').style.display = 'block';
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        this.questionContainer.innerHTML = `
            <div id="current-question" role="heading" aria-level="2">${question}</div>
            <div class="options" role="radiogroup" aria-label="選項">
                <button class="option" data-value="0" role="radio" aria-checked="false">從不</button>
                <button class="option" data-value="1" role="radio" aria-checked="false">偶爾</button>
                <button class="option" data-value="2" role="radio" aria-checked="false">有時</button>
                <button class="option" data-value="3" role="radio" aria-checked="false">時常</button>
                <button class="option" data-value="4" role="radio" aria-checked="false">總是</button>
            </div>
        `;

        // 更新已選答案的狀態
        if (this.answers[this.currentQuestion] !== null) {
            const selectedOption = this.questionContainer.querySelector(
                `.option[data-value="${this.answers[this.currentQuestion]}"]`
            );
            if (selectedOption) {
                selectedOption.classList.add('selected');
                selectedOption.setAttribute('aria-checked', 'true');
            }
        }

        // 綁定選項點擊事件
        this.questionContainer.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (e) => this.selectOption(e));
        });

        this.updateProgress();
    }

    selectOption(event) {
        const selectedValue = parseInt(event.target.dataset.value);
        this.answers[this.currentQuestion] = selectedValue;
        
        // 更新選項樣式
        this.questionContainer.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        event.target.classList.add('selected');

        // 自動進入下一題
        setTimeout(() => {
            if (this.currentQuestion === this.questions.length - 1) {
                this.showResult();
            } else {
                this.currentQuestion++;
                this.showQuestion();
            }
        }, 300); // 300ms 延遲，讓使用者能看到選中效果
    }

    calculateScore() {
        const cacheKey = this.answers.join(',');
        if (this.cache.results[cacheKey]) {
            return this.cache.results[cacheKey];
        }

        let totalScore = 0;
        this.answers.forEach((answer, index) => {
            if (this.positiveQuestions.includes(index)) {
                totalScore += 4 - answer;
            } else {
                totalScore += answer;
            }
        });

        this.cache.results[cacheKey] = totalScore;
        return totalScore;
    }

    getResultText(score) {
        const resultRanges = [
            { max: 28, text: "您的壓力程度屬於正常範圍。" },
            { max: 42, text: "您的壓力程度偏大，建議適當注意調節。" },
            { max: Infinity, text: "您的壓力程度較高，建議尋求專業協助。" }
        ];

        return resultRanges.find(range => score <= range.max).text;
    }

    showResult() {
        const score = this.calculateScore();
        const resultText = this.getResultText(score);
        const resultLevel = this.getResultLevel(score);
        
        this.resultSection.innerHTML = `
            <a href="index.html" class="close-button">×</a>
            <h1>測驗結果</h1>
            <div class="score-container">
                <div class="score-wrapper">
                    <div class="score-label">壓力指數</div>
                    <div class="score ${resultLevel.className}">${score}</div>
                    <div class="score-range">${resultLevel.range}</div>
                </div>
                <div class="result-detail">
                    <h3 class="result-title">${resultLevel.title}</h3>
                    <p class="result-text">${resultText}</p>
                    <div class="result-suggestions">
                        ${resultLevel.suggestions.map(suggestion => 
                            `<div class="suggestion-item">
                                <span class="suggestion-icon">💡</span>
                                <span>${suggestion}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <button class="primary-button" onclick="location.reload()">重新測驗</button>
            <div class="result-note">
                <p>註：本測驗結果僅供參考，如有需要請諮詢專業醫師或心理師。</p>
                <p>資料來源：Cohen, S., Kamarck, T., & Mermelstein, R. (1983)</p>
            </div>
        `;
        
        document.getElementById('test').style.display = 'none';
        document.getElementById('result').style.display = 'block';
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.questionCounter.textContent = `題目 ${this.currentQuestion + 1}/${this.questions.length}`;
        
        // 只更新上一題按鈕狀態
        this.prevButton.classList.toggle('hidden', this.currentQuestion === 0);
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    getResultLevel(score) {
        if (score <= 28) {
            return {
                className: 'score-normal',
                range: '0-28',
                title: '壓力程度正常',
                text: '您的壓力程度屬於正常範圍。',
                suggestions: [
                    '保持良好的生活作息',
                    '持續培養興趣愛好',
                    '維持規律運動習慣'
                ]
            };
        } else if (score <= 42) {
            return {
                className: 'score-warning',
                range: '29-42',
                title: '壓力程度偏高',
                text: '您的壓力程度偏大，建議適當注意調節。',
                suggestions: [
                    '學習放鬆技巧如深呼吸',
                    '與親友分享心情',
                    '適度調整工作節奏'
                ]
            };
        } else {
            return {
                className: 'score-danger',
                range: '43+',
                title: '壓力程度過高',
                text: '您的壓力程度較高，建議尋求專業協助。',
                suggestions: [
                    '建議尋求心理諮商協助',
                    '重新檢視生活步調',
                    '加強自我照顧能力'
                ]
            };
        }
    }
}

// 當頁面載入完成後初始化測驗
document.addEventListener('DOMContentLoaded', () => {
    const test = new PSSTest();
    test.initialize();
}); 