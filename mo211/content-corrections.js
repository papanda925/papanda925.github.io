(() => {
  // Final review correction layer.
  // Keep the source data files simple while aligning specific items to the current MO-211 objective wording.
  const skills = window.MO211_SKILLS || [];
  const macroSkill = skills.find(s => s.id === "1.1.3");

  if (macroSkill) {
    Object.assign(macroSkill, {
      title: "ブックでマクロを有効にする",
      q: "信頼できる送信元の .xlsm ブックを開いたところ、VBAマクロが無効化されセキュリティ警告が表示されました。このブックでマクロを実行できるようにする操作として最も適切なのはどれですか。",
      options: [
        "セキュリティ警告の［コンテンツの有効化］を選び、この文書を信頼する",
        "ブックをCSV形式で保存する",
        "数式の計算方法を手動にする",
        "ワークシート保護を解除する"
      ],
      answer: 0,
      explanation: "信頼できるブックで、マクロが通知付きで無効化されている場合は、セキュリティ警告から［コンテンツの有効化］を選んでその文書のマクロを有効化できます。信頼できないファイルのマクロは有効にしません。",
      practice: "自分で作成した安全なマクロ有効ブックを使い、マクロが通知付きで無効化された状態から、そのブックだけを信頼してマクロを実行できるようにする流れを確認してください。",
      steps: [
        "自分で作成した安全な .xlsm ブックと簡単なマクロを用意する",
        "マクロが通知付きで無効化される設定でブックを開き、セキュリティ警告を確認する",
        "［コンテンツの有効化］を選び、この文書を信頼する",
        "マクロを実行し、利用できるようになったことを確認する"
      ],
      answerText: "MO-211の対象は『Enable macros in a workbook』です。信頼できる文書に限って警告からマクロを有効化し、信頼できないファイルでは有効化しない、という安全な使い分けまで理解します。VBAを保存するには .xlsm などのマクロ対応形式が必要ですが、それは『マクロを有効にする』操作とは別です。"
    });
  }

  if (window.MO211_VARIANTS) {
    window.MO211_VARIANTS["1.1.3"] = [{
      prompt: "自分で作成した信頼できるテスト用 .xlsm を開き、セキュリティ警告が表示された状態から、そのブックのマクロを有効にして実行してください。",
      steps: [
        "信頼できるテスト用 .xlsm を用意する",
        "ブックを開いてセキュリティ警告を確認する",
        "［コンテンツの有効化］で文書を信頼する",
        "記録済みマクロを実行して確認する"
      ]
    }];
  }

  const help = window.MO211_HELP;
  if (help) {
    help.paths = help.paths || {};
    help.links = help.links || {};
    help.contrasts = help.contrasts || {};
    help.paths["1.1.3"] = "信頼できる .xlsm を開く > セキュリティ警告 > コンテンツの有効化（全体設定の確認は 開発 > マクロのセキュリティ、または ファイル > オプション > トラスト センター）";
    help.links["1.1.3"] = [
      {
        label: "Microsoft公式：Microsoft 365 ファイルでマクロを有効または無効にする",
        url: "https://support.microsoft.com/en-US/Office/vba/enable-or-disable-macros-in-microsoft-365-files"
      },
      {
        label: "Microsoft公式：Excel のマクロ セキュリティ設定を変更する",
        url: "https://support.microsoft.com/en-us/office/change-macro-security-settings-in-excel-a97c09d2-c082-46b8-b19f-e8621e8fe373"
      }
    ];
    help.contrasts["1.1.3"] = "マクロを有効にする＝信頼できるブックで実行を許可する操作。.xlsmで保存する＝VBAプロジェクトをファイルに保持する操作。目的が異なる。";
  }

  const projects = window.MO211_PROJECTS || [];
  projects.forEach(project => {
    (project.tasks || []).forEach(task => {
      if (task.skill === "1.1.3" && /マクロ有効ブック形式|マクロを保持/.test(task.text)) {
        task.text = "信頼できるテスト用マクロブックで、セキュリティ警告からこのブックのマクロを有効にし、記録したマクロを実行できることを確認してください。";
      }
    });
  });
})();