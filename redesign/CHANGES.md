# kobar.org yeniden tasarım: değişiklikler

Dal: `redesign-2026` (origin/main'den). `main`'e dokunulmadı, merge edilmedi, deploy ayarı değiştirilmedi.
Plan: [PLAN.md](PLAN.md). Ekran görüntüleri: [screenshots/](screenshots/). Lighthouse: [lighthouse/](lighthouse/).

## 1. Sayfalar: eski → yeni

| Eski | Yeni |
|---|---|
| `/` tek sayfa: Hero, "Everything you need" özellik ızgarası, "Experience the Workflow" galerisi, "100% Free & Open Source" | `/`: Hero (bar pencerenin sağ kenarına yaslı) · Trailer · Bar özellikleri (kenar, mini mod, notlar, çalışma alanları, görünüm + 4 ek özellik) · Plugin vitrini · Gizlilik özeti · Açık kaynak/topluluk/destek · İndir + SSS · sağ kenarda bölüm barı |
| yok (404) | `/plugins/`: 13 resmi plugin, her biri `#slug` çapalı, GitHub linki, lisansı, doğrulanmış özellikleri ve koyu ekran görüntüsüyle; kurulum adımları, güvenlik, plugin geliştirme |
| yok; Store'daki politika Microsoft CDN'inde 1.1.0 dönemi bir .txt | `/privacy/`: uygulama, 13 plugin ve site için koddan doğrulanmış politika; uygulamanın bağlandığı tüm dış servisler listeli |
| yok | `/license/`: MIT metni, sade açıklama, tüm depolar ve lisansları, katkı/güvenlik linkleri, sitede kullanılan üçüncü taraf varlıklar |
| Vercel'in düz 404 metni | `/404.html`: markalı 404 sayfası |
| yok | `robots.txt`, `sitemap.xml`, favicon seti, `site.webmanifest`, OG/Twitter meta, 1200×630 paylaşım görseli, JSON-LD |

**Korunan adresler:** `/`, `#hero`, `#features`, `#workflow` (plugin vitrinine taşındı), `#open-source`; `/Assets/Logo/24_pixel.png` ve `512_pixel.png` (yeni logoyla); `/Assets/Screenshots/{screen,AI-hub,Color}.png` (yeni koyu arayüzle, 1280×720 PNG). Canlı sitede başka alt yol yoktu (hepsi 404 veriyordu), bu yüzden yönlendirme veya `vercel.json` gerekmedi.

## 2. Kaldırılan veya düzeltilen içerik

- **Google Calendar entegrasyonu** (eski KoCalendar kartı): paketli sürümde çalışmıyor, kaldırıldı.
- **Notlar için "voice-to-text, password lock, multi-tabs":** ses özelliği uygulamada yok, notlarda sekme yok (not listesi var). Kaldırıldı.
- **Eski trailer** (`vxoaziWOpsU`) → yeni trailer (`8xBx2NWgHsE`), `youtube-nocookie.com` ile ve yalnızca tıklanınca yükleniyor.
- **"Work with Flow" sloganı** → Store karesiyle aynı dil: "Your tools, one click away."
- **Kullanıcıya anlamsız teknoloji adları** (Tiptap, Konva.js) kaldırıldı.
- **"No tracking" gibi mutlak iddialar** → "No account. No telemetry. No KoBar server." + dış servislerin açık listesi.
- **Eski renkli plugin illüstrasyonları** (KoBar-Assets) kullanılmadı; yerine manifest'teki Material Symbols ikonu ve gerçek koyu ekran görüntüsü.
- **Patreon ve Open Collective** hero'dan açık kaynak bölümüne ve footer'a taşındı.

## 3. Teknik değişiklikler

- Vite + React 19 + TypeScript + Tailwind v4 korundu. Üstüne **derleme anında statik ön çizim** eklendi (`vite.config.ts` içindeki küçük eklenti): her sayfa JS olmadan okunabilen HTML olarak çıkıyor, sonra hydrate ediliyor. Dev sunucusu da aynı şekilde çiziyor.
- Paketler `dist/static/` altına gidiyor. Windows'ta `public/Assets` ile `assets` aynı klasör sayıldığı için CSS kayboluyordu.
- Kaldırılan bağımlılıklar: `motion`, `lucide-react`, `autoprefixer`, `tsx`. Eklenenler (yalnız geliştirme): `@types/react(-dom)`, `playwright`, `@axe-core/playwright`.
- Google Fonts isteği kalktı: Outfit 700 kendi sunucumuzdan (`public/fonts/`), gövde metni sistem fontu (Segoe UI Variable, uygulamanın kendi fontu).
- Görseller AVIF + WebP, `srcset`/`sizes` ile; hero görseli önceden yükleniyor, diğerleri lazy.
- Sürüm numarası hiçbir yerde elle yazılmadı: tarayıcı boştayken GitHub API'den okunuyor, 1 saat önbellekte tutuluyor, hata olursa hiç gösterilmiyor (yer ayrılmış, kayma yok).
- Vercel Analytics korundu, yalnızca `kobar.org` ve `*.vercel.app` üzerinde yükleniyor.
- Yeni betikler: `scripts/images.py`, `sync-plugins.mjs`, `gen-icons.mjs`, `shots.mjs`, `check-a11y.mjs`, `check-links.mjs`, `serve-dist.mjs` (README'de kullanımı var).

## 4. Kalite kontrolleri (2026-10-18)

**Lighthouse mobil** (`lighthouse/*-mobile.report.html`, sıkıştırmalı yerel sunucu `scripts/serve-dist.mjs` ile):

| Sayfa | Performans | Erişilebilirlik | En iyi uygulamalar | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | 94 | 100 | 82* | 100 | 2,3 sn | 2,5 sn | 0 ms | 0 |
| `/plugins/` | 99 | 100 | 82* | 100 | 1,7 sn | 1,9 sn | 0 ms | 0 |
| `/privacy/` | 100 | 100 | 82* | 100 | 1,4 sn | 1,5 sn | 0 ms | 0 |
| `/license/` | 100 | 100 | 82* | 100 | 1,4 sn | 1,5 sn | 0 ms | 0 |

\* Bu makinedeki **Kaspersky** her HTTP sayfasına `gc.kis.v2.scr.kaspersky-labs.com` adresinden ~200 KB JS ve ~220 KB render-blocking CSS enjekte ediyor. Ölçümde bu adresler `--blocked-url-patterns` ile engellendi; engellenmeden performans 66 çıkıyor. "En iyi uygulamalar" puanındaki tek eksik de bu enjekte edilen `http://` adresleri ("Does not use HTTPS"); sitenin kendisinden gelen bir bulgu yok. Yayındaki HTTPS sitede ölçmeni öneririm.

**Erişilebilirlik** (`scripts/check-a11y.mjs`, axe-core WCAG 2.1 AA + best practice, 5 sayfa × masaüstü/mobil): ihlal yok; tüm metinler 4,5:1 kontrast eşiğini geçiyor. Ana renk çiftleri: başlık 15,7:1, gövde 12:1, ikincil metin 6,9:1 (kartlarda 5,8:1), amber düğme metni 8,7:1. Klavye: her sayfa baştan sona Tab ile geziliyor; tüm odak noktaları görünür ve odak halkalı (ana sayfada 62 durak). Her görselin alt metni var; dekoratif görseller `alt=""`.

**Kırık link** (`scripts/check-links.mjs`): 5 sayfa, 217 iç link ve çapa, 35 dış adres; kırık yok.

**Kafa animasyonu** (Playwright ölçümü): imleci izliyor; boştayken 0 animasyon karesi; ekran dışında ve reduced-motion'da hiç çalışmıyor, zamanlayıcı kurmuyor.

## 5. Kendi verdiğim küçük kararlar

- Hero görseli pencerenin sağ kenarına kadar uzanıyor; kaydırınca aynı yerde sitenin bölüm barı beliriyor (≥1280px).
- Plugin adları manifest'teki gibi: "koPlayer", "KoBox (Dropzone)". Sürüm numaraları gösterilmiyor (elle tutulursa eskir; uygulama içi mağaza güncelini gösteriyor).
- Plugin açıklamaları manifest'ten alınıp doğrulanabilir olana göre yeniden yazıldı. Snippet Vault için "secure/encrypt" denmedi (bkz. §6).
- Store düğmesi web linkine (`apps.microsoft.com`) gidiyor; `ms-windows-store://` linki indirme bölümünde ikincil link.
- Dış linkler aynı sekmede açılıyor (yeni sekme zorlanmıyor).
- Trailer kapağı logo paketindeki `trailer-thumb-1920x1080.png`; sayfa açılışında YouTube'a hiç istek yok.
- Lisans metni sütuna sığsın diye paragraflara akıtıldı; kelimeler `LICENSE.md` ile aynı.
- Gizlilik politikasının tarihi: 18 Ekim 2026.
- Lighthouse JSON çıktıları git dışında tutuldu (yalnız HTML raporlar commit'li).

## 6. Senin yapman gerekenler

**Yayın**
1. Dalı incele, PR aç ve merge et (ben PR açmadım).
2. Vercel'de deploy ayarlarına dokunmadım. Mevcut proje `dist` çıktısıyla aynen çalışmalı; derleme komutu `npm run build` ya da `vite build` olabilir, ikisinde de sayfalar dolu çıkar.
3. Vercel bu dal için bir önizleme derledi, ama önizleme Vercel girişiyle korunuyor: https://ko-bar-website-git-redesign-2026-eedalis-projects.vercel.app. Orada `/plugins` ve `/plugins/` adreslerinin ikisinin de açıldığını kontrol et (temiz URL riski). Açılmazsa haber ver.
4. DNS değişikliği gerekmiyor (aynı Vercel projesi).

**Microsoft Store**
5. Gizlilik politikası URL'sini `https://kobar.org/privacy/` yap (şu an Microsoft CDN'inde 1.1.0 dönemi bir .txt).
6. Store açıklaması hâlâ 1.1.0 metni ve yanlış iddialar içeriyor: Screenshot Studio "PNG, JPG, or WEBP" (yalnız PNG), KoBox "auto-delete" (Geri Dönüşüm Kutusu'na taşır), Snippet Vault "individual PINs" (parola var, PIN yok), notlarda "tabs" (not listesi var), "5 custom presets". Site doğru bilgiyi verdiği için ikisi şu an çelişiyor.

**Uygulama ve plugin tarafı (sitede değil, bu işin kapsamı dışında)**
7. **AI Hub API anahtarları DPAPI ile saklanmıyor:** eklenti anahtarları `localStorage`'da düz metin tutuyor (`aiHub/usePluginChatStore.js`), uygulama bunu `kobar-data` dosyasına yazıyor. Host'taki DPAPI `SecretService` hiçbir resmi plugin tarafından kullanılmıyor. `listing-facts.md` §7'deki "Şifreler/API anahtarları Windows DPAPI ile saklanır" cümlesi de bu yüzden yanlış. Düzeltilirse gizlilik sayfasındaki tek cümle güncellenmeli.
8. **Snippet Vault parolası** şifreli içeriğin yanında düz metin saklanıyor ve kilit açma düz karşılaştırma (`snippetVault/index.jsx:392-411, 585`). Gizlilik sayfası bunu açıkça yazıyor.
9. **Calculator**, her oturumda ilk açılışta `ipapi.co`'ya IP konum isteği atıyor (yerel para birimini seçmek için). İsteğe bağlı yapmayı düşünebilirsin; şu an gizlilik sayfasında listeli.
10. `Screenshot-plugin`, `kobar-plugins-registry` ve `KoBar-Website` depolarında lisans dosyası yok (lisans sayfası "See the repository" diyor). Screenshot Studio manifest'inde `githubRepo` alanı yok.
11. KoBar `README.md`'deki trailer linki hâlâ eski video (`KfZmoITxg2E`).

**Bakım**
12. Plugin adı veya açıklaması değişirse: `node scripts/sync-plugins.mjs "D:/Work/Code/KoBar Plugins"`, ardından `src/data/plugins.ts`'teki site metnini kontrol et.
13. Yeni ekran görüntüleri gelirse: `python -I scripts/images.py`.

## 7. Model kullanımı

- Planlama, tasarım, metin ve gizlilik doğrulaması: ana oturum.
- Uygulamanın ağ isteklerinin denetimi: Sonnet alt ajanı (bulguları ana oturumda dosya:satır ile tekrar doğrulandı).
- Görsel optimizasyonu ve logo paketinin kopyalanması: Haiku alt ajanı.
