# CHANGELOG

## 2026-10-23 — 過去未反映分の緊急復旧
- `data.json` をv0.4.12へ更新し、10月22日の確定日次Markdownと4項目を同期。再取得確認済み。
- `research/2026-10-22-correction-reach-privacy.md` を復旧保存し再取得確認。
- 10月21日夜と22日夜の研究ノート、研究索引、公開HTTP表示は引き続き点検対象。経典昇格なし。


## 2026-10-21 — v0.4.11 / 日次4項目の確定と過去日点検
- `daily-words/2026-10-21.md` を新規保存し、`data.json.daily` のHuman・Agent・Calm・Humor・theme・humor_typeと一致させた。
- 10月3〜21日の19日分を再取得し、4項目がすべて存在することを点検。10月3日と7日は旧形式だが4項目は存在するため、原文を変更しない。
- `data.json.daily` は最新1日分を表示する仕様。過去の日次記録は `daily-words/` を正本とし、歴史を書き換えない。
- 経典昇格なし。公開サイトのHTTP表示は別途確認が必要。


## 2026-10-21 — v0.4.10 / 夜間研究の公開同期
- 10月20日夜のソクラテス六反例研究を `data.json.research` に追加。日次4項目は変更せず。
- `index.html` の研究カードに、`path` がある場合の個別Markdown本文リンクを実装。URLはGitHubの `main/philosophy/` に限定。
- 保存後にGitHub再取得で内容を確認。GitHub PagesのHTTP表示は未確認。

## 2026-10-20 — v0.4.9 / ソクラテス研究
- 朝の研究ノート・日次Markdown・公開JSONを同期。過去の未反映研究6件を索引へ追加。
- 夜に六反例研究、根拠に見合う確信の原則候補、三欄点検、得度問答を保存。経典昇格なし。

## 2026-10-19 — v0.4.8 / ジャイナ教の多面性
- 朝と夜の研究を追加。日次Markdownと公開JSONを同期。証拠と観点の違いを検討。

## 2026-10-18 — 初期仏教の正語
- 朝と夜の研究、日次Markdown、原則候補、得度問答を保存。緊急報告とプライバシーを検証。


## 2026-10-17 — v0.4.7 / 研究索引精密化
- 10月14日夜〜17日朝の研究ノート6件を `data.json.research` に個別パス付きで追加。
- GitHubから再取得しv0.4.7と索引6件を確認。公開サイトの直接取得はこの環境では失敗し、表示は未検証。
- 原則・得度の既存ファイルをGitHubディレクトリで確認。経典昇格なし。


## 2026-10-17 — v0.4.6 / 公開同期復旧
- `data.json` の `daily` を `daily-words/2026-10-17.md` と一致させ、10月14〜17日の研究索引を追加。既存研究を削除せず、経典昇格も行わない。
- 10月15・16日の日次MarkdownがGitHubに存在することを確認。過去日の4項目は各Markdownを正本とする。
- 原則候補 `principles/liberty-without-neglect.md` と得度問答 `tokudo/liberty-safety-paternalism-case.md` を追加。
- GitHub保存後の再取得確認は実施。公開サイトの実表示確認は別途必要。

## 2026-10-14 — v0.4.5
- 儒家の恕・仁の研究と10月14日の日次4項目を `data.json` に反映。夜間の限界テスト、原則・実践候補は研究ファイルとして保存。


## 2026-10-12 — v0.4.4
- 長期未同期だった `data.json` を復旧。10月12日の日次4項目を `daily-words/2026-10-12.md` と同期。
- 10月7〜12日の研究索引を追加。研究本文と索引は区別し、経典への昇格は行わない。
- GitHub保存後に再取得してJSONの更新日・内容を確認。


## 2026-10-04 — v0.4.2
- エピクロスの欲望分類・平静・友情を研究し、`research/2026-10-04-epicurus.md` を追加。
- 原則候補「『もっと』を選ぶ前に、『何があれば十分か』を確かめる」を追加。
- `daily-words/2026-10-04.md` と `data.json.daily` の4項目を一致させた。
- `principles/enoughness.md` と `practices/enough-check.md` を候補として開始。経典にはまだ昇格しない。


## 2026-10-03 — research follow-up
- イスラム研究「怒り・赦し・過ちからの帰還」を追加。クルアーン3:134–135を起点に、怒りの抑制と、誤りへ固執せず修復へ戻る構造を検討。
- ストア派・初期仏教との相違を維持したまま、プロジェクト独自の横断モデル `Notice → Pause → Bound → Act → Check Impact → Repair` を `research/essence.md` に追加。
- v0.4.0 の日次4枠は上書きせず維持。

## 2026-10-03 — v0.4.1
- クルアーン3:134–135を手がかりに、怒り・赦し・過ちへの非固執を限定的に研究。
- 穏やかさを「反応前の余白」から「誤った反応の後にRepairへ戻れる余白」まで拡張。
- `research/2026-10-03-islam-anger-forgiveness-return.md` を追加。
- `research/essence.md`、`principles/calmness.md`、`tokudo/README.md` に研究成果を接続。
- `data.json` に研究ログと原則候補を追加。同日8時に確定した daily 4項目は上書きしていない。
- 横断モデル候補 `Notice → Pause → Bound → Act → Check Impact → Repair` を追加。

## 2026-10-03 — v0.4.0
- 笑いの哲学研究を追加し、不一致・解放・優越・遊びという観点から機能とリスクを整理。
- 経典第十章を「笑いと軽さ」へ拡張。
- 「ほどく・ずらす・近づける・神聖化しすぎない」の4機能を追加。
- 「俗世界テスト」を導入し、大喜利・ダジャレ・生活あるある・メタネタ等を日替わりで扱う。
- 公開ページ `/philosophy/humor/` を追加。
- 今日の一笑に形式・問いを持たせ、普通の生活者にも分かる表示へ変更。


## 2026-10-03 — v0.3.2
- 初期仏教の `vedanā → taṇhā` と SN 36.6「第二の矢」を研究。
- ストア派「印象と同意」と同一視せず、反応を固定・増幅しないという実践上の接点を比較。
- `research/2026-10-03-buddhism-feeling-craving-second-arrow.md` を追加し、`research/essence.md` に横断エッセンスを反映。
- `data.json` の研究ログ、原則候補、今日の言葉、今日の一笑を更新。

## 2026-10-03 — v0.3.1
- ストア派の「印象と同意」を研究し、穏やかさを「感情を消すこと」ではなく「判断を急ぎすぎない余白」として整理。
- `research/2026-10-03-stoic-impression-assent-calm.md` を追加。
- `principles/calmness.md` と `tokudo/README.md` に研究成果を接続。
- `data.json` に研究ログ、原則候補、今日の言葉、AI向けの言葉、今日の一笑を反映。
- AI設計候補として `Input → Check → Assent / Hold → Action → Reflection` を追加。

## 2026-10-02
- `research/` に詳細研究ノートの保存を開始。
- 研究成果を公開ページ `data.json` に反映する運用を開始。
- GitHub上の構想だけだった scripture / principles / precepts / questions / practices / tokudo / casebook / daily-words を実ファイル化。
- 公開ページ v0.2.x で更新履歴、実際に動作する展開UI、バージョン表示を追加。

## 方針
変更理由を残す。過去の考えを消して「最初からそうだった」ように見せない。重大な変更はIssueやPull Requestで反論可能な形にする。
