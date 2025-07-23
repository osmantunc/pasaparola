class PasaparolaGame {
    constructor() {
        this.wordsByLetter = new Map();
        this.currentGameWords = [];
        this.score = 0;
        this.points = 0; // Toplam puan
        this.pointsPerQuestion = 10; // Her soru 10 puan
        this.totalQuestions = 0;
        this.currentQuestionIndex = 0;
        this.gameActive = false;
        this.isNormalMode = false;
        this.questionTimer = null;
        this.timeLeft = 20;
        this.timeLimit = 20; // 20 saniye zaman sınırı
        
        this.initializeElements();
        this.attachEventListeners();
        this.initializeMemoryManagement();
        this.registerServiceWorker();
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(function(err) {
                        console.log('ServiceWorker registration failed: ', err);
                    });
            });
        }
    }
    
    initializeElements() {
        this.elements = {
            wordFile: document.getElementById('wordFile'),
            loadFile: document.getElementById('loadFile'),
            saveToMemory: document.getElementById('saveToMemory'),
            privacyLevel: document.getElementById('privacyLevel'),
            listName: document.getElementById('listName'),
            savedListSelect: document.getElementById('savedListSelect'),
            loadSavedList: document.getElementById('loadSavedList'),
            deleteSavedList: document.getElementById('deleteSavedList'),
            normalMode: document.getElementById('normalMode'),
            mixedMode: document.getElementById('mixedMode'),
            questionCount: document.getElementById('questionCount'),
            gameInfo: document.getElementById('gameInfo'),
            questionArea: document.getElementById('questionArea'),
            currentQuestion: document.getElementById('currentQuestion'),
            answerInput: document.getElementById('answerInput'),
            submitAnswer: document.getElementById('submitAnswer'),
            scoreText: document.getElementById('scoreText'),
            pointsText: document.getElementById('pointsText'),
            showStats: document.getElementById('showStats'),
            resetGame: document.getElementById('resetGame'),
            helpBtn: document.getElementById('helpBtn'),
            modal: document.getElementById('modal'),
            modalTitle: document.getElementById('modalTitle'),
            modalText: document.getElementById('modalText'),
            modalOk: document.getElementById('modalOk'),
            closeModal: document.querySelector('.close'),
            timerDisplay: document.getElementById('timerDisplay')
        };
    }
    
    attachEventListeners() {
        this.elements.loadFile.addEventListener('click', () => this.loadWordsFromFile());
        this.elements.loadSavedList.addEventListener('click', () => this.loadSavedWordList());
        this.elements.deleteSavedList.addEventListener('click', () => this.deleteSavedWordList());
        this.elements.normalMode.addEventListener('click', () => this.startNormalGame());
        this.elements.mixedMode.addEventListener('click', () => this.startMixedGame());
        this.elements.submitAnswer.addEventListener('click', () => this.submitAnswer());
        
        // Memory save checkbox
        this.elements.saveToMemory.addEventListener('change', () => {
            const isChecked = this.elements.saveToMemory.checked;
            this.elements.privacyLevel.disabled = !isChecked;
            this.elements.listName.disabled = !isChecked;
        });
        
        // Saved list selection
        this.elements.savedListSelect.addEventListener('change', () => {
            const hasSelection = this.elements.savedListSelect.value !== '';
            this.elements.loadSavedList.disabled = !hasSelection;
            this.elements.deleteSavedList.disabled = !hasSelection;
        });
        this.elements.showStats.addEventListener('click', () => this.showStatistics());
        this.elements.resetGame.addEventListener('click', () => this.resetGame());
        this.elements.helpBtn.addEventListener('click', () => this.showHelp());
        
        // Enter tuşu ile cevap gönderme
        this.elements.answerInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
        
        // Modal kapatma
        this.elements.closeModal.addEventListener('click', () => this.closeModal());
        this.elements.modalOk.addEventListener('click', () => this.closeModal());
        this.elements.modal.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) {
                this.closeModal();
            }
        });
    }
    
    async loadWordsFromFile() {
        const file = this.elements.wordFile.files[0];
        if (!file) {
            this.showMessage('Hata', 'Lütfen bir dosya seçin!');
            return;
        }
        
        try {
            let text;
            const fileName = file.name.toLowerCase();
            
            if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
                // Word dosyası işleme
                text = await this.readWordFile(file);
            } else {
                // Text/CSV dosyası işleme
                text = await file.text();
            }
            
            this.parseWordsFromText(text, file.name);
            
            console.log(`Loaded ${this.wordsByLetter.size} letters with words`);
            this.wordsByLetter.forEach((words, letter) => {
                console.log(`Letter ${letter}: ${words.length} words`);
            });
            
            this.elements.gameInfo.textContent = 'Kelimeler başarıyla yüklendi!';
            this.elements.gameInfo.className = 'info-text success';
            
            // Oyun kontrollerini etkinleştir
            this.elements.normalMode.disabled = false;
            this.elements.mixedMode.disabled = false;
            this.elements.questionCount.disabled = false;
            this.elements.showStats.disabled = false;
            
            // Save to memory if requested
            this.saveWordListToMemory(text, file.name);
            
        } catch (error) {
            this.showMessage('Hata', 'Dosya okunamadı! Dosya formatını kontrol edin.');
            console.error('File reading error:', error);
        }
    }
    
    async readWordFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async function(event) {
                try {
                    const arrayBuffer = event.target.result;
                    
                    // Mammoth.js kullanarak Word dosyasını text'e çevir
                    const result = await mammoth.extractRawText({arrayBuffer: arrayBuffer});
                    const text = result.value;
                    
                    if (result.messages && result.messages.length > 0) {
                        console.warn('Word file conversion warnings:', result.messages);
                    }
                    
                    resolve(text);
                } catch (error) {
                    console.error('Error reading Word file:', error);
                    reject(new Error('Word dosyası okunamadı. Dosya bozuk olabilir.'));
                }
            };
            
            reader.onerror = function() {
                reject(new Error('Dosya okuma hatası'));
            };
            
            reader.readAsArrayBuffer(file);
        });
    }
    
    parseWordsFromText(text, filename) {
        this.wordsByLetter.clear();
        const lines = text.split('\n');
        
        const isCSV = filename.toLowerCase().includes('.csv');
        const isWord = filename.toLowerCase().includes('.doc');
        const fileType = isWord ? 'Word' : (isCSV ? 'CSV' : 'TXT');
        
        console.log(`Parsing ${fileType} file: ${filename}`);
        console.log(`Total lines: ${lines.length}`);
        
        // Word dosyası için özel işleme
        if (isWord) {
            this.parseWordDocumentText(text);
            return;
        }
        
        // Basit format kontrolü: eğer ilk satırda tab varsa horizontal format, yoksa vertical format
        const firstLine = lines[0] ? lines[0].trim() : '';
        const isHorizontalFormat = firstLine.includes('\t') || (isCSV && firstLine.includes('","'));
        
        console.log(`Format detected: ${isHorizontalFormat ? 'Horizontal' : 'Vertical'}`);
        
        if (isHorizontalFormat) {
            // Horizontal format: Her satır bir harf grubunu temsil eder
            lines.forEach((line, lineIndex) => {
                line = line.trim();
                if (!line) return;
                
                const letter = String.fromCharCode(97 + lineIndex); // a, b, c, ...
                if (lineIndex >= 26) return; // Z'den sonrasını işleme
                
                let cells = [];
                if (isCSV) {
                    cells = this.parseCsvLine(line);
                } else {
                    cells = line.split('\t').filter(cell => cell.trim());
                }
                
                console.log(`Line ${lineIndex} (${letter}): ${cells.length} words`);
                
                // Bu satırdaki tüm kelimeleri aynı harfe ekle
                cells.forEach(cell => {
                    if (cell.trim()) {
                        this.processWordCell(cell, letter);
                    }
                });
            });
        } else {
            // Vertical format: Her satır bir kelime, harfi otomatik belirle
            lines.forEach((line, lineIndex) => {
                line = line.trim();
                if (!line) return;
                
                console.log(`Processing line ${lineIndex}: ${line}`);
                
                // Kelimeyi ayrıştır
                const parts = line.split(',').map(p => p.trim());
                if (parts.length >= 2) {
                    const englishWord = parts[0];
                    const letter = englishWord.charAt(0).toLowerCase();
                    
                    console.log(`Word: ${englishWord} -> letter: ${letter}`);
                    this.processWordCell(line, letter);
                }
            });
        }
        
        console.log(`Final result: ${this.wordsByLetter.size} letters loaded`);
    }
    
    parseWordDocumentText(text) {
        console.log('Parsing Word document text...');
        
        // Word dosyasından çıkarılan text'i satırlara böl
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        
        console.log(`Word document lines: ${lines.length}`);
        
        // Her satırı kontrol et, kelime çiftlerini bul
        lines.forEach((line, index) => {
            // Satırda virgül, tab, veya boşlukla ayrılmış kelime çiftleri olabilir
            let parts = [];
            
            // Farklı ayırıcıları dene
            if (line.includes(',')) {
                parts = line.split(',').map(p => p.trim());
            } else if (line.includes('\t')) {
                parts = line.split('\t').map(p => p.trim());
            } else if (line.includes(' - ')) {
                parts = line.split(' - ').map(p => p.trim());
            } else if (line.includes(':')) {
                parts = line.split(':').map(p => p.trim());
            } else {
                // Boşluklarla ayrılmış iki kelime olabilir
                const words = line.split(/\s+/).filter(w => w.length > 0);
                if (words.length >= 2) {
                    parts = [words[0], words.slice(1).join(' ')];
                }
            }
            
            // Eğer iki part bulunduysa kelime çifti olarak işle
            if (parts.length >= 2 && parts[0] && parts[1]) {
                const englishWord = parts[0].trim();
                const turkishWord = parts[1].trim();
                
                if (englishWord && turkishWord) {
                    const letter = englishWord.charAt(0).toLowerCase();
                    this.processWordCell(`${englishWord},${turkishWord}`, letter);
                    console.log(`Word document: Added ${englishWord} -> ${turkishWord} (${letter})`);
                }
            }
        });
        
        console.log(`Word document parsed: ${this.wordsByLetter.size} letters loaded`);
    }
    
    parseCsvLine(line) {
        const cells = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                cells.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        if (current) {
            cells.push(current.trim());
        }
        
        return cells;
    }
    
    processWordCell(cell, letter) {
        // Tırnak işaretlerini temizle
        cell = cell.replace(/["""]/g, '').trim();
        
        // Virgülle böl: "apple,elma" -> ["apple", "elma"]
        const parts = cell.split(',').map(p => p.trim());
        
        if (parts.length >= 2) {
            const word = {
                english: parts[0],
                turkish: parts[1],
                firstLetter: letter
            };
            
            if (word.english && word.turkish) {
                if (!this.wordsByLetter.has(letter)) {
                    this.wordsByLetter.set(letter, []);
                }
                this.wordsByLetter.get(letter).push(word);
                console.log(`Added word: ${word.english} -> ${word.turkish} (${letter})`);
            }
        }
    }
    
    
    // Memory Management Functions
    initializeMemoryManagement() {
        this.loadSavedLists();
    }
    
    saveWordListToMemory(wordText, fileName) {
        if (!this.elements.saveToMemory.checked) return;
        
        const listName = this.elements.listName.value.trim() || fileName || 'Adsız Liste';
        const privacy = this.elements.privacyLevel.value;
        
        const savedLists = this.getSavedLists();
        
        // Check if list name already exists
        if (savedLists.some(list => list.name === listName)) {
            if (!confirm(`"${listName}" adında bir liste zaten var. Üzerine yazılsın mı?`)) {
                return;
            }
        }
        
        const listData = {
            id: Date.now().toString(),
            name: listName,
            privacy: privacy,
            content: wordText,
            createdAt: new Date().toISOString(),
            wordCount: wordText.split('\n').filter(line => line.trim().includes(',')).length
        };
        
        // Remove existing list with same name
        const filteredLists = savedLists.filter(list => list.name !== listName);
        filteredLists.push(listData);
        
        localStorage.setItem('pasaparolaWordLists', JSON.stringify(filteredLists));
        
        this.showMessage('Başarılı', `"${listName}" listesi ${privacy === 'private' ? 'özel' : 'genel'} olarak kaydedildi!`);
        this.loadSavedLists();
        
        // Clear form
        this.elements.saveToMemory.checked = false;
        this.elements.privacyLevel.disabled = true;
        this.elements.listName.disabled = true;
        this.elements.listName.value = '';
    }
    
    getSavedLists() {
        try {
            const saved = localStorage.getItem('pasaparolaWordLists');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading saved lists:', error);
            return [];
        }
    }
    
    loadSavedLists() {
        const savedLists = this.getSavedLists();
        const select = this.elements.savedListSelect;
        
        // Clear existing options except first
        select.innerHTML = '<option value="">Seçin...</option>';
        
        // Add saved lists
        savedLists.forEach(list => {
            const option = document.createElement('option');
            option.value = list.id;
            option.textContent = `${list.name} (${list.privacy === 'private' ? 'Özel' : 'Genel'}, ${list.wordCount} kelime)`;
            select.appendChild(option);
        });
        
        if (savedLists.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Henüz kayıtlı liste yok';
            option.disabled = true;
            select.appendChild(option);
        }
    }
    
    loadSavedWordList() {
        const selectedId = this.elements.savedListSelect.value;
        if (!selectedId) return;
        
        const savedLists = this.getSavedLists();
        const selectedList = savedLists.find(list => list.id === selectedId);
        
        if (!selectedList) {
            this.showMessage('Hata', 'Seçilen liste bulunamadı!');
            return;
        }
        
        try {
            // Load the saved content
            this.parseWordsFromText(selectedList.content, selectedList.name);
            
            if (this.wordsByLetter.size === 0) {
                this.showMessage('Hata', 'Listede geçerli kelime bulunamadı!');
                return;
            }
            
            this.elements.gameInfo.textContent = `"${selectedList.name}" listesi yüklendi! (${this.wordsByLetter.size} harf)`;
            this.elements.gameInfo.className = 'info-text success';
            
            // Enable game controls
            this.elements.normalMode.disabled = false;
            this.elements.mixedMode.disabled = false;
            this.elements.questionCount.disabled = false;
            this.elements.showStats.disabled = false;
            
        } catch (error) {
            this.showMessage('Hata', 'Liste yüklenirken hata oluştu!');
            console.error('Error loading saved list:', error);
        }
    }
    
    deleteSavedWordList() {
        const selectedId = this.elements.savedListSelect.value;
        if (!selectedId) return;
        
        const savedLists = this.getSavedLists();
        const selectedList = savedLists.find(list => list.id === selectedId);
        
        if (!selectedList) {
            this.showMessage('Hata', 'Seçilen liste bulunamadı!');
            return;
        }
        
        if (!confirm(`"${selectedList.name}" listesini silmek istediğinizden emin misiniz?`)) {
            return;
        }
        
        const filteredLists = savedLists.filter(list => list.id !== selectedId);
        localStorage.setItem('pasaparolaWordLists', JSON.stringify(filteredLists));
        
        this.showMessage('Başarılı', `"${selectedList.name}" listesi silindi!`);
        this.loadSavedLists();
        
        // Reset selection
        this.elements.savedListSelect.value = '';
        this.elements.loadSavedList.disabled = true;
        this.elements.deleteSavedList.disabled = true;
    }

    startNormalGame() {
        this.isNormalMode = true;
        this.currentGameWords = [];
        
        console.log('Starting Normal Game (A-Z)');
        
        // A'dan Z'ye kadar her harften rastgele bir kelime seç
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(97 + i); // a-z
            const words = this.wordsByLetter.get(letter);
            
            if (words && words.length > 0) {
                const randomIndex = Math.floor(Math.random() * words.length);
                const selectedWord = words[randomIndex];
                this.currentGameWords.push(selectedWord);
                console.log(`Letter ${letter.toUpperCase()}: Selected "${selectedWord.english}" from ${words.length} options`);
            } else {
                console.log(`Letter ${letter.toUpperCase()}: No words available`);
            }
        }
        
        if (this.currentGameWords.length === 0) {
            this.showMessage('Hata', 'Yeterli kelime bulunamadı!');
            return;
        }
        
        console.log(`Game ready with ${this.currentGameWords.length} words`);
        this.startGame();
    }
    
    startMixedGame() {
        this.isNormalMode = false;
        const questionCount = parseInt(this.elements.questionCount.value) || 10;
        
        // Tüm kelimelerden rastgele seç
        const allWords = [];
        this.wordsByLetter.forEach(words => {
            allWords.push(...words);
        });
        
        if (allWords.length === 0) {
            this.showMessage('Hata', 'Hiç kelime bulunamadı!');
            return;
        }
        
        this.currentGameWords = [];
        for (let i = 0; i < questionCount && i < allWords.length; i++) {
            const randomIndex = Math.floor(Math.random() * allWords.length);
            this.currentGameWords.push(allWords[randomIndex]);
            allWords.splice(randomIndex, 1); // Aynı kelimeyi tekrar seçmeyi önle
        }
        
        this.startGame();
    }
    
    startGame() {
        this.score = 0;
        this.points = 0; // Puanları sıfırla
        this.currentQuestionIndex = 0;
        this.totalQuestions = this.currentGameWords.length;
        this.gameActive = true;
        
        this.elements.questionArea.style.display = 'block';
        this.elements.answerInput.disabled = false;
        this.elements.submitAnswer.disabled = false;
        
        this.updateScore();
        this.showCurrentQuestion();
        this.elements.answerInput.focus();
    }
    
    showCurrentQuestion() {
        if (this.currentQuestionIndex >= this.currentGameWords.length) {
            this.endGame();
            return;
        }
        
        const currentWord = this.currentGameWords[this.currentQuestionIndex];
        this.elements.currentQuestion.textContent = `Türkçesi: ${currentWord.turkish}`;
        this.elements.answerInput.value = '';
        this.elements.answerInput.focus();
        
        // Harf bilgisini göster
        if (this.isNormalMode) {
            const letter = String.fromCharCode(65 + this.currentQuestionIndex); // A-Z
            this.elements.gameInfo.textContent = `${letter} harfi - Soru ${this.currentQuestionIndex + 1}/${this.totalQuestions} (${this.pointsPerQuestion} puan)`;
        } else {
            this.elements.gameInfo.textContent = `Soru ${this.currentQuestionIndex + 1}/${this.totalQuestions} (${this.pointsPerQuestion} puan)`;
        }
        
        // Timer'ı başlat
        this.startTimer();
    }
    
    startTimer() {
        // Önceki timer'ı temizle
        this.stopTimer();
        
        this.timeLeft = this.timeLimit;
        this.updateTimerDisplay();
        
        this.questionTimer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                // Süre doldu, otomatik olarak yanlış sayılsın ve sonraki soruya geç
                this.timeUp();
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
            this.questionTimer = null;
        }
    }
    
    updateTimerDisplay() {
        this.elements.timerDisplay.textContent = this.timeLeft;
        
        // Renk değişiklikleri
        if (this.timeLeft <= 5) {
            this.elements.timerDisplay.className = 'timer danger';
        } else if (this.timeLeft <= 10) {
            this.elements.timerDisplay.className = 'timer warning';
        } else {
            this.elements.timerDisplay.className = 'timer';
        }
    }
    
    timeUp() {
        this.stopTimer();
        
        const currentWord = this.currentGameWords[this.currentQuestionIndex];
        this.showMessage('Süre Doldu!', `Doğru cevap: ${currentWord.english}\n\n0 puan kazandınız.\nBir sonraki soruya geçiliyor...`);
        
        this.elements.gameInfo.textContent = 'Süre doldu! 0 puan. Bir sonraki soruya geçiliyor...';
        this.elements.gameInfo.className = 'info-text error';
        
        this.currentQuestionIndex++;
        this.updateScore();
        
        setTimeout(() => {
            this.showCurrentQuestion();
            this.elements.gameInfo.className = 'info-text';
        }, 2000);
    }
    
    submitAnswer() {
        if (!this.gameActive || this.currentQuestionIndex >= this.currentGameWords.length) {
            return;
        }
        
        // Timer'ı durdur
        this.stopTimer();
        
        const userAnswer = this.elements.answerInput.value.trim().toLowerCase();
        if (!userAnswer) {
            // Boş cevap için timer'ı yeniden başlat
            this.startTimer();
            return;
        }
        
        const currentWord = this.currentGameWords[this.currentQuestionIndex];
        const correctAnswer = currentWord.english.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            this.score++;
            this.points += this.pointsPerQuestion; // Puan ekle
            this.elements.gameInfo.textContent = `Doğru! +${this.pointsPerQuestion} puan! Tebrikler!`;
            this.elements.gameInfo.className = 'info-text success';
        } else {
            // Sadece yanlış cevaplarda popup göster
            this.showMessage('Yanlış Cevap', `Doğru cevap: ${currentWord.english}\n\n0 puan kazandınız.`);
            this.elements.gameInfo.className = 'info-text error';
        }
        
        this.currentQuestionIndex++;
        this.updateScore();
        
        setTimeout(() => {
            this.showCurrentQuestion();
            this.elements.gameInfo.className = 'info-text';
        }, 1500);
    }
    
    updateScore() {
        this.elements.scoreText.textContent = `Skor: ${this.score}/${this.totalQuestions}`;
        this.elements.pointsText.textContent = `Puan: ${this.points}`;
    }
    
    endGame() {
        this.gameActive = false;
        this.stopTimer(); // Timer'ı durdur
        this.elements.answerInput.disabled = true;
        this.elements.submitAnswer.disabled = true;
        
        const percentage = this.totalQuestions > 0 ? (this.score / this.totalQuestions * 100) : 0;
        const maxPossiblePoints = this.totalQuestions * this.pointsPerQuestion;
        
        let resultMessage = `=== OYUN SONUCU ===\n\n`;
        resultMessage += `Toplam soru: ${this.totalQuestions}\n`;
        resultMessage += `Doğru cevap: ${this.score}\n`;
        resultMessage += `Yanlış cevap: ${this.totalQuestions - this.score}\n`;
        resultMessage += `Başarı oranı: %${Math.round(percentage)}\n\n`;
        resultMessage += `=== PUAN DETAYI ===\n`;
        resultMessage += `Toplam puan: ${this.points}/${maxPossiblePoints}\n`;
        resultMessage += `Soru başına puan: ${this.pointsPerQuestion}\n`;
        resultMessage += `Ortalama puan: ${this.totalQuestions > 0 ? Math.round(this.points / this.totalQuestions) : 0}/${this.pointsPerQuestion}\n\n`;
        
        if (percentage >= 90) {
            resultMessage += 'Mükemmel! İngilizce seviyeniz çok iyi!';
        } else if (percentage >= 70) {
            resultMessage += 'İyi! Biraz daha pratik yapabilirsin.';
        } else if (percentage >= 50) {
            resultMessage += 'Fena değil! Daha çok çalışman gerekiyor.';
        } else {
            resultMessage += 'Daha çok çalışman gerekiyor!';
        }
        
        this.showMessage('Oyun Bitti', resultMessage);
        this.elements.gameInfo.textContent = 'Oyun bitti! Yeni oyun için butonlara tıklayın.';
    }
    
    showStatistics() {
        const totalWords = Array.from(this.wordsByLetter.values()).reduce((sum, words) => sum + words.length, 0);
        const letterCount = this.wordsByLetter.size;
        
        let letterDetails = '\n=== HARF DETAYLARI ===\n';
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(65 + i); // A-Z
            const letterKey = String.fromCharCode(97 + i); // a-z
            const words = this.wordsByLetter.get(letterKey);
            const count = words ? words.length : 0;
            letterDetails += `${letter}: ${count} kelime\n`;
        }
        
        const statsMessage = `=== İSTATİSTİKLER ===\n\n` +
                           `Toplam kelime: ${totalWords}\n` +
                           `Aktif harf sayısı: ${letterCount}\n` +
                           `Oynanabilir normal mod: ${Math.min(26, letterCount)} harf\n` +
                           `Maksimum karışık mod: ${totalWords} soru\n` +
                           letterDetails;
        
        this.showMessage('İstatistikler', statsMessage);
    }
    
    resetGame() {
        this.gameActive = false;
        this.stopTimer(); // Timer'ı durdur
        this.currentGameWords = [];
        this.score = 0;
        this.points = 0; // Puanları sıfırla
        this.totalQuestions = 0;
        this.currentQuestionIndex = 0;
        
        this.elements.questionArea.style.display = 'none';
        this.elements.answerInput.disabled = true;
        this.elements.submitAnswer.disabled = true;
        this.elements.scoreText.textContent = 'Skor: 0/0';
        this.elements.pointsText.textContent = 'Puan: 0';
        this.elements.gameInfo.textContent = 'Oyun sıfırlandı. Yeni oyun başlatabilirsiniz.';
        this.elements.gameInfo.className = 'info-text';
    }
    
    showHelp() {
        const helpMessage = `=== YARDIM ===\n\n` +
                          `🎯 Nasıl Oynanır:\n` +
                          `1. Kelime dosyası yükleyin (.txt veya .csv)\n` +
                          `2. Oyun modu seçin:\n` +
                          `   • Normal Mod: A'dan Z'ye sıralı\n` +
                          `   • Karışık Mod: Rastgele kelimeler\n` +
                          `3. Türkçe karşılığı verilen kelimenin İngilizcesini yazın\n` +
                          `4. Enter tuşu veya Gönder butonu ile cevaplayın\n\n` +
                          `📁 Dosya Formatı:\n` +
                          `• Tab ile ayrılmış: apple,elma\\tbus,otobüs\n` +
                          `• CSV: "apple,elma","bus,otobüs"\n\n` +
                          `🎮 İpuçları:\n` +
                          `• Sadece yanlış cevaplarda popup çıkar\n` +
                          `• Her oyun farklı kelimelerle başlar\n` +
                          `• İstatistikler ile ilerlemenizi takip edin`;
        
        this.showMessage('Yardım', helpMessage);
    }
    
    showMessage(title, message) {
        this.elements.modalTitle.textContent = title;
        this.elements.modalText.textContent = message;
        this.elements.modal.style.display = 'block';
    }
    
    closeModal() {
        this.elements.modal.style.display = 'none';
    }
}

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    new PasaparolaGame();
});
