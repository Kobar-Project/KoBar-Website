# kobar.org yeniden tasarım planı (2026)

Dal: `redesign-2026` (origin/main'den). Durum: **onay bekliyor**.

## 0. İnceleme özeti

- Canlı site = bu repo: tek sayfalık Vite SPA (Vercel). `/` dışındaki tüm yollar 404 (`/privacy`, `/plugins`, `/robots.txt`, `/sitemap.xml`, `/favicon.ico` dahil). Korunacak eski adresler yalnızca `/`, `#hero #features #workflow #open-source` çapaları ve `/Assets/Logo/*.png`, `/Assets/Screenshots/*.png` görselleri.
- Eskiyen içerik: eski logo (amber kare), eski arayüz ekran görüntüleri, eski trailer (`vxoaziWOpsU`), "Work with Flow" sloganı, paketli sürümde çalışmayan **Google Calendar** iddiası, doğrulanamayan "voice-to-text, password lock, multi-tabs" not iddiaları, kullanıcıya anlamsız teknoloji adları (Tiptap, Konva.js).
- Eksik: plugin sayfası, gizlilik politikası (Store'daki politika Microsoft CDN'inde 1.1.0 dönemi bir .txt), lisans sayfası, OG/Twitter meta, favicon seti, sitemap/robots, sürüm bilgisi, 404 sayfası. Metin istemci tarafında çiziliyor (JS olmadan sayfa boş).
- Tutmaya değer: Vite + React + TS + Tailwind v4 kurulumu, koyu zemin, Outfit başlıklar, topluluk linkleri (Discord, Reddit, X, GitHub, Patreon, Open Collective, hello@kobar.org), Store + GitHub CTA ikilisi, tıklayınca yüklenen video fikri, Vercel Analytics.
- Kaynak notu: `remaster/store/` altında listing/CSV dosyası **yok**; yalnızca `listing-facts.md` ve `screenshots/captions.txt` var. Dil tutarlılığı bu ikisine göre kurulacak. Canlı Store listesi hâlâ 1.1.0 metni ve `listing-facts.md`'nin yanlış dediği iddiaları içeriyor (JPG/WEBP, PIN, "auto-delete", sekmeler).

## 1. Hedef kitle ve sitenin tek işi

**Kitle:** Windows 10/11'de çok pencereyle çalışan, pano, not, ekran görüntüsü ve yapay zekâ araçları arasında gidip gelen kullanıcılar (geliştirici, tasarımcı, öğrenci, ofis çalışanı). Siteye Store sayfasından, GitHub'dan, Reddit/Discord'dan ve YouTube trailer'ından geliyorlar.

**Tek iş:** Ziyaretçiye KoBar'ın ne olduğunu 10 saniyede gösterip **Microsoft Store'dan kurdurmak**; kararsız olanı "verim cihazımda kalıyor, açık kaynak, istediğim eklentiyi kuruyorum" güveniyle ikna etmek. Diğer her şey (plugin listesi, gizlilik, lisans) bu kararı destekler.

## 2. Bilgi mimarisi

| Yol | Sayfa | Bölümler |
|---|---|---|
| `/` | Ana sayfa | Header · Hero (`#hero`) · Trailer · Bar özellikleri (`#features`) · Plugin vitrini (`#workflow`, eski çapa korunur) · Gizlilik özeti · Açık kaynak + topluluk + destek (`#open-source`) · İndir + SSS (`#download`) · Footer |
| `/plugins` | 13 resmi plugin | Giriş + kurulum adımı · 13 plugin (her biri `#slug` çapalı: ikon, ad, açıklama, doğrulanmış 2-3 madde, koyu UI kesiti, GitHub linki) · Plugin güvenliği (onay, "unverified" uyarısı, tam yetki) · Kendi plugin'ini yaz (API v1 özeti, rehber ve registry linkleri) |
| `/privacy` | Gizlilik politikası | Kısa özet · Uygulama (yerel depolama, DPAPI, ağ istekleri listesi, pano, yedek, güncelleme) · Web sitesi (Vercel Analytics, YouTube tıklayınca, GitHub API) · Üçüncü taraflar · Değişiklikler · İletişim |
| `/license` | Lisans ve açık kaynak | MIT tam metni (`LICENSE.md`) ve sade açıklaması · Kaynak depolar (uygulama, 13 plugin, registry, web sitesi) · Katkı, güvenlik, davranış kuralları linkleri · Sitede kullanılan üçüncü taraf varlıklar (Outfit OFL, Material Symbols Apache 2.0) |
| `/404.html` | Bulunamadı | Kafa + ana sayfa ve plugin linkleri (Vercel bunu otomatik kullanır) |

**Header:** logo (lockup) · Features · Plugins · Privacy · GitHub · [Download]. Mobilde menü düğmesi (klavye ve Esc ile).
**Footer:** Plugins, Privacy, License, Releases, Security policy, hello@kobar.org · Discord, Reddit, X, YouTube, GitHub · Patreon, Open Collective · © 2026 KoBar Project.

**Kaldırılan / eklenmeyen:** eski "Experience the Workflow" galeri + lightbox (yerine plugin vitrini; `#workflow` çapası ona taşınır), eski trailer, Google Calendar, voice-to-text, not şifresi ve sekme iddiaları, sürüm numarası yazımı (yalnızca GitHub API'den), macOS/Linux ifadesi, eski renkli plugin görselleri (KoBar-Assets'teki parlak illüstrasyonlar yeni koyu marka diline uymuyor; yerine manifest'teki Material Symbols ikonu + koyu UI kesiti). Destek/SSS/geliştirici rehberi sayfası mevcut sitede yok; SSS ana sayfaya, geliştirici özeti `/plugins`'e bölüm olarak giriyor.

## 3. Tasarım yönü

**İlkeler**
1. **Ürün kahramandır.** Görsel olarak yalnızca gerçek koyu arayüz kesitleri ve logo paketi. İllüstrasyon, stok görsel, sahte arayüz yok.
2. **Kenara yaslı.** KoBar ekranın kenarına yaslanır; site de öyle: masaüstünde sağ kenarda gerçek bir "bar" bölüm dizini olarak durur (bkz. kompozisyon A).
3. **Tek vurgu, yalnızca eylem için.** KoBar amberi `#F4A125` yalnızca birincil düğme, odak halkası ve aktif durumda. Marka kremi `#F4F1EA` başlık ve logoda. Gradyan parıltı, glassmorphism ve dekoratif bulanıklık yok.
4. **Dürüst ve kısa metin.** Yalnızca `listing-facts.md` ile doğrulanmış özellikler. Bir cümle, bir bilgi. Store ekran görüntüsü başlıklarıyla aynı dil ("Your tools, one click away", "Docks to any edge").
5. **Sakin hareket.** Tek "canlı" öğe imleci izleyen KoBar kafası. Scroll animasyonu, paralaks ve motion kütüphanesi yok.

**Renk (yalnız koyu):** zemin `#18181B` · yükseltilmiş yüzey `#1F1F23` · kart `#27272A` · çizgi `rgb(244 241 234 / 0.08)` · başlık/logo `#F4F1EA` (≈15.7:1) · gövde `#D4D4D8` (≈12:1) · ikincil `#A1A1AA` (≈6.9:1) · vurgu `#F4A125` (zeminde ≈8.4:1), üstündeki metin `#141414` (≈8.7:1). `prefers-color-scheme` dalı yok.

**Tipografi:** Başlıklar **Outfit 700**, kendi sunucumuzdan (fontsource, yalnız latin, woff2, preload; Google Fonts isteği kalkar). Gövde sistem yığını `"Segoe UI Variable Text", "Segoe UI", system-ui, sans-serif`: uygulamanın kendi yazı tipiyle aynı, yükleme maliyeti sıfır. Küçük meta (sürüm, kısayol) `"Cascadia Mono", ui-monospace`. Ölçek (clamp ile akışkan): 64 / 44 / 30 / 22 / 18 / 16 / 14 px; gövde 17px masaüstü, 16px mobil, satır yüksekliği 1.6, okuma genişliği en çok 68ch.

**Aralık:** 4px tabanlı ölçek (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). İçerik en çok 1120px. Bölüm dikey boşluğu 128px masaüstü / 80px mobil. Mobil yan boşluk 16px, tablet 24px. Dokunma hedefleri en az 44px.

**Hareket:** Hover/odak geçişleri ≤150ms, yalnız renk/opaklık. Kafa: rAF yalnızca hareket sönümlenirken çalışır, dinleyiciler yalnızca kafa görünür alandayken bağlı, göz kırpma yalnızca sekme ve kafa görünürken. `prefers-reduced-motion: reduce` ya da dokunmatik (hover yok) cihazda takip ve kırpma tamamen kapalı, kafa sabit. Boştayken sıfır timer, sıfır rAF.

## 4. Ana sayfa kompozisyonu: iki öneri

### A) "Docked": site kendisi bir KoBar gibi kenara yaslı

```
1440px                                                            sağ kenar
┌──────────────────────────────────────────────────────────────┬────┐
│ [kafa KoBar]  Features  Plugins  Privacy  GitHub  [Download] │    │
├──────────────────────────────────────────────────────────────┤ ≡  │
│  Your tools,                  ┌──────────────────────────┐   │ ▤  │ ← sabit "bar":
│  one click away.              │ koyu masaüstü zemini      │   │ ⇲  │   gerçek Material
│  KoBar is a free, open-source │ + not paneli + dikey bar  │   │ 🐱 │   Symbols ikonları,
│  sidebar for Windows...       │ (gerçek UI kesitleri)     │   │ ▦  │   bölümlere link,
│  [ Microsoft Store ] [GitHub] │                          │   │ ⛨  │   aktif bölümde
│  v1.4.3 · Windows 10 & 11     └──────────────────────────┘   │ ⤓  │   amber gösterge;
├──────────────────────────────────────────────────────────────┤    │   altta marka kafası
│            ▶  Trailer (yerel kapak; tıklayınca YouTube)     │    │
├──────────────────────────────────────────────────────────────┤    │
│ Docks to any edge      [yatay bar kesiti]  [dikey bar]      │    │
│ Mini mode              BÜYÜK KAFA, imleci izler              │    │
│ Notes                  [not paneli]  import .txt/.md, Ctrl+S │    │
│ Workspaces             [çalışma alanı menüsü]                │    │
│ Ayarlar · Görünüm · Yedek · 10 dil · her zaman üstte (ızgara)│    │
├──────────────────────────────────────────────────────────────┤    │
│ 13 plugin ikon ızgarası → /plugins#slug                      │    │
│ 3 öne çıkan: AI Hub · Clipboard Manager · Screenshot Studio  │    │
│ No account. No telemetry. No KoBar server. (gizlilik özeti)  │    │
│ Open source (MIT) · topluluk · destek                        │    │
│ Download: Store vs GitHub installer + SSS                    │    │
│ Footer                                                       │    │
└──────────────────────────────────────────────────────────────┴────┘
Mobil (390): bar gizli; hero metni → CTA'lar → görsel; bölümler tek sütun.
```

### B) "Showcase": klasik ortalanmış vitrin

```
┌──────────────────────────────────────────────┐
│ [KoBar]                  nav       [Download]│
│          Your tools, one click away.         │
│        [Microsoft Store]  [GitHub]           │
│  ┌────────────────────────────────────────┐  │
│  │ Store karesi 01 (3840×2160, tam genişlik)│ │
│  └────────────────────────────────────────┘  │
│                 Trailer                      │
│  [görsel | metin]   zikzak özellik satırları │
│  [metin | görsel]   (Store kareleri 02-09)   │
│  plugin ızgarası · gizlilik · açık kaynak    │
│  son CTA · footer                            │
└──────────────────────────────────────────────┘
```

### Seçim: **A**

- "Ekranın kenarına yaslanır" fikrini metinle değil, sayfanın kendisiyle anlatıyor; ziyaretçi ilk saniyede ürünün biçimini görüyor.
- Şeffaf @2x UI kesitleri tam da böyle bir kompozisyon için üretilmiş; B ise başlıkları görsele gömülü Store karelerine dayanıyor (mobilde okunmaz, ekran okuyucu göremez, metni değiştiremeyiz).
- Sağdaki bar gerçek bir `<nav>`: klavyeyle gezilir, bölüm dizini işi görür; kafa marka karakterini taşır.
- Maliyet ve risk sınırlı: bar yalnızca ≥1280px'te görünür, altında hiç render edilmez; içerik genişliği 1120px olduğu için çakışmaz. Bar beğenilmezse kaldırmak tek bileşen silmek demek; sayfa B'ye yakın sade bir düzende kalır.

## 5. İçerik kaynağı eşlemesi

| Bölüm | Kaynak |
|---|---|
| Hero başlığı, bölüm başlıkları | `remaster/store/screenshots/captions.txt` + Store karelerindeki başlıklar |
| Hero alt metni, "What is KoBar" | `KoBar/README.md` "What is KoBar", onboarding metinleri (`en.json` → `onboardingWelcomeBody`, `onboardingPackBody`) |
| Bar özellikleri (kenar, yön, mini mod, yoğunluk 3 seçenek, tema, vurgu, saydamlık, 10 dil, yedek, çalışma alanı) | `listing-facts.md` §3, §4, §7; ayar adları `en.json` (`settingsDensity*`, `settingsAccent*`, `settingsEdge*`) |
| Notlar (liste + editör, .txt/.md içe aktarma, Ctrl+S, "Open with KoBar") | `listing-facts.md` §3, `CHANGELOG.md` 1.4.3 |
| Plugin adları, açıklamaları, GitHub linkleri, kategori, ikon | `KoBar Plugins/<klasör>/manifest.json` (`name`, `description`, `githubRepo`, `categories`, `icon`); Screenshot Studio'da `githubRepo` yok → `KoBar/README.md` tablosundaki `Kobar-Project/Screenshot-plugin` |
| Plugin ayrıntı maddeleri (4-20 slot, PNG, Geri Dönüşüm Kutusu, parola + AES, AI sağlayıcıları) | `listing-facts.md` §6 |
| Plugin güvenliği, plugin geliştirme | `listing-facts.md` §3 (onay, "unverified"), `KoBar/README.md` "Plugin development" |
| Gizlilik politikası | §5a'daki koddan doğrulanmış tablo + `CHANGELOG.md` 1.4.0 Security, `README.md` |
| Lisans | `KoBar/LICENSE.md` (MIT, © 2026 eedali), plugin `LICENSE.txt` dosyaları |
| Görseller | `remaster/store/screenshots/ui/dark/*` (yalnız koyu), `KoBar-Logo/store/trailer-thumb-1920x1080.png` (trailer kapağı), `KoBar-Logo/store/store-bg-dark.png` (hero zemini) |
| Logo, favicon, OG | `KoBar-Logo/svg/*`, `KoBar-Logo/web/*` (favicon.ico/svg, apple-touch, 192/512/maskable, `site.webmanifest`, `og-image.png` 1200×630, `Assets/Logo/24_pixel.png` + `512_pixel.png`) |
| Kafa animasyonu | `KoBar-Logo/animation/KoBarHead.tsx` (geometri ve hareket sınırları aynen; görünürlük/reduced-motion bekçileri eklenir) |
| İndirme linkleri | `ms-windows-store://pdp/?productid=9P2KPFF3G9L9`, `https://apps.microsoft.com/detail/9P2KPFF3G9L9`, `https://github.com/Kobar-Project/KoBar/releases/latest` |
| Sürüm | Çalışma anında `api.github.com/repos/Kobar-Project/KoBar/releases/latest` (bugün `v1.4.3`); başarısızsa hiç gösterilmez |
| Topluluk ve destek linkleri | mevcut `Footer.tsx`, `Hero.tsx`; `KoBar/src/config/links.ts` (Patreon, Open Collective, hello@kobar.org) |

## 5a. Gizlilik: koddan doğrulanan gerçekler (2026-10-18)

KB = `KoBar v2\KoBar`, PL = `KoBar Plugins`. Ana oturumda dosya:satır ile tekrar kontrol edildi.

| Konu | Gerçek | Kanıt |
|---|---|---|
| KoBar sunucusu / telemetri | **Yok.** Analitik, çökme raporu, KoBar'a ait veri alan uç nokta yok; kobar.org yalnızca dış link | KB `package.json`, `src/config/links.ts` |
| **AI Hub API anahtarları** | **DPAPI ile saklanmıyor.** Eklenti anahtarları zustand `persist` ile `localStorage`'da (`kobar-aihub-plugin-storage`) düz metin tutuyor; host bunu `userData\kobar-data` altındaki dosyaya yansıtıyor. Host'taki DPAPI `SecretService` var ama hiçbir resmi eklenti kullanmıyor. Anahtar yalnızca seçilen sağlayıcıya, başlıkta gidiyor; yerel model yalnızca loopback | PL `aiHub/usePluginChatStore.js:5-12,82`; KB `electron/main/services/llm.cts`, `lib/llmRequest.cts:50-58`; `services/secrets/secretService.cts` |
| Snippet Vault parolası | İçerik AES ile şifreleniyor ama **parola aynı kayıtta düz metin** saklanıyor; kilit açma düz karşılaştırma. Gerçek koruma değil | PL `snippetVault/index.jsx:392-411,585,662,142` |
| Yedek dışa aktarma | Sırlar varsayılan olarak maskeli; kullanıcı açarsa düz metin (uyarıyla) | KB `src/backup/redact.ts`, `CHANGELOG.md` 1.4.0 |
| Pano | Yalnızca Clipboard Manager kopya modu açıkken izlenir; ağ isteği yok | KB `electron/main/services/clipboard.cts`, PL `ClipboardManager/index.jsx:87-104` |
| Ekran görüntüleri, notlar | Yerelde; kullanıcının seçtiği yere kaydedilir | KB `services/screenshot.cts:283-340` |
| Ses/mikrofon | Özellik yok; izin varsayılan olarak reddedilir | KB `electron/lib/permissions.cts` |
| Otomatik güncelleme | Store sürümünde kapalı (güncellemeyi Store yapar); GitHub kurulumunda GitHub Releases | KB `electron/lib/buildFlags.cts`, `services/updater.cts` |
| Üçüncü taraf istekleri | Plugin listesi ve kurulum: `raw.githubusercontent.com`, `api.github.com` (kullanıcı açınca). AI sağlayıcıları (sohbet edince). **Calculator açılınca `ipapi.co`'ya IP ile konum isteği** (para birimini önseçmek için) ve döviz kuru için `open.er-api.com`. Shortcuts'a eklenen web linkinin simgesi Google favicon servisinden. koPlayer/PiP: YouTube küçük resim, oEmbed ve gömülü oynatıcı. Not emoji seçici: jsDelivr CDN'den emoji görselleri | PL `calculator/index.tsx:336,396`, `Shortcuts/index.jsx:199`, `koPlayer/index.jsx:165-172`; KB `src/components/notes/NotePanel.tsx:11`, `PipPlayer.tsx:13` |
| Google Calendar | Paketli sürümde kullanılamaz (OAuth istemci dosyası pakette yok); sitede anılmaz | KB `electron/lib/gcalConfig.cts`, `tools/builderConfig.cjs:126` |

**Sonuç:** "Hiçbir veri KoBar sunucusuna gitmez" doğru ve yazılacak. "AI Hub anahtarları DPAPI ile saklanır" **yanlış**, yazılmayacak; yerine "anahtarlar cihazında, Windows kullanıcı profilindeki KoBar veri klasöründe saklanır ve yalnızca seçtiğin sağlayıcıya gönderilir" yazılacak. "Everything stays on your device" sloganı ana sayfada mutlak iddia olarak kullanılmayacak; "No account. No telemetry. No KoBar server." + üçüncü taraf istekleri `/privacy`'de açıkça listelenecek. Snippet Vault için "secure/encrypted" pazarlaması yapılmayacak.

## 6. Teknik kararlar

- **Koru:** Vite 6 + React 19 + TypeScript + Tailwind v4. Çalışıyor, küçük ve bakımı bilinen bir yığın; Astro/Next'e geçiş gereken kazancı getirmiyor.
- **Ekle: derleme anında statik ön çizim (SSG).** Küçük bir Vite eklentisi `vite build` sonunda her sayfayı React SSR ile HTML'e basar, istemci `hydrateRoot` ile devralır. Çıktı: `dist/index.html`, `dist/plugins/index.html`, `dist/privacy/index.html`, `dist/license/index.html`, `dist/404.html`. Kazanç: JS olmadan okunur metin, SEO, hızlı LCP, Lighthouse. Eklenti `vite build`'in içinde çalıştığı için Vercel'deki derleme komutu ne olursa olsun sayfalar dolu çıkar. Router kütüphanesi yok; sayfalar arası düz `<a>`.
- **Çıkar:** `motion` (paket boyutu, hareket ilkesi), `lucide-react` (yerine uygulamayla aynı aile Material Symbols Outlined SVG'leri, yalnız kullanılanlar paketlenir; marka ikonları için Simple Icons yolları), Google Fonts `@import` (yerine `@fontsource/outfit` 700).
- **Tut:** `@vercel/analytics` (çerezsiz; gizlilik sayfasında açıklanır).
- **Görseller:** `scripts/images.py` (Pillow, AVIF + WebP, 480/960/1440/1920 gibi gereken genişlikler) → `public/img/`. `<picture>` + `width/height` + `loading="lazy"` (hero görseli hariç: `fetchpriority="high"` + preload). Orijinallere dokunulmaz.
- **Plugin verisi:** `scripts/sync-plugins.mjs` yerel manifest'leri okuyup `src/data/plugins.json` üretir (commit'lenir; derleme yerel yola bağlı değil). Doğrulanmış ek maddeler `src/data/plugin-facts.ts` içinde, her biri `listing-facts.md` satırına referanslı.
- **Trailer:** yerel kapak görselli `<button>`; tıklanınca `youtube-nocookie.com/embed/8xBx2NWgHsE?autoplay=1&rel=0` iframe'i eklenir. Açılışta YouTube'a hiç istek gitmez.
- **Sürüm:** sayfa boşta kalınca (`requestIdleCallback`) GitHub API isteği, `sessionStorage`'da 1 saat önbellek, yer ayrılmış alan (kayma yok), hata olursa sessizce gizli.
- **Meta:** sayfa başına title, description, canonical, OG/Twitter (`og-image.png` 1200×630), favicon seti + `site.webmanifest`, `theme-color #18181B`, JSON-LD `SoftwareApplication` (Windows, ücretsiz, sürüm yazmadan). `sitemap.xml`, `robots.txt`.
- **Eski adresler:** `/` aynı; `#hero #features #workflow #open-source` çapaları yeni bölümlerde durur; `/Assets/Logo/24_pixel.png` ve `512_pixel.png` aynı yolda yeni logoyla (logo paketi bunu öneriyor); `/Assets/Screenshots/{screen,AI-hub,Color}.png` aynı yolda yeni koyu arayüzle güncellenir. Canlıda başka alt yol olmadığı için yönlendirme ve `vercel.json` gerekmiyor; deploy ayarına dokunulmuyor.
- **Doğrulama araçları (devDependency):** Playwright (1440 ve 390 ekran görüntüleri → `redesign/screenshots/`, axe ile erişilebilirlik ve kontrast taraması), Lighthouse CLI mobil → `redesign/lighthouse/`, `scripts/check-links.mjs` (dist içi linkler + dış linkler için HEAD).

## 7. Riskler

1. **Vercel temiz URL:** `/plugins` isteğinin `plugins/index.html`'e çözülmesi beklenir; dal push'undan sonra Vercel önizleme dağıtımı oluşursa orada doğrulanmalı. Sorun çıkarsa yalnız dosya yapısı değişir, deploy ayarı değil.
2. **Store metniyle çelişki:** canlı Store listesi 1.1.0 metnini taşıyor; site doğru bilgiyi verdiğinde ikisi çelişecek. Store listesinin güncellenmesi ve gizlilik URL'sinin `https://kobar.org/privacy` yapılması senin işin (CHANGES.md'ye yazılacak).
3. **Screenshot Studio deposunda lisans dosyası yok** (diğer 12 plugin MIT). Lisans sayfası depo bazında doğru bilgiyi verir; "tüm plugin'ler MIT" denmez.
4. **Gizlilik iddiaları:** kodla doğrulanamayan hiçbir cümle yazılmaz (bkz. §5a). AI Hub anahtarlarının DPAPI'ye taşınması ve Snippet Vault parolasının düz metin saklanması uygulama/eklenti tarafında düzeltilmesi gereken işler; site yalnızca bugünkü gerçeği anlatır. Düzeltme gelirse gizlilik sayfası tek paragrafla güncellenir.
5. **Pin Window to Top** için UI kesiti yok; plugin sayfasında yalnız ikon + metin.
6. **Hidrasyon uyuşmazlığı:** zamana/tarayıcıya bağlı her şey (sürüm, kafa) yalnız istemcide, mount sonrası çizilir.
7. **Lighthouse mobil 90+:** LCP adayı hero görseli; AVIF, doğru `sizes`, preload ve sistem gövde fontu ile karşılanır. React çalışma zamanı (~60 KB gz) TBT'yi düşük tutar.
8. **GitHub API sınırı** (IP başına saatte 60): aşılırsa sürüm satırı görünmez, başka bir şey bozulmaz.

## 8. Uygulama sırası ve commit planı

1. `chore`: bağımlılık temizliği, SSG eklentisi, çok sayfalı iskelet, tasarım belirteçleri (tokens)
2. `feat`: logo paketi, favicon seti, OG görseli, eski logo yollarının güncellenmesi
3. `feat`: optimize edilmiş ekran görüntüleri (AVIF/WebP) ve eski screenshot yollarının güncellenmesi
4. `feat`: header, footer, sağ kenar barı, kafa bileşeni
5. `feat`: ana sayfa bölümleri (hero, trailer, özellikler, plugin vitrini, gizlilik özeti, açık kaynak, indir + SSS)
6. **DUR:** Playwright ile 1440 ve 390 ekran görüntüleri → `redesign/screenshots/`, sana gösterim, geri bildirim
7. `feat`: `/plugins` · 8. `feat`: `/privacy` · 9. `feat`: `/license` + `404`
10. `chore`: sitemap, robots, meta, JSON-LD · 11. `docs`: Lighthouse raporu, link kontrolü, `redesign/CHANGES.md`

İlk push 1. adımdan sonra; dal linkini o zaman paylaşırım.

**Model kullanımı:** mimari, tasarım, metin ve gizlilik doğrulaması ana oturumda (güçlü model). Görsel optimizasyonu, manifest senkronu, link kontrolü ve lint düzeltmeleri küçük modelle çalışan alt ajanlara.
