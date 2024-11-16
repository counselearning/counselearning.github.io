// 測驗題目
const questions = [
    "1. 感覺緊張不安",
    "2. 感覺憂鬱、心情低落",
    "3. 感覺容易苦惱或動怒",
    "4. 感覺睡眠困難",
    "5. 感覺不如別人",
    "6. 有自殺的想法"
];

// 初始化變數
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);
let prevAnswers = new Array(questions.length).fill(null);

// DOM 元素
const progressBar = document.getElementById('progress');
const questionCounter = document.getElementById('question-counter');
const currentQuestionElement = document.getElementById('current-question');
const prevButton = document.getElementById('prev-button');
const options = document.querySelectorAll('.option');
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results');

// 更新進度條和問題顯示
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionCounter.textContent = `題目 ${currentQuestion + 1}/${questions.length}`;
}

// ���示當前問題
function showQuestion() {
    currentQuestionElement.textContent = questions[currentQuestion];
    updateProgress();
    
    // 更新選項的選中狀態
    options.forEach(option => {
        option.classList.remove('selected');
        if (answers[currentQuestion] === parseInt(option.dataset.value)) {
            option.classList.add('selected');
        }
    });

    // 控制上一題按鈕的顯示
    prevButton.style.display = currentQuestion > 0 ? 'block' : 'none';
}

// 計算結果
function calculateResults() {
    const totalScore = answers.slice(0, 5).reduce((sum, score) => sum + score, 0);
    const suicidalThought = answers[5];
    
    let resultHTML = `
        <div class="scores-container">
            <h2>心理健康評估結果</h2>
            
            <div class="score-item">
                <div class="score-header">
                    <span class="dimension-name">心理困擾程度（前五題總分）</span>
                    <span class="score-value">${totalScore} / 20</span>
                </div>
                <div class="score-bar-container">
                    <div class="score-bar" style="width: ${(totalScore / 20) * 100}%"></div>
                </div>
            </div>

            <div class="result-interpretation">
                <h3>評估結果說明</h3>
                ${getInterpretation(totalScore, suicidalThought)}
            </div>

            <div class="help-resources">
                <h4>協助資源</h4>
                <div class="help-line">
                    <span class="help-line-number">1925</span>
                    <span>全國自殺防治專線（24小時免付費專線）</span>
                </div>
                <div class="help-line">
                    <span class="help-line-number">1995</span>
                    <span>生命線協談專線</span>
                </div>
                <div class="help-line">
                    <span class="help-line-number">1980</span>
                    <span>張老師專線</span>
                </div>
            </div>

            <button class="retake-btn" onclick="location.reload()">重新測驗</button>
            
            <div class="citation">
                註：本測驗結果僅供參考，不能取代專業醫療診斷。<br>
                若您有任何困擾，建議尋求專業醫療協助。
            </div>
        </div>
    `;
    
    return resultHTML;
}

// 結果解釋
function getInterpretation(totalScore, suicidalThought) {
    let interpretation = '<p>';
    
    // 定義不同程度的顏色（保持暖色調）
    const levelColors = {
        good: '#7A9D54',      // 柔和的綠色
        mild: '#CF9F5D',      // 溫暖的黃棕色
        moderate: '#C1666B',  // 溫暖的粉紅色
        severe: '#B4161B'     // 深紅色
    };
    
    // 總分解釋
    if (totalScore <= 5) {
        interpretation += `<strong style="color: ${levelColors.good}; font-size: 1.2em;">心理健康狀況良好</strong><br>`;
        interpretation += '您的心理健康狀況良好，壓力程度在正常範圍內。建議持續保持良好的生活作息，維持身心健康。';
    } else if (totalScore <= 9) {
        interpretation += `<strong style="color: ${levelColors.mild}; font-size: 1.2em;">輕度情緒困擾</strong><br>`;
        interpretation += '您有輕度的情緒困擾，建議多關注自己的心理健康，適時放鬆心情，培養正向的休閒活動。';
    } else if (totalScore <= 14) {
        interpretation += `<strong style="color: ${levelColors.moderate}; font-size: 1.2em;">中度情緒困擾</strong><br>`;
        interpretation += '您有中度的情緒困擾，建議尋求心理諮商協助，學習更好的壓力調適方式。';
    } else {
        interpretation += `<strong style="color: ${levelColors.severe}; font-size: 1.2em;">明顯情緒困擾</strong><br>`;
        interpretation += '您目前有明顯的情緒困擾，強烈建議尋求專業醫療協助，及時處理您的心理健康問題。';
    }
    
    interpretation += '</p>';
    
    // 自殺意念評估
    if (suicidalThought >= 2) {
        interpretation += `<p class="warning"><strong style="color: ${levelColors.severe}">重要提醒：</strong>由於您在自殺意念題項的分數較高，強烈建議立即尋求專業協助。您可以撥打1925專線，會有專業人員全天候為您提供協助。</p>`;
    } else if (suicidalThought === 1) {
        interpretation += '<p>建議您持續關注自己的心理狀態，如有需要可以尋求專業諮詢協助。</p>';
    }
    
    return interpretation;
}

// 事件監聽器
options.forEach(option => {
    option.addEventListener('click', () => {
        // 儲存答案
        answers[currentQuestion] = parseInt(option.dataset.value);
        
        // 移除其他選項的選中狀態
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // 延遲後進入下一題或顯示結果
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion();
            } else {
                questionContainer.style.display = 'none';
                resultsContainer.style.display = 'block';
                resultsContainer.innerHTML = calculateResults();
            }
        }, 300);
    });
});

// 上一題按鈕事件
prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

// 初始化顯示第一題
showQuestion(); 