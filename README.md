# 🎯 Pasaparola Oyunu - İngilizce Kelime Öğrenme

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://[username].github.io/pasaparola-oyunu)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](index.html)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](style.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](script.js)

> **İngilizce kelime öğrenme oyunu** - Pasaparola tarzında eğlenceli ve etkileşimli web uygulaması

## 🌟 Demo

**[🚀 Canlı Demo'yu Deneyin](https://[username].github.io/pasaparola-oyunu)**

## 📖 İçindekiler

- [Özellikler](#-özellikler)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Dosya Formatları](#-dosya-formatları)
- [Teknik Detaylar](#-teknik-detaylar)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

### 🎮 Oyun Modları
- **Normal Mod (A-Z):** Alfabetik sıraya göre A'dan Z'ye kadar sorular
- **Karışık Mod:** Rastgele karışık sorular (soru sayısı ayarlanabilir)

### ⏱️ Zamanlayıcı Sistemi
- Her soru için **20 saniye** süre
- Gerçek zamanlı geri sayım
- Zaman dolduğunda otomatik geçiş

### 🏆 Puan Sistemi
- Her doğru cevap için **10 puan**
- Anlık puan göstergesi
- Detaylı oyun sonu istatistikleri

### 📁 Çoklu Dosya Desteği
- **TXT** dosyaları (tab veya virgül ayrılmış)
- **CSV** dosyaları
- **Word** dosyaları (.doc, .docx)
- Otomatik format algılama

### 💾 Hafıza Yönetimi
- Kelime listelerini tarayıcıda kaydetme
- **Özel** (sadece kendi cihazınızda) veya **Genel** (herkesle paylaşılan) listeler
- Kayıtlı listeleri tek tıkla yükleme
- Liste silme ve yönetme

### 📱 PWA (Progressive Web App)
- Mobil cihazlara "uygulama" olarak indirilebilir
- Offline çalışma desteği
- Responsive tasarım (mobil uyumlu)

### 🎨 Kullanıcı Arayüzü
- Modern ve kullanıcı dostu tasarım
- Koyu tema gradyenti
- Animasyonlu butonlar ve geçişler
- Modal popup'lar

## 📱 Ekran Görüntüleri

<details>
<summary>🖥️ Masaüstü Görünümü</summary>

```
┌─────────────────────────────────────────────┐
│  🎯 Pasaparola Oyunu                        │
├─────────────────────────────────────────────┤
│  📁 Kelime Dosyası Seçin: [Dosya Seç] [Yükle] │
│  ☑️ Hafızada Kaydet [Özel/Genel] [Liste Adı]  │
│                                             │
│  📋 Kayıtlı Listeler: [Dropdown] [Kullan] [Sil] │
│                                             │
│  🎮 Normal Mod | Karışık Mod | [10] | İstatistik │
│                                             │
│  ❓ Soru 1/26 (10 puan) - 'A' harfi          │
│     Türkçe anlam: elma                      │
│     İngilizce karşılığı: [_____] [Gönder]   │
│                                             │
│  📊 Skor: 0/0  💰 Puan: 0  ⏱️ Zaman: 20s    │
└─────────────────────────────────────────────┘
```

</details>

<details>
<summary>📱 Mobil Görünümü</summary>

```
┌─────────────────────┐
│  🎯 Pasaparola      │
├─────────────────────┤
│  📁 [Dosya Seç]     │
│  [Dosyayı Yükle]    │
│                     │
│  📋 Kayıtlı Listeler │
│  [▼ Seçin...]       │
│  [Bu Listeyi Kullan] │
│                     │
│  🎮 [Normal Mod]    │
│  🎲 [Karışık Mod]   │
│                     │
│  ❓ Soru 1/26       │
│  Türkçe: elma       │
│  [_____________]    │
│  [    Gönder    ]   │
│                     │
│  📊 Skor: 0/0       │
│  💰 Puan: 0         │
│  ⏱️ Zaman: 20s      │
└─────────────────────┘
```

</details>

## 🚀 Kurulum

### GitHub Pages ile Canlı Demo

1. Bu repository'yi fork edin
2. Repository ayarlarında **Pages** bölümüne gidin
3. **Source:** "Deploy from a branch" seçin
4. **Branch:** "main" seçin
5. Birkaç dakika sonra siteniz `https://[username].github.io/pasaparola-oyunu` adresinde yayında!

### Yerel Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/[username]/pasaparola-oyunu.git

# Dizine gidin
cd pasaparola-oyunu

# Basit HTTP sunucusu başlatın (Python 3)
python -m http.server 8000

# Tarayıcıda açın
# http://localhost:8000
```

## 🎮 Kullanım

### 1. Kelime Listesi Yükleme

#### Dosyadan Yükleme
1. **"Kelime Dosyası Seçin"** butonuna tıklayın
2. TXT, CSV veya Word dosyanızı seçin
3. **"Dosyayı Yükle"** tıklayın

#### Kayıtlı Listelerden Yükleme
1. **"Kayıtlı Listeler"** dropdown'ından istediğiniz listeyi seçin
2. **"Bu Listeyi Kullan"** tıklayın

### 2. Oyun Oynama

#### Normal Mod (A-Z)
- A harfinden Z harfine kadar alfabetik sırayla sorular
- Her harften rastgele bir kelime seçilir

#### Karışık Mod
- Rastgele karışık sorular
- Soru sayısını ayarlayabilirsiniz (varsayılan: 10)

### 3. Cevap Verme
- Cevabınızı text kutusuna yazın
- **Enter** tuşuna basın veya **"Gönder"** butonuna tıklayın
- Her soru için **20 saniye** süreniz var

### 4. Sonuçlar
- Gerçek zamanlı skor takibi
- Her doğru cevap **10 puan**
- Oyun sonu detaylı istatistikler

## 📄 Dosya Formatları

### TXT Dosyası (Virgülle Ayrılmış)
```
apple,elma
cat,kedi
house,ev
book,kitap
water,su
```

### CSV Dosyası
```
"apple","elma"
"cat","kedi"
"house","ev"
"book","kitap"
"water","su"
```

### Word Dosyası
Word dosyalarında şu formatları destekliyoruz:
- `apple,elma`
- `apple - elma`
- `apple: elma`
- `apple elma` (boşlukla)

## 🔧 Teknik Detaylar

### Teknolojiler
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **PWA:** Service Worker, Web App Manifest
- **Word Processing:** Mammoth.js
- **Storage:** LocalStorage API
- **Hosting:** GitHub Pages

### Dosya Yapısı
```
pasaparola-oyunu/
├── index.html          # Ana sayfa
├── style.css           # CSS stilleri
├── script.js           # JavaScript kodları
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── words_vertical.txt  # Örnek kelime listesi
├── README.md          # Bu dosya
├── DEPLOYMENT_GUIDE.md # Deployment rehberi
└── FILES_TO_UPLOAD.md # Dosya listesi
```

### Tarayıcı Desteği
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobil tarayıcılar

### Özellikler Detayı

#### Memory Management
- **LocalStorage** kullanarak kelime listeleri tarayıcıda saklanır
- **Privacy Levels:** Özel (sadece o cihazda) veya Genel (paylaşılan)
- JSON formatında strukturlü veri saklama

#### Timer System
- JavaScript `setInterval` ile 1 saniye hassasiyetinde
- Görsel geri sayım göstergesi
- Zaman dolduğunda otomatik soru geçişi

#### Word Processing
- **Mammoth.js** ile Word dosyalarından text çıkarma
- Çoklu format desteği (virgül, tire, noktalı virgül, boşluk)
- Otomatik encoding detection

#### PWA Features
- **Service Worker** ile offline cache
- **Web App Manifest** ile uygulama meta verisi
- Add to Home Screen desteği

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! 

### Nasıl Katkıda Bulunursunuz?

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Geliştirilmesi Gereken Alanlar

- [ ] Ses efektleri ekleme
- [ ] Farklı dil desteği (Almanca, Fransızca, vs.)
- [ ] Kullanıcı hesapları ve istatistik takibi
- [ ] Çoklu oyuncu modu
- [ ] Kelime kategorileri (hayvan, renk, vs.)
- [ ] Zorluk seviyeleri
- [ ] Leaderboard sistemi

## 🐛 Bug Raporu

Bug bulduysanız lütfen [issue açın](https://github.com/[username]/pasaparola-oyunu/issues/new).

## 📊 İstatistikler

- 🎯 **Desteklenen Format:** 3 (TXT, CSV, Word)
- ⏱️ **Soru Süresi:** 20 saniye
- 🏆 **Puan/Soru:** 10 puan
- 📱 **PWA:** Evet
- 🌐 **Offline:** Evet

## 📝 Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**[Adınız]**
- GitHub: [@[username]](https://github.com/[username])
- Demo: [pasaparola-oyunu](https://[username].github.io/pasaparola-oyunu)

## 🙏 Teşekkürler

- [Mammoth.js](https://github.com/mwilliamson/mammoth.js/) - Word dosyası işleme
- [GitHub Pages](https://pages.github.com/) - Ücretsiz hosting
- İngilizce kelime veritabanı katkıda bulunanlar

---

⭐ **Bu projeyi beğendiyseniz star vermeyi unutmayın!**

[🔝 Başa Dön](#-pasaparola-oyunu---i̇ngilizce-kelime-öğrenme)

## Özellikler

- **Excel/CSV/Text dosyasından kelime yükleme**: Kelimeleri harflerine göre düzenlenmiş dosyadan okur
- **Normal Mod**: A harfinden Z harfine alfabetik sırayla kelimeler
- **Karışık mod**: Tüm harflerden rastgele kelimeler
- **GUI Arayüz**: Kullanıcı dostu grafik arayüz
- **Skor takibi**: Doğru/yanlış cevap sayısı ve başarı oranı
- **İstatistikler**: Harflere göre kelime dağılımı
- **Çoklu Format Desteği**: .csv, .txt, .xlsx dosyaları

## Dosya Formatları

### CSV Format (önerilen)
```csv
"apple,elma","bus,otobüs","cherry,kiraz","duck,ördek","evil,şeytan","fish,balık"
"arm,kol","bat,yarasa","car,araba","dude,ahbap","expensive,pahalı","fire,ateş"
```

### Tab-Delimited Format
```
apple,elma	bus,otobüs	cherry,kiraz	duck,ördek
arm,kol	bat,yarasa	car,araba	dude,ahbap
```

- Her satırda A, B, C, D, E, F harfleri sırasıyla
- Kelime ve anlamı virgülle ayrılır (örn: apple,elma)
- CSV'de sütunlar tırnak içinde, tab-delimited'da tab ile ayrılır

## Kullanım

1. Programı derleyin:
   ```bash
   g++ -o pasaparola main.cpp
   ```

2. Programı çalıştırın:
   ```bash
   ./pasaparola
   ```

3. Kelime dosyasının adını girin (örn: words.txt)

4. Oyun menüsünden seçim yapın:
   - **Harf seçerek oyna**: Belirli bir harfle başlayan kelimelerle oyna
   - **Karışık mod**: Tüm harflerden rastgele kelimeler
   - **İstatistikleri göster**: Yüklenen kelimelerin dağılımını gör

## Oyun Kuralları

- Size Türkçe anlam verilir
- İngilizce karşılığını yazmanız gerekir
- Kelime belirtilen harfle başlamalıdır
- Büyük/küçük harf duyarlı değildir

## Örnek Kullanım

```
=== PASAPAROLA OYUNU ===
1. Harf seçerek oyna
2. Karışık mod (tüm harfler)
3. İstatistikleri göster
4. Çıkış
Seçiminiz (1-4): 1

Hangi harfle oynamak istiyorsunuz (a-z): a

--- Soru 1 ---
Türkçe anlam: elma
İngilizce karşılığı ('A' harfi ile başlar): apple
✓ Doğru! Tebrikler!
```

## Geliştirme Önerileri

- Seviye sistemi eklenebilir
- Zaman sınırı koyulabilir
- Kelime öğrenme geçmişi kaydedilebilir
- Ses desteği eklenebilir
- GUI arayüz geliştirilebilir
