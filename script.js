const questions = [
    // 討好向度
    { id: 1, text: "在與他人的互動關係中，我常是委屈求全的一方。", dimension: "討好" },
    { id: 2, text: "我會想讓他人開心而隱藏自己的喜好或意見。", dimension: "討好" },
    { id: 3, text: "我不敢表達負面的情緒或感受，因為我擔心他人會不喜歡我。", dimension: "討好" },
    { id: 4, text: "我會不顧自己的需要，先去滿足他人。", dimension: "討好" },

    // 忍讓向度
    { id: 5, text: "為了避免與他人產生衝突，即使我是對的，我也會讓步。", dimension: "忍讓" },
    { id: 6, text: "為了關係或長遠的未來，我願意暫時忍讓。", dimension: "忍讓" },
    { id: 7, text: "當他人刺傷了我的心，我心裡雖然很在意，但口中卻會說沒關係。", dimension: "忍讓" },
    { id: 8, text: "他人認為我不對時，不管是否有理，我都會很快表達歉意，減少他人的不滿。", dimension: "忍讓" },

    // 指責護顏向度
    { id: 9, text: "當意見不同時，我會因為自己的意見比他人好，而批評他人。", dimension: "指責護顏" },
    { id: 10, text: "遇到讓我不滿意的事，我通常先責怪他人。", dimension: "指責護顏" },
    { id: 11, text: "當我不高興時，我會以強勢的態度要求他人配合我的想法或需求。", dimension: "指責護顏" },
    { id: 12, text: "他人不重視我，我通常會感到生氣而責怪他人。", dimension: "指責護顏" },
    { id: 13, text: "與人發生爭執時，即使我理虧，我也會在口頭上不甘示弱。", dimension: "指責護顏" },
    { id: 14, text: "當互動關係緊張時，我總覺得他人應該先讓步。", dimension: "指責護顏" },
    { id: 15, text: "我會因為面子掛不住而指責他人的不是。", dimension: "指責護顏" },

    // 重理向度
    { id: 16, text: "面對任何人，態度冷靜和理性回應是我一貫的作風。", dimension: "重理" },
    { id: 17, text: "我比較在意事情是否能解決，較少考慮人的感受。", dimension: "重理" },
    { id: 18, text: "我面對衝突和壓力時，會像電腦般聚焦在問題上，以求有效率地解決。", dimension: "重理" },

    // 證己向度
    { id: 19, text: "我常分析自己的意見給他人聽，以顯示我是有兩把刷子的人。", dimension: "證己" },
    { id: 20, text: "我說話會講究邏輯思考、理性思維，來顯示我是聰明、有智慧的人。", dimension: "證己" },
    { id: 21, text: "我說話常會引經據典，好讓人佩服我。", dimension: "證己" },

    // 打岔向度
    { id: 22, text: "當我的看法與他人不同時，我會故意忽略，假裝沒這回事。", dimension: "打岔" },
    { id: 23, text: "為了減少尷尬，我會說一些言不及義的話。", dimension: "打岔" },
    { id: 24, text: "當我不想理他人的時候，我會把自己放空。", dimension: "打岔" },

    // 迂迴向度
    { id: 25, text: "當關係或氣氛尷尬時，我會藉由談論其它事情來轉移話題。", dimension: "迂迴" },
    { id: 26, text: "當他人要求我無法接受時，我會顧左右而言他，以免產生衝突。", dimension: "迂迴" },
    { id: 27, text: "當我與他人意見不合時，我會雞同鴨講，不表明真正看法，來緩和氣氛。", dimension: "迂迴" },
    { id: 28, text: "在關係出現緊張情境時，我會裝作沒事，故做輕鬆狀。", dimension: "迂迴" },

    // 一致向度
    { id: 29, text: "在互動中發生問題時，我可以適時地向他人表達我內在的真實感受。", dimension: "一致" },
    { id: 30, text: "我接納我自己真實的面貌，期許自己是內外一致的人。", dimension: "一致" },
    { id: 31, text: "溝通時，我既會滿足自己的需要，同時也會顧及他人的立場。", dimension: "一致" },
    { id: 32, text: "與他人互動時，我可以考量他人和情境，適時地表達自己的感受與需要。", dimension: "一致" },

    // 圓融向度
    { id: 33, text: "我會透過尊重的態度，與他人討論雙方不同的期待。", dimension: "圓融" },
    { id: 34, text: "意見不同時，我會溝通，試著找到彼此都贊同的方式。", dimension: "圓融" },
    { id: 35, text: "即使我對他人有所不滿，我仍願意理解對方，與其協調，並調整自己。", dimension: "圓融" },
    { id: 36, text: "與人互動時，我會看到自己的不足，面對它，並且從中提升自己。", dimension: "圓融" },
    { id: 37, text: "與人互動時，我可以欣賞及接納彼此之間的差異，並從中有所學習。", dimension: "圓融" }
];

