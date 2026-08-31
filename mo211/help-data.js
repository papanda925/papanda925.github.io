window.MO211_HELP = {
  paths: {
    "1.1.1":"開発 > コード > Visual Basic > Project Explorer > Modules（コピー元からコピー先へ Ctrl+ドラッグ）",
    "1.1.2":"数式バーで外部参照を作成（別ブックのセルをクリック）",
    "1.1.3":"ファイル > オプション > トラスト センター > トラスト センターの設定 > マクロの設定　／　保存時は Excel マクロ有効ブック（*.xlsm）",
    "1.1.4":"ファイル > 情報 > バージョン履歴（OneDrive / SharePoint 保存時）",
    "1.2.1":"ファイル > 情報 > ブックの保護",
    "1.2.2":"Ctrl+1 > 保護（ロック解除）→ 校閲 > シートの保護",
    "1.2.3":"校閲 > ブックの保護（構造）",
    "1.2.4":"ファイル > オプション > 数式 > 計算方法の設定（自動 / データ テーブル以外自動 / 手動）",
    "2.1.1":"データ > フラッシュ フィル　／　Ctrl + E",
    "2.1.2":"ホーム > フィル > 連続データ",
    "2.1.3":"セルに RANDARRAY 関数を入力",
    "2.2.1":"ホーム > 数値 > 表示形式 > その他の表示形式 > ユーザー定義（Ctrl+1 でも可）",
    "2.2.2":"データ > データの入力規則",
    "2.2.3":"データ > アウトライン > グループ化",
    "2.2.4":"データ > アウトライン > 小計",
    "2.2.5":"データ > データ ツール > 重複の削除",
    "2.3.1":"ホーム > 条件付き書式 > 新しいルール",
    "2.3.2":"ホーム > 条件付き書式 > 新しいルール > 数式を使用して、書式設定するセルを決定",
    "2.3.3":"ホーム > 条件付き書式 > ルールの管理",
    "3.1.1":"数式バーで IF / IFS / SWITCH / SUMIFS / LET などを入力",
    "3.2.1":"数式バーで XLOOKUP / INDEX / MATCH などを入力",
    "3.3.1":"数式バーで TODAY() / NOW() を入力",
    "3.3.2":"数式バーで WEEKDAY() / WORKDAY() を入力",
    "3.4.1":"データ > データ ツール > 統合",
    "3.4.2":"データ > 予測 > What-If 分析 > ゴール シーク / シナリオ マネージャー",
    "3.4.3":"数式バーで NPER() を入力",
    "3.4.4":"数式バーで PMT() を入力",
    "3.4.5":"数式バーで FILTER() を入力",
    "3.4.6":"数式バーで SORTBY() を入力",
    "3.5.1":"数式 > ワークシート分析 > 参照元のトレース / 参照先のトレース",
    "3.5.2":"数式 > ワークシート分析 > ウォッチ ウィンドウ",
    "3.5.3":"数式 > ワークシート分析 > エラー チェック",
    "3.5.4":"数式 > ワークシート分析 > 数式の検証",
    "3.6.1":"表示 > マクロ > マクロの記録（または 開発 > マクロの記録）",
    "3.6.2":"マクロの記録ダイアログ > マクロ名",
    "3.6.3":"表示 > マクロ > マクロの表示 > 編集（Visual Basic Editor）",
    "4.1.1":"挿入 > グラフ > おすすめグラフ > すべてのグラフ > 組み合わせ（必要な系列を第2軸へ）",
    "4.1.2":"挿入 > グラフ（箱ひげ / ヒストグラム / ウォーターフォール等）",
    "4.2.1":"挿入 > ピボットテーブル",
    "4.2.2":"ピボットテーブル分析 > フィールド リスト",
    "4.2.3":"ピボットテーブル分析 > スライサーの挿入",
    "4.2.4":"ピボットテーブル内の日付/数値を右クリック > グループ化",
    "4.2.5":"ピボットテーブル分析 > フィールド、アイテム、セット > 集計フィールド",
    "4.2.6":"値フィールドを右クリック > 値フィールドの設定 > 値の表示方法",
    "4.3.1":"挿入 > グラフ > ピボットグラフ",
    "4.3.2":"グラフ デザイン / 書式",
    "4.3.3":"グラフ デザイン > グラフ スタイル",
    "4.3.4":"ピボットグラフの展開 / 折りたたみ（階層をドリルダウン）"
  },

  formulas: {
    "1.1.2":"='[価格表.xlsx]Sheet1'!$B$5",
    "2.1.3":"=RANDARRAY(5,4,10,99,TRUE)",
    "2.3.2":"=AND($A2<TODAY(),$C2=\"未完了\")",
    "3.1.1":"=LET(売上,B2*C2,原価,D2*C2,利益,売上-原価,IF(利益>0,利益,0))",
    "3.2.1":"=XLOOKUP(A2,商品表[商品コード],商品表[単価],\"未登録\")",
    "3.3.1":"=TODAY()　 /　 =NOW()",
    "3.3.2":"=WORKDAY(A2,5,$H$2:$H$30)",
    "3.4.3":"=NPER(年利/12,-毎月返済額,借入額)",
    "3.4.4":"=PMT(年利/12,返済月数,借入額)",
    "3.4.5":"=FILTER(A2:D100,(A2:A100=\"関東\")*(D2:D100>=100000),\"該当なし\")",
    "3.4.6":"=SORTBY(A2:C100,C2:C100,-1)"
  },

  links: {
    "2.1.1":[
      {label:"Microsoft公式：フラッシュ フィルを使用する（画面例・動画あり）",url:"https://support.microsoft.com/ja-jp/excel/using-flash-fill-in-excel"},
      {label:"Microsoft公式：フラッシュ フィルを有効にする",url:"https://support.microsoft.com/ja-jp/excel/enable-flash-fill-in-excel"}
    ],
    "2.2.2":[
      {label:"Microsoft公式：セルにデータの入力規則を適用する（画面例あり）",url:"https://support.microsoft.com/ja-jp/excel/get-started/apply-data-validation-to-cells"},
      {label:"Microsoft公式：データの入力規則の詳細",url:"https://support.microsoft.com/ja-jp/excel/more-on-data-validation"}
    ],
    "2.3.2":[
      {label:"Microsoft公式：IF と AND / OR / NOT（条件付き書式の例あり）",url:"https://support.microsoft.com/ja-jp/excel/using-if-with-and-or-and-not-functions-in-excel"}
    ],
    "3.1.1":[
      {label:"Microsoft公式：LET 関数（例・動画あり）",url:"https://support.microsoft.com/ja-jp/excel/functions/let-function"}
    ],
    "3.2.1":[
      {label:"Microsoft公式：XLOOKUP 関数",url:"https://support.microsoft.com/ja-jp/excel/functions/xlookup-function"}
    ],
    "3.3.2":[
      {label:"Microsoft公式：WORKDAY 関数",url:"https://support.microsoft.com/ja-jp/excel/functions/workday-function"}
    ],
    "3.4.2":[
      {label:"Microsoft公式：ゴール シークで入力値を逆算する",url:"https://support.microsoft.com/ja-jp/excel/use-goal-seek-to-find-the-result-you-want-by-adjusting-an-input-value"}
    ],
    "3.4.5":[
      {label:"Microsoft公式：FILTER 関数（画面例あり）",url:"https://support.microsoft.com/ja-jp/excel/functions/filter-function"}
    ],
    "3.4.6":[
      {label:"Microsoft公式：SORTBY 関数（画面例あり）",url:"https://support.microsoft.com/ja-jp/excel/functions/sortby-function"}
    ],
    "3.5.2":[
      {label:"Microsoft公式：ウォッチ ウィンドウで数式と結果を確認する",url:"https://support.microsoft.com/ja-jp/excel/watch-a-formula-and-its-result-by-using-the-watch-window"}
    ],
    "3.6.1":[
      {label:"Microsoft公式：マクロ記録で作業を自動化する（画面例あり）",url:"https://support.microsoft.com/ja-jp/excel/automate-tasks-with-the-macro-recorder"}
    ],
    "4.2.1":[
      {label:"Microsoft公式：ピボットテーブルを作成してデータを分析する",url:"https://support.microsoft.com/ja-jp/excel/get-started/create-a-pivottable-to-analyze-worksheet-data"}
    ],
    "4.2.3":[
      {label:"Microsoft公式：スライサーを使用してデータをフィルターする（画面例・動画あり）",url:"https://support.microsoft.com/ja-jp/excel/get-started/use-slicers-to-filter-data"}
    ],
    "4.2.5":[
      {label:"Microsoft公式：ピボットテーブルで値を計算する（集計フィールド）",url:"https://support.microsoft.com/ja-jp/excel/calculate-values-in-a-pivottable"}
    ],
    "4.2.6":[
      {label:"Microsoft公式：ピボットテーブルの集計方法・ユーザー設定の計算を変更する",url:"https://support.microsoft.com/ja-jp/excel/change-the-summary-function-or-custom-calculation-for-a-field-in-a-pivottable"}
    ],
    "4.3.1":[
      {label:"Microsoft公式：ピボットグラフを作成する（画面例あり）",url:"https://support.microsoft.com/ja-jp/excel/get-started/create-a-pivotchart"}
    ],
    "2.1.2":[
      {label:"Microsoft公式：連続データ・系列を作成する",url:"https://support.microsoft.com/en-us/excel/project-values-in-a-series"}
    ],
    "2.2.1":[
      {label:"Microsoft公式：ユーザー定義の表示形式を作成する（画面例あり）",url:"https://support.microsoft.com/en-us/excel/get-started/create-a-custom-number-format"},
      {label:"Microsoft公式：ユーザー定義表示形式の書式コード",url:"https://support.microsoft.com/en-us/excel/review-guidelines-for-customizing-a-number-format"}
    ],
    "2.2.5":[
      {label:"Microsoft公式：一意の値を抽出／重複を削除する（画面例あり）",url:"https://support.microsoft.com/en-us/excel/get-started/filter-for-unique-values-or-remove-duplicate-values"}
    ],
    "2.3.1":[
      {label:"Microsoft公式：条件付き書式で情報を強調する（画面例あり）",url:"https://support.microsoft.com/en-us/excel/use-conditional-formatting-to-highlight-information-in-excel"}
    ],
    "3.5.1":[
      {label:"Microsoft公式：参照元・参照先を矢印で確認する（画面例あり）",url:"https://support.microsoft.com/en-US/Excel/display-the-relationships-between-formulas-and-cells"}
    ],
    "3.5.3":[
      {label:"Microsoft公式：数式のエラーを検出する",url:"https://support.microsoft.com/en-US/Excel/detect-formula-errors-in-excel"}
    ],
    "4.2.4":[
      {label:"Microsoft公式：ピボットテーブルのデータをグループ化する（画面例あり）",url:"https://support.microsoft.com/en-us/excel/get-started/group-or-ungroup-data-in-a-pivottable"}
    ],
    "4.3.4":[
      {label:"Microsoft公式：ピボットテーブル／グラフを展開・折りたたむ（画面例あり）",url:"https://support.microsoft.com/en-us/excel/expand-collapse-or-show-details-in-a-pivottable-or-pivotchart"}
    ]
  },

  contrasts: {
    "2.1.1":"フラッシュ フィル＝例からパターンを推測して値を生成。フィル シリーズ＝数値・日付などの系列を規則に従って生成。",
    "2.1.2":"フィル シリーズ＝開始値・増分・停止値などを指定。フラッシュ フィル＝文字列などの例からパターンを推測。",
    "2.2.2":"データの入力規則＝入力できる値を制限。条件付き書式＝入力値は制限せず、条件に応じて見た目を変える。",
    "2.3.2":"条件付き書式の数式＝TRUE/FALSEで『書式を付けるか』を決める。IF関数＝セルに返す値そのものを決める。",
    "3.2.1":"XLOOKUP＝検索範囲と戻り範囲を独立指定。VLOOKUP＝検索対象が表の先頭列という制約を意識。",
    "3.4.1":"統合＝複数範囲を一つの集計結果へまとめる。ピボットテーブル＝明細を項目配置で柔軟にクロス集計する。",
    "3.4.2":"ゴール シーク＝目標値から1つの入力セルを逆算。シナリオ マネージャー＝複数の入力値セットを保存・比較。",
    "3.4.5":"FILTER関数＝条件一致データを別のスピル範囲へ返す。通常のフィルター＝元表の表示行を絞り込む。",
    "3.4.6":"SORTBY関数＝並べ替えた結果を別のスピル範囲へ返す。通常の並べ替え＝元の範囲自体の順序を変更する。",
    "4.2.3":"スライサー＝ボタンで視覚的に絞り込み。通常フィルター＝ドロップダウン等で条件指定。",
    "4.2.4":"ピボットのグループ化＝ピボット項目を月・四半期・数値区間などにまとめる。アウトラインのグループ化＝ワークシートの行・列を折りたたむ。"
  },

  visuals: {
    "2.1.1": {type:"flashfill",caption:"操作イメージ（本サイト作成の模式図。実際のExcel画面そのものではありません）"},
    "2.3.2": {type:"conditional",caption:"条件付き書式で「数式を使用して、書式設定するセルを決定」を選ぶイメージ"},
    "3.2.1": {type:"xlookup",caption:"商品コードを入力するとXLOOKUPで単価が返るイメージ"},
    "3.3.2": {type:"workday",caption:"申請日・営業日数・祝日一覧からWORKDAYで期限日を求めるイメージ"},
    "3.4.2": {type:"goalseek",caption:"ゴール シークで「目標値」と「変化させるセル」を指定するイメージ"},
    "3.6.1": {type:"macro",caption:"マクロ記録を開始してから操作し、記録停止する流れのイメージ"},
    "4.2.1": {type:"pivot",caption:"元明細からピボットテーブルへフィールドを配置するイメージ"},
    "4.2.3": {type:"slicer",caption:"スライサーのボタンでピボットテーブルを絞り込むイメージ"}
  }
};