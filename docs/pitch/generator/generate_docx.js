const docx = require('docx');
const fs = require('fs');
const path = require('path');

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} = docx;

const imgDir = path.join(__dirname, '../images');
const outDocxPath = path.join(__dirname, '../TEKNOFEST_PROJE_RAPORU.docx');

function createDoc() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: 'TEKNOFEST PROJE TEKNİK RAPORU',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Proje Adı: ',
                bold: true,
              }),
              new TextRun('Senkron — İstemci Uçtan Uca Hibrit Medya ve Güvenli LLM Entegrasyon Paketi'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Hedef Platform: ',
                bold: true,
              }),
              new TextRun('NSosyal (nsosyal.com) Sosyal Ağ Ekosistemi'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Section 1
          new Paragraph({
            text: '1. Proje Özeti ve Değer Önerisi',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                'Senkron, yüksek kullanıcı trafiğine sahip sosyal ağlar için tasarlanmış, video işleme ve yapay zekâ metin üretim işlevlerini uç istemci cihazlarına ve güvenli mikroservislere dağıtan modüler bir Web Components kütüphanesidir. Geleneksel merkezi bulut video dönüştürme masraflarını WebAssembly (WASM FFmpeg) teknolojisi ile %97 oranında azaltmakta; çift aşamalı Türkçe moderasyon süzgeci ve kayan pencereli kota mekanizması ile güvenli, kötüye kullanıma kapalı bir mimari sunmaktadır.'
              ),
            ],
            spacing: { after: 200 },
          }),

          // Section 2: Architecture
          new Paragraph({
            text: '2. Katmanlı Sistem Mimarisi',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                'Sistem 4 temel katmandan meydana gelmektedir: (1) Web Components tabanlı İstemci Katmanı, (2) Güvenlik ve Kota Doğrulayıcı Ağ Katmanı, (3) Hibrit FFmpeg ve LLM Yürütme Katmanı ve (4) Oturum & Depolama Katmanı.'
              ),
            ],
            spacing: { after: 200 },
          }),

          // Figure 1
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: fs.readFileSync(path.join(imgDir, '1_system_architecture.png')),
                transformation: {
                  width: 580,
                  height: 360,
                },
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Şekil 1: ',
                bold: true,
              }),
              new TextRun('Senkron Katmanlı Sistem Mimarisi ve Bileşenler Arası Veri Akışı'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),

          // Section 3: Decision Tree
          new Paragraph({
            text: '3. Hibrit FFmpeg Karar Mekanizması ve İş Yükü Dağıtımı',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                'Kullanıcıların yüklediği medya dosyaları doğrudan sunucuya aktarılmak yerine cihazın donanım kabiliyetine ve dosya boyutuna göre analiz edilir. 50 MB altındaki ve 60 saniyeden kısa videolar doğrudan istemci tarayıcısında WASM FFmpeg ile işlenerek sunucuya 0 TL maliyetle anında önizleme sunulur.'
              ),
            ],
            spacing: { after: 200 },
          }),

          // Figure 2
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: fs.readFileSync(path.join(imgDir, '2_hybrid_decision_tree.png')),
                transformation: {
                  width: 560,
                  height: 330,
                },
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Şekil 2: ',
                bold: true,
              }),
              new TextRun('Hibrit FFmpeg İş Yükü Karar Ağacı Akış Şeması'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),

          // Section 4: Moderation
          new Paragraph({
            text: '4. Çift Aşamalı Güvenlik ve Moderasyon Hattı',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                'NSosyal platformunun yüksek moderasyon gereksinimlerini karşılamak amacıyla misafir kullanıcıların yapay zekâ gönderi üretmesi 401 Unauthorized ile engellenmiş; istem enjeksiyonu ve Türkçe nefret söylemi / zararlı içerikler model çıkarımı öncesinde ve sonrasında iki kez filtrelenmektedir.'
              ),
            ],
            spacing: { after: 200 },
          }),

          // Figure 3
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: fs.readFileSync(path.join(imgDir, '3_dual_pass_moderation.png')),
                transformation: {
                  width: 580,
                  height: 290,
                },
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Şekil 3: ',
                bold: true,
              }),
              new TextRun('Güvenlik ve Çift Aşamalı Türkçe Moderasyon Hattı'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),

          // Section 5: Cost & Benchmarks
          new Paragraph({
            text: '5. Altyapı Maliyet ve Performans Başarım Analizi',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                'Geleneksel bulut tabanlı GPU dönüştürme masrafları ile Senkron uç mimarisi karşılaştırıldığında 10.000 işlemde masraf 1.500 dolardan 45 dolara inmektedir (%97 tasarruf).'
              ),
            ],
            spacing: { after: 200 },
          }),

          // Figure 4 & Figure 5
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: fs.readFileSync(path.join(imgDir, '4_cost_comparison_chart.png')),
                transformation: {
                  width: 560,
                  height: 300,
                },
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Şekil 4: ',
                bold: true,
              }),
              new TextRun('Altyapı Maliyet ve Kaynak Tüketim Karşılaştırması'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 250 },
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: fs.readFileSync(path.join(imgDir, '5_throughput_benchmark_chart.png')),
                transformation: {
                  width: 560,
                  height: 280,
                },
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Şekil 5: ',
                bold: true,
              }),
              new TextRun('Mikroservis Saniye Başına İşlem ve Gecikme Başarımı'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),

          // Section 6: SWOT
          new Paragraph({
            text: '6. TEKNOFEST SWOT Teknik Değerlendirmesi',
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
          }),

          // Figure 6
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: fs.readFileSync(path.join(imgDir, '6_teknofest_swot_matrix.png')),
                transformation: {
                  width: 560,
                  height: 360,
                },
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Şekil 6: ',
                bold: true,
              }),
              new TextRun('TEKNOFEST SWOT Teknik Değerlendirme Matrisi'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(outDocxPath, buffer);
    console.log(`DOCX report generated successfully at: ${outDocxPath}`);
  });
}

createDoc();
