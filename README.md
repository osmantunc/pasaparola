# Pasaparola Oyunu

Bu C++ uygulaması, İngilizce kelime öğrenmek için tasarlanmış bir pasaparola oyunudur.

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
