document.addEventListener('DOMContentLoaded', function() {
    // 貼上您實際的 PGP 公鑰 (使用反引號包裹多行字符串)
    const PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBGfk0nUBCADIRsCH2T0LgNSuI0Z9YOXZVlPYAh9sBc3FYPn8kWXF32MoapKv
bEuBD9AnPb0BjfpfABoY2aOjgKjci69QnGAwpK6Pc+KdtM7SL+MLUZ5AS7Asd3MT
KY44LWlok74htWsiu3P3u5LICVQG1H9HCdB/3CZuqJeOIB9LlBDimxv13j6pAmKb
OFlvmtZ1/5FnXIpc4jkZj53tygfpX1BiviHGhNPhphn3E2PjMP4ukvVLi7aDtWVb
GI4rJ/vQ1sVLRonr/Qfv99ru41DscZoYCaERyAbQL1re5X7PVrfZrErCgsjzYUyT
iuoiYkXTv/yxed3nMZ9N2gmNjyMwU7b/9XfZABEBAAG0NuadjuWlleWuj+Wvpue/
kuW/g+eQhuW4qyA8ZzExMjE0MDEyQGdvLnV0YWlwZWkuZWR1LnR3PokBVwQTAQgA
QRYhBArf3i2LpJvbY0draxyQtLL3Yy8QBQJn5NJ1AhsDBQkSzqDLBQsJCAcCAiIC
BhUKCQgLAgQWAgMBAh4HAheAAAoJEByQtLL3Yy8Q1QAH/RKf/o11Fxt/gEZpQWCw
p11J3+GRWcPTLkV51eJyzfIiHNGtLLoPUlRvFd0zuQCTYJSyd3bvAoVhli6wHGiu
SKpYEu+KrhVGeL5xI6W5XIOw/aAUviwym5DbIEI+62GpcvYFebz84sxjW/2N0DQW
lCwCGNe0tTsp2IaoOkOo5lMOJRYLnHWNZYayt4wlIbW4FIGzr2tbsCuSxEu6QP1z
t5bXwVHf5pMK0YRT7rYjExwGDX7pKeI0ZNnn5jAM0YAlTesNjTlVgu1klxZje4aD
E1JURpCEQKCc4k8fdtjTQQldz2+7GP8FRw5HwIjzv1NC2QtutqBjNYya4IwGxUCB
qrO5AQ0EZ+TSdQEIAOvF/WrGMG23X5wj8sE+wi6fzYQqxv0ZGBQJ4EMcVOdbeD5L
Tl5+xXi2hrbgtowYRJwgD2jmDWuqoGiKR+UmuVw6BYAkBU0X2g/Kzp7uX3WG1tBB
2C4AVk8FUw504WGlefHL7NG/XXTbe3Caxgo0RfuOsDVK3qj/5Llqq4Z6QRuX4HQC
jwiLuDpPRbgA4g4lEnJhqRnqbcGCT6jK4RZ/spvoOf+mA29pZ/NeTvXQ3Ovih1K+
p1cRkGcUjta8e392Efey34rOoWoJI5ZQIwi5XT7slOTVxho3doE4MPw4isgW4G8T
UgNc1j2U+rMmvFUb/ULIbH865H5XxIiVeSGbx3kAEQEAAYkBPAQYAQgAJhYhBArf
3i2LpJvbY0draxyQtLL3Yy8QBQJn5NJ1AhsMBQkSzqDLAAoJEByQtLL3Yy8QjnwI
AKpFoop8nX2uhWygPL1AVQ6MgHWKENLdFV0ADniN8+XQm/ro3VdS2BcaeprtBt+C
+cogMiPPUu4o5OhOEdmjJcXryL7wdrUdFnHl14zW6C22wPvlyMtxXVp0xlcEG/gO
AL3K/+o29JPt6YYZiTyiKVhDoFpmkr+B8gE74hd83XqPv8DJe/RxnvOR9gjNq/MC
onk1s8b0n+FyCsbg194jK/7CUhASFNkv6miKS6LADzUrqdFddx73jeFjVMplMrWP
Hcw5PQUo8cqbolo4bVl/Kdo6kTs14aOhvy8axSJ3PEBF9NVzdfY7yHmbQSDqov24
eUIiAr4TavByjt4Y0F0SUKk=
=Knms
-----END PGP PUBLIC KEY BLOCK-----`;

    // 貼上您的 .sig 檔案的 Base64 編碼
    const SIGNATURE_DATA = "iQEzBAABCAAdFiEECt/eLYukm9tjR2trHJC0svdjLxAFAmfk09gACgkQHJC0svdjLxC4PggAhzKjM/pd/4pv7BYE7qXi0f7NYHbePDDkOfdIy9F9n3S3ZGE4QLTIRaw6knyzU3icbzD9s0U7ROOYY4C8n9/GL+GmxjDGnKO0Z/aRU9Ty+U/tbB7t6SzG2QBEAAVTXUWjsOM011cbwidm5L8LYIWl9C85Ug8dlE6BDeisaHxmTh3fi8Dy585jF8k5/AdFxW8j+3NfsNeQQWA5rOBtDn0IXm0BcgeFEaSIloInzn/+XNfREsyd8UD1t1vgPHQFGU3ebaiqwU3ny8S0Yr70wTCxwhNmvEJtQ5Uvla9+qWwbYCgdmQkdC8jk2T3uyHKarsuYGDFiDt5AgRT7ed+u2rUaIQ==";
    
    // 設定要驗證的檔案名
    const EXPECTED_FILENAME = "要驗證的檔案名稱.mp3"; // 例如："sample.mp3"

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
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
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
            const signatureUint8Array = base64ToUint8Array(SIGNATURE_DATA);
            
            try {
                // 使用 OpenPGP.js 進行驗證
                const publicKey = await openpgp.readKey({ armoredKey: PUBLIC_KEY });
                
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
}); 