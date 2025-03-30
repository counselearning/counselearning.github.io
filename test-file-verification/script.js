document.addEventListener('DOMContentLoaded', function() {
    // 從 JSON 檔案中讀取公鑰和簽名資料
    let publicKeyData = null;
    let signatureData = null;

    // 讀取 JSON 檔案
    async function loadKeyAndSignature() {
        try {
            const response = await fetch('keys-signatures.json');
            const data = await response.json();
            publicKeyData = data.publicKey;
            signatureData = data.signatures;
        } catch (error) {
            console.error('讀取 JSON 檔案時發生錯誤:', error);
            alert('讀取驗證資料時發生錯誤，請稍後再試。');
        }
    }

    // 獲取DOM元素
    const introDom = document.getElementById('intro');
    const verificationDom = document.getElementById('verification');
    const resultDom = document.getElementById('result');
    const startVerificationBtn = document.getElementById('startVerification');
    const backToIntroBtn = document.getElementById('backToIntro');
    const verifyBtn = document.getElementById('verifyBtn');
    const verifyAnotherBtn = document.getElementById('verifyAnother');
    const backToHomeBtn = document.getElementById('backToHome');
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    const selectedFileInfo = document.getElementById('selectedFileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeFileBtn = document.getElementById('removeFileBtn');
    const loadingResult = document.getElementById('loadingResult');
    const successResult = document.getElementById('successResult');
    const failResult = document.getElementById('failResult');
    const verifiedFileName = document.getElementById('verifiedFileName');
    const verifiedFileSize = document.getElementById('verifiedFileSize');
    const signatureTime = document.getElementById('signatureTime');
    const errorMessage = document.getElementById('errorMessage');
    const signerName = document.getElementById('signerName');
    const signerEmail = document.getElementById('signerEmail');
    const signatureDate = document.getElementById('signatureDate');
    const signerKeyId = document.getElementById('signerKeyId');
    const fileTypeInfo = document.getElementById('fileTypeInfo');
    const fileDescription = document.getElementById('fileDescription');
    const fileTypeRadios = document.querySelectorAll('input[name="fileType"]');

    // 當前選擇的文件
    let selectedFile = null;

    // 頁面切換函數
    function showSection(section) {
        [introDom, verificationDom, resultDom].forEach(elem => {
            elem.classList.add('hidden');
        });
        section.classList.remove('hidden');
    }

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
        else return (bytes / 1073741824).toFixed(2) + ' GB';
    }

    // 格式化日期時間
    function formatDateTime(date) {
        return new Date(date).toLocaleString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // 顯示選擇的文件信息
    function displayFileInfo(file) {
        selectedFile = file;
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        selectedFileInfo.classList.remove('hidden');
        verifyBtn.disabled = false;
    }

    // 清除已選擇的文件
    function clearFileSelection() {
        selectedFile = null;
        fileInput.value = '';
        selectedFileInfo.classList.add('hidden');
        verifyBtn.disabled = true;
    }

    // 從 Base64 轉換成 Uint8Array
    function base64ToUint8Array(base64) {
        try {
            // 清理 Base64 字串
            const cleanBase64 = base64
                .replace(/[\n\r\s\t]/g, '') // 移除換行符和空白
                .replace(/[^A-Za-z0-9+/=]/g, ''); // 只保留有效的 Base64 字元

            // 確保字串長度是 4 的倍數
            const padding = cleanBase64.length % 4;
            const paddedBase64 = padding ? 
                cleanBase64 + '='.repeat(4 - padding) : 
                cleanBase64;

            const binaryString = atob(paddedBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes;
        } catch (error) {
            console.error('Base64 解碼錯誤:', error);
            throw new Error('簽名資料格式錯誤，無法進行驗證');
        }
    }

    // 文件驗證函數
    async function verifyFile() {
        // 顯示載入中狀態
        showSection(resultDom);
        loadingResult.classList.remove('hidden');
        successResult.classList.add('hidden');
        failResult.classList.add('hidden');

        try {
            // 讀取檔案
            const fileArrayBuffer = await readFileAsArrayBuffer(selectedFile);
            const fileUint8Array = new Uint8Array(fileArrayBuffer);
            
            // 準備簽名資料
            const signatureUint8Array = base64ToUint8Array(signatureData.mp3.data);
            
            try {
                // 使用 OpenPGP.js 進行驗證
                const publicKey = await openpgp.readKey({ armoredKey: publicKeyData.key });
                
                const signature = await openpgp.readSignature({
                    binarySignature: signatureUint8Array
                });
                
                const verificationResult = await openpgp.verify({
                    message: await openpgp.createMessage({ binary: fileUint8Array }),
                    signature: signature,
                    verificationKeys: publicKey
                });
                
                // 處理驗證結果
                const { verified, keyID } = verificationResult.signatures[0];
                
                // 等待驗證完成
                const valid = await verified;
                
                // 隱藏載入狀態
                loadingResult.classList.add('hidden');
                
                if (valid) {
                    // 顯示成功結果
                    successResult.classList.remove('hidden');
                    verifiedFileName.textContent = selectedFile.name;
                    verifiedFileSize.textContent = formatFileSize(selectedFile.size);
                    signatureTime.textContent = formatDateTime(new Date());
                    
                    // 顯示檔案類型與描述
                    const fileTypeLabels = {
                        'mp3': '音頻檔案 (MP3)',
                        'pdf': '文件檔案 (PDF)'
                    };
                    
                    fileTypeInfo.textContent = fileTypeLabels[signatureData.mp3.type] || signatureData.mp3.type.toUpperCase();
                    fileDescription.textContent = signatureData.mp3.name || '無描述';
                    
                    // 顯示簽名者資訊
                    // 從公鑰中獲取用戶資訊
                    let signerNameValue = "未知";
                    let signerEmailValue = "未知";
                    
                    // 嘗試從公鑰中獲取用戶ID
                    if (publicKey.users && publicKey.users.length > 0) {
                        const user = publicKey.users[0];
                        const userId = user.userID;
                        
                        if (userId && userId.name) {
                            signerNameValue = userId.name;
                        }
                        
                        if (userId && userId.email) {
                            signerEmailValue = userId.email;
                        }
                    }
                    
                    // 獲取簽名日期 (嘗試多種方法)
                    let signatureDateValue = "未知";
                    try {
                        // 嘗試方法1：從簽名對象獲取
                        if (verificationResult.signatures[0].created) {
                            signatureDateValue = formatDateTime(verificationResult.signatures[0].created);
                        }
                        // 嘗試方法2：從簽名數據包獲取
                        else if (signature.packets && signature.packets.length > 0) {
                            for (const packet of signature.packets) {
                                if (packet.created) {
                                    signatureDateValue = formatDateTime(packet.created);
                                    break;
                                }
                            }
                        }
                        // 嘗試方法3：從原始簽名數據獲取 (需要更詳細的解析)
                        else {
                            console.log("無法從標準屬性中獲取簽名日期");
                            
                            // 輸出簽名對象的結構，以便調試
                            console.log("簽名對象:", signature);
                            console.log("驗證結果:", verificationResult);
                        }
                    } catch (err) {
                        console.log("獲取簽名日期時出錯:", err);
                    }
                    
                    // 格式化金鑰ID
                    const keyIdHex = keyID.toHex();
                    
                    // 設置簽名者信息
                    signerName.textContent = signerNameValue;
                    signerEmail.textContent = signerEmailValue;
                    signatureDate.textContent = signatureDateValue;
                    signerKeyId.textContent = keyIdHex;
                } else {
                    // 顯示失敗結果
                    failResult.classList.remove('hidden');
                    errorMessage.textContent = '簽名驗證失敗，檔案可能已被篡改。';
                }
            } catch (err) {
                // 驗證過程出錯
                loadingResult.classList.add('hidden');
                failResult.classList.remove('hidden');
                errorMessage.textContent = `驗證過程出錯：${err.message}`;
                console.error('驗證錯誤:', err);
            }
        } catch (err) {
            // 檔案讀取出錯
            loadingResult.classList.add('hidden');
            failResult.classList.remove('hidden');
            errorMessage.textContent = `檔案讀取錯誤：${err.message}`;
            console.error('檔案讀取錯誤:', err);
        }
    }

    // 讀取文件為ArrayBuffer
    function readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => resolve(event.target.result);
            reader.onerror = error => reject(error);
            reader.readAsArrayBuffer(file);
        });
    }

    // 事件監聽器 - 開始驗證
    startVerificationBtn.addEventListener('click', () => {
        showSection(verificationDom);
    });

    // 事件監聽器 - 返回入口頁
    backToIntroBtn.addEventListener('click', () => {
        showSection(introDom);
    });

    // 事件監聽器 - 驗證按鈕
    verifyBtn.addEventListener('click', verifyFile);

    // 事件監聽器 - 驗證另一個文件
    verifyAnotherBtn.addEventListener('click', () => {
        clearFileSelection();
        showSection(verificationDom);
    });

    // 事件監聽器 - 返回首頁
    backToHomeBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    // 事件監聽器 - 文件類型選擇
    fileTypeRadios.forEach(radio => {
        radio.addEventListener('change', async () => {
            clearFileSelection();
            if (signatureData) {
                // 如果簽名資料已載入，則直接驗證
                verifyFile();
            } else {
                // 如果尚未載入簽名資料，則先載入
                await loadKeyAndSignature();
                verifyFile();
            }
        });
    });

    // 事件監聽器 - 文件選擇
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            displayFileInfo(file);
        }
    });

    // 事件監聽器 - 移除文件
    removeFileBtn.addEventListener('click', clearFileSelection);

    // 事件監聽器 - 拖放功能
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-over');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        if (file) {
            fileInput.files = e.dataTransfer.files;
            displayFileInfo(file);
        }
    }, false);

    // 點擊上傳區域觸發文件選擇
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // 初始化：載入公鑰和簽名資料
    loadKeyAndSignature();
}); 