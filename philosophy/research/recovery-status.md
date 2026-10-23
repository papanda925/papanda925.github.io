# Human × AI Philosophy Lab — 正本同期・復旧台帳

## 最新点検: 2026-10-24 朝 JST
- GitHub正本 `main/philosophy/` を確認。研究ノート `2026-10-24-seasons-impermanence-timing.md`、日次Markdown、公開JSON v0.4.17、原則候補、得度ケース、研究README、CHANGELOGを保存・再取得確認。
- 10月24日の日次4項目（Human/Agent/Calm/Humor）とテーマ・humor_typeは `daily-words/2026-10-24.md` と `data.json.daily` で一致。
- `data.json.research` は54件。うち実在本文へのリンク50件、リンク切れ0、重複0。本文リンクのない2026年9月12〜15日の旧索引4件は未解決。
- 9月の旧索引4件について、`philosophy/research` の2026-10-01以前のコミットを限定照会したが該当コミット0件。全履歴・他資料からの復元不能が確定したわけではない。本文を捏造しない。
- `index.html` が `./data.json` を読み込むコードを確認。GitHub Pagesの `/philosophy/` と `/philosophy/data.json` はこの環境からHTTP取得できず、公開反映は未確認。
- 過去の書込み拒否の根本原因は未特定。今回はファイル単位の書込みと再取得に成功。
- 経典昇格なし。次回は旧索引4件の出典調査、公開表示の再確認、前回の研究に対する反例検証を優先。自動タスクは停止しない。

---

## 過去の点検記録（2026-10-23 夜のスナップショット）

最終点検: 2026-10-23 夜 JST。対象: `papanda925/papanda925.github.io` の `main/philosophy/`。

## 確認済み（GitHub再取得）
- `daily-words/2026-10-23.md` と `data.json.daily` の Human / Agent / Calm / Humor が一致。夜間実行で朝の確定値を上書きしていない。
- `data.json` は v0.4.14 / updated=2026-10-23。
- `data.json.research` の47件の個別Markdownパスは、現行の研究本文47件に一対一で対応。欠落リンク・重複リンクとも0件。
- 10月21日夜・22日夜の研究ノートを引継ぎ文書から再構成し保存。元の逐語原稿ではない旨を明記。
- 10月22日朝、23日朝、23日夜の研究ノートが存在。
- `research/README.md` と `CHANGELOG.md` を更新。原則候補・得度問答を追加。経典昇格なし。
- `scripture/index.html`、`tokudo/index.html`、`humor/index.html` はGitHub正本に存在。

## 未解決（次回優先）
1. **2026年9月の旧研究索引4件**には対応する `research/` の本文が現行GitHubに存在しない。対象: 9/12 苦しみと行動原則、9/13 戒律、9/14 反復実践、9/15 失敗後の帰還。本文を捏造して過去原稿と称さない。既存のGit履歴・他資料を確認し、復元可能なら由来を明記して追加する。
2. **公開Pages HTTP表示**: この実行環境では `papanda925.github.io` の名前解決ができず、実表示・反映時刻は未確認。GitHubの保存成功と公開ページの実表示は区別する。
3. 10月21日夜・22日夜の復元ノートは引継ぎ記録からの再構成。元原稿との逐語一致は検証不能。
4. 以前のGitHub書込み拒否 `This tool call was blocked by OpenAI's safety checks` の根本原因は未特定。今回はファイル単位の保存と再取得に成功したが、恒久的解消とは断定しない。

## 次回手順
1. `main` のREADME・運用規則・直近研究・台帳・Git履歴を再取得。
2. 旧索引4件の実在確認と復元可能性を調査。捏造・無根拠なリンク付与はしない。
3. 当日8時の4項目は日次Markdownと公開JSONを同期。20時は原則変更しない。
4. 研究本文→索引→変更履歴を小さく保存し、都度再取得。公開HTTPを再確認する。
5. 一部失敗しても継続研究の自動タスクを停止・無効化しない。

関連: [公開復旧手順](github-publishing-runbook.md)、[研究一覧](README.md)。
