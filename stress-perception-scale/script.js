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
    }

    startTest() {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('test').style.display = 'block';
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        this.questionContainer.innerHTML = `
            <div id="current-question">${question}</div>
            <div class="options">
                <button class="option" data-value="0">從不</button>
                <button class="option" data-value="1">偶爾</button>
                <button class="option" data-value="2">有時</button>
                <button class="option" data-value="3">時常</button>
                <button class="option" data-value="4">總是</button>
            </div>
        `;

        // 設置已選答案
        if (this.answers[this.currentQuestion] !== null) {
            const selectedOption = this.questionContainer.querySelector(
                `.option[data-value="${this.answers[this.currentQuestion]}"]`
            );
            if (selectedOption) selectedOption.classList.add('selected');
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
        let totalScore = 0;
        this.answers.forEach((answer, index) => {
            if (this.positiveQuestions.includes(index)) {
                // 正向題目反向計分
                totalScore += 4 - answer;
            } else {
                // 負向題目正向計分
                totalScore += answer;
            }
        });
        return totalScore;
    }

    getResultText(score) {
        if (score <= 28) {
            return "您的壓力程度屬於正常範圍。";
        } else if (score <= 42) {
            return "您的壓力程度偏大，建議適當注意調節。";
        } else {
            return "您的壓力程度較高，建議尋求專業協助。";
        }
    }

    showResult() {
        const score = this.calculateScore();
        const resultText = this.getResultText(score);
        
        this.resultSection.innerHTML = `
            <h2>測驗結果</h2>
            <div class="score-container">
                <div class="score">${score}</div>
                <p class="result-text">${resultText}</p>
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
}

// 當頁面載入完成後初始化測驗
document.addEventListener('DOMContentLoaded', () => {
    const test = new PSSTest();
    test.initialize();
}); 