class QuestionnaireManager {
    constructor() {
        this.questions = [...questions];
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.shuffledQuestions = this.shuffleQuestions();
        
        this.questionContainer = document.getElementById('current-question');
        this.progressBar = document.getElementById('progress');
        this.questionCounter = document.getElementById('question-counter');
        this.resultsDiv = document.getElementById('results');
        
        this.initializeOptions();
        this.showQuestion();
    }

    shuffleQuestions() {
        return this.questions
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    initializeOptions() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                // 移除其他選項的選中狀態
                options.forEach(opt => opt.classList.remove('selected'));
                // 添加當前選項的選中狀態
                option.classList.add('selected');
                
                // 短暫延遲後進入下一題，讓使用者能看到選中效果
                const value = parseInt(option.dataset.value);
                setTimeout(() => {
                    this.handleAnswer(value);
                    // 重置所有選項的選中狀態
                    options.forEach(opt => opt.classList.remove('selected'));
                }, 300);
            });
        });
    }

    showQuestion() {
        if (this.currentQuestionIndex < this.shuffledQuestions.length) {
            const question = this.shuffledQuestions[this.currentQuestionIndex];
            this.questionContainer.textContent = question.text;
            
            // 更新進度條
            const progress = ((this.currentQuestionIndex + 1) / this.shuffledQuestions.length) * 100;
            this.progressBar.style.width = `${progress}%`;
            this.questionCounter.textContent = `題目 ${this.currentQuestionIndex + 1}/37`;
        } else {
            this.showResults();
        }
    }

    handleAnswer(value) {
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        this.answers[currentQuestion.id] = {
            value: value,
            dimension: currentQuestion.dimension
        };
        
        this.currentQuestionIndex++;
        this.showQuestion();
    }

    showResults() {
        document.getElementById('question-container').style.display = 'none';
        this.resultsDiv.style.display = 'block';

        // 計算各向度的總分
        const dimensionScores = {};
        Object.values(this.answers).forEach(answer => {
            if (!dimensionScores[answer.dimension]) {
                dimensionScores[answer.dimension] = 0;
            }
            dimensionScores[answer.dimension] += answer.value;
        });

        // 定義各向度的最高分（題數 × 5分）
        const maxScores = {
            "討好": 20,    // 4題
            "忍讓": 20,    // 4題
            "指責護顏": 35,  // 7題
            "重理": 15,    // 3題
            "證己": 15,    // 3題
            "打岔": 15,    // 3題
            "迂迴": 20,    // 4題
            "一致": 20,    // 4題
            "圓融": 25     // 5題
        };

        // 定義各向度的解釋
        const dimensionExplanations = {
            "討好": "當面對比自己位階高、具權威性的人，如老師、家長、主管等，會抑制、隱藏個人意見，表現出與別人相似的行為，可能是受壓迫而產生犧牲、委屈，也可能是面對權威自認處於弱勢而自動投降，屬於較低自尊的表現。",
            "忍讓": "注重關係的和諧，即使自己抱持不同看法，也會因禮貌、想避免不合而迎合其他人。這樣的情況看似討好，但動機源自於顧及關係的忍讓，而非缺乏自信。",
            "指責護顏": "用命令、說服等方式強迫對方服從，可能源自於期望展現自身權力、位階，或是自己的自尊或面子，注重他人如何看待自己，因此發生衝突時，為了顧及顏面、名譽也會先將過錯推給對方，維護自己在其他人眼中的形象。",
            "重理": "有注重邏輯、前因後果等特質，但不代表沒有情緒，只是不依靠內在直覺表達、行事。然而，若當事人過於堅持自己的觀點、講求理性思考，沒有顧及對方的心情，表現出以理服人、據理力爭的行為，就超出單純理智的範圍。",
            "證己": "希望自己「有面子」，除了維護自己名譽、評價，也會主動做出提升個人評價的爭面子行為，例如，一再證明自己了解很多、證明能耐，這樣也會形成超理智的溝通方式。",
            "打岔": "遇到困難、壓力，可能傾向會選擇逃避，包括消極抵抗，以不合作、被動、怠工等行為，讓別人無法順利稱心如意，另一種為直接離開現場或讓人感到壓力的環境，而如果無法離開空間，有些人會選擇心理上的逃避，像是閉上眼睛、沉默、心不在焉等以應對種種壓力。",
            "迂迴": "常以委婉、攏統或模糊不清的方式溝通、想要以關係和諧為重。這種方式有時可以得到和諧的關係，有時卻會讓雙方的誤會難以被澄清。",
            "一致": "屬於內在的自我，期許能做自己、忠於自我，能發表自己的主張、看法，但也能夠顧及他人的需求，在自己和別人的關係中進行協調，為高自尊的展現。",
            "圓融": "屬於外在(關係)的自我，展現對自己的要求和修養，在人際互動中善盡自身義務，如在家重視家庭、在工作中重視與同事的關係，面對不同意見能溝通協調、彈性改變，也是高自尊的表現。"
        };

        // 計算並排序各向度的分數
        let dimensionScoresArray = Object.entries(dimensionScores).map(([dimension, score]) => ({
            dimension,
            score,
            percentage: Math.round((score / maxScores[dimension]) * 100)
        }));

        // 根據百分比排序
        dimensionScoresArray.sort((a, b) => b.percentage - a.percentage);

        // 顯示結果
        let resultsHTML = `
            <h2>測驗結果</h2>
            <div class="top-dimensions">
                <h3>您最突出的三個溝通特質：</h3>
                <div class="dimension-explanations">
                    ${dimensionScoresArray.slice(0, 3).map((item, index) => `
                        <div class="dimension-explanation">
                            <h4>${index + 1}. ${item.dimension}（${item.percentage}分）</h4>
                            <p>${dimensionExplanations[item.dimension]}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="scores-container">
        `;

        // 依序顯示各向度的得分
        for (const [dimension, score] of Object.entries(dimensionScores)) {
            const maxScore = maxScores[dimension];
            const percentage = Math.round((score / maxScore) * 100);
            
            resultsHTML += `
                <div class="score-item">
                    <div class="score-header">
                        <span class="dimension-name">${dimension}</span>
                        <span class="score-value">${percentage}分</span>
                    </div>
                    <div class="score-bar-container">
                        <div class="score-bar" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }

        resultsHTML += `
            </div>
            <button id="retakeBtn" class="retake-btn">再測一次</button>
            <div class="citation">
                此量表出自顏欣怡, & 卓紋君。（2020）。Satir 溝通姿態之反思暨台灣人人際溝通量表之修訂。中華心理衛生學刊，33(4)，381-415。
                <a href="https://www.airitilibrary.com/Article/Detail/10237283-202012-202101040003-202101040003-381-415" target="_blank">原文連結</a>
                <br><br>
                ※有關於問卷填寫，由於問卷常模仍然在建置當中，量表分數的解釋偏向教育性質，而非臨床診斷。希望問卷的這些解釋可以幫助你對自己有更多的認識。
            </div>
            <div class="all-dimensions-explanation">
                <h3>各向度說明</h3>
                <div class="dimension-grid">
                    <div class="dimension-card">
                        <h4>討好</h4>
                        <p>${dimensionExplanations["討好"]}</p>
                    </div>
                    <div class="dimension-card">
                        <h4>忍讓</h4>
                        <p>${dimensionExplanations["忍讓"]}</p>
                    </div>
                    <div class="dimension-card">
                        <h4>指責護顏</h4>
                        <p>${dimensionExplanations["指責護顏"]}</p>
                    </div>
                    <div class="dimension-card">
                        <h4>重理</h4>
                        <p>${dimensionExplanations["重理"]}</p>
                    </div>
                    <div class="dimension-card">
                        <h4>證己</h4>
                        <p>${dimensionExplanations["證己"]}</p>
                    </div>
                    <div class="dimension-card">
                        <h4>打岔</h4>
                        <p>${dimensionExplanations["打岔"]}</p>
                    </div>
                    <div class="dimension-card">
                        <h4>迂迴</h4>
                        <p>${dimensionExplanations["迂迴"]}</p>
                    </div>
                    <div class="dimension-card">
                        <h4>一致</h4>
                        <p>${dimensionExplanations["一致"]}</p>
                    </div>
                    <div class="dimension-card">
                        <h4>圓融</h4>
                        <p>${dimensionExplanations["圓融"]}</p>
                    </div>
                </div>
            </div>
        `;
        
        this.resultsDiv.innerHTML = resultsHTML;

        // 修改 CSS 樣式
        const style = document.createElement('style');
        style.textContent = `
            .top-dimensions {
                margin: 20px 0;
                padding: 20px;
                background: #f5f5f5;
                border-radius: 8px;
            }
            .dimension-explanations {
                margin-top: 15px;
            }
            .dimension-explanation {
                margin-bottom: 20px;
            }
            .dimension-explanation h4 {
                color: #333;
                margin-bottom: 8px;
            }
            .dimension-explanation p {
                color: #666;
                line-height: 1.6;
            }
            .all-dimensions-explanation {
                margin: 40px 0;
                padding: 20px;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
            }

            .all-dimensions-explanation h3 {
                color: #333;
                margin-bottom: 20px;
                text-align: center;
            }

            .dimension-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                padding: 10px;
            }

            .dimension-card {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }

            .dimension-card h4 {
                color: var(--primary-color);
                margin-bottom: 10px;
                font-size: 18px;
            }

            .dimension-card p {
                color: #666;
                line-height: 1.6;
                font-size: 15px;
            }
        `;
        document.head.appendChild(style);

        // 為重新測驗按鈕添加事件監聽
        document.getElementById('retakeBtn').addEventListener('click', () => {
            this.retakeQuiz();
        });
    }

    // 添加重新測驗方法
    retakeQuiz() {
        // 重置所有狀態
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.shuffledQuestions = this.shuffleQuestions();
        
        // 重置顯示
        document.getElementById('question-container').style.display = 'block';
        this.resultsDiv.style.display = 'none';
        this.progressBar.style.width = '0%';
        this.questionCounter.textContent = '題目 1/37';
        
        // 顯示第一題
        this.showQuestion();
    }
}

// 當頁面載入完成後初始化問卷
document.addEventListener('DOMContentLoaded', () => {
    new QuestionnaireManager();
});
