window.MO211_HELP = {
  paths: {
    "1.1.1":"開発 > Visual Basic > Project Explorer（モジュールのエクスポート/インポート）",
    "1.1.2":"数式バーで外部参照を作成（別ブックのセルをクリック）",
    "1.1.3":"ファイル > 名前を付けて保存 > Excel マクロ有効ブック（*.xlsm）",
    "1.1.4":"ファイル > 情報 > バージョン履歴（OneDrive / SharePoint 保存時）",
    "1.2.1":"ファイル > 情報 > ブックの保護",
    "1.2.2":"Ctrl+1 > 保護（ロック解除）→ 校閲 > シートの保護",
    "1.2.3":"校閲 > ブックの保護（構造）",
    "1.2.4":"数式 > 計算方法の設定",
    "2.1.1":"データ > フラッシュ フィル　／　Ctrl + E",
    "2.1.2":"ホーム > フィル > 連続データ",
    "2.1.3":"セルに RANDARRAY 関数を入力",
    "2.2.1":"Ctrl+1 > 表示形式 > ユーザー定義",
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
    "3.4.2":"データ > What-If 分析 > ゴール シーク / シナリオ マネージャー",
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
    "4.1.1":"挿入 > グラフ > 組み合わせ（必要な系列を第2軸へ）",
    "4.1.2":"挿入 > グラフ（箱ひげ / ヒストグラム / ウォーターフォール等）",
    "4.2.1":"挿入 > ピボットテーブル",
    "4.2.2":"ピボットテーブル分析 > フィールド リスト",
    "4.2.3":"ピボットテーブル分析 > スライサーの挿入",
    "4.2.4":"ピボットテーブル内の日付/数値を右クリック > グループ化",
    "4.2.5":"ピボットテーブル分析 > フィールド、アイテム、セット > 集計フィールド",
    "4.2.6":"値フィールドを右クリック > 値フィールドの設定 > 値の表示方法",
    "4.3.1":"挿入 > ピボットグラフ",
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
    ]
  },

  visuals: {
    "2.1.1": {
      type:"flashfill",
      caption:"操作イメージ（本サイト作成の模式図。実際のExcel画面そのものではありません）"
    }
  }
};