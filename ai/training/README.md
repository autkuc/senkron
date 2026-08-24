# Modal Training & Local Ollama Deployment Kit

Bu dizin, **Llama 3.2 3B Instruct** modelini Türkçe NSosyal kısa metin üretimi için **Modal** sunucusuz GPU altyapısında Unsloth 4-bit QLoRA ile eğitmek ve yerel **Ollama** ortamına aktarmak için gerekli betikleri içerir.

---

## 1. Modal Kurulumu ve Kimlik Doğrulama

Terminalinizde Modal CLI kurulumunu ve girişini yapın:

```bash
pip install modal
modal setup
```
*(Tarayıcınız açılacak ve Modal hesabınızla tek tıkla yetkilendirme yapılacaktır).*

Alternatif olarak uzak sunucuda:
```bash
modal token set --token-id <TOKEN_ID> --token-secret <TOKEN_SECRET>
```

---

## 2. Sentetik Türkçe Veriseti Üretimi (Modal)

5 farklı ton (`viral`, `professional`, `educational`, `witty`, `casual`) içeren ShareGPT formatında veri seti oluşturmak için:

```bash
modal run Senkron/ai/training/modal_dataset.py
```

---

## 3. Unsloth QLoRA Eğitimi ve GGUF Export (Modal GPU)

Eğitimi Modal A10G sunucusuz GPU üzerinde başlatmak ve doğrudan `Q4_K_M` GGUF formatında derlemek için:

```bash
modal run Senkron/ai/training/modal_train.py
```

---

## 4. Modeli Yerel Makineye İndirme ve Ollama'ya Yükleme

Modal Volume üzerindeki eğitilmiş GGUF modelini yerel makinenize indirin:

```bash
python3 Senkron/ai/training/modal_download.py
```

Ollama modelini oluşturun:

```bash
ollama create senkron-turkish-llama3.2:3b -f Senkron/ai/training/Modelfile
```

Model yerel olarak hazır! Artık `@senkron/ai` Smart Router varsayılan olarak yerel `http://localhost:11434` Ollama servisini kullanacaktır (sıfır maliyet, sıfır dış API bağımlılığı).
