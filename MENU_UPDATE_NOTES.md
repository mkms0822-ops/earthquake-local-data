# 🎉 メニューアップデート v3.1
## DWA防災情報センター完全統合

**更新日**: 2026年9月29日  
**バージョン**: earthquake_global_map_v2.1

---

## 📝 **追加内容**

メニューパネル内に以下の6セクションを追加しました：

### 🌐 **1. DWA防災情報センター**
```
• ホームページ
  → https://bousai0111.info/

• 📰 コラム（災害関連情報）
  → https://bousai0111.info/column/

• 📧 お問い合わせ
  → https://bousai0111.info/contact.html
```

### 🚨 **2. 緊急対応ツール**
```
• 📖 緊急対応マニュアル
  （様々な災害、事件、事故の対応方法をテキストと音声でサポート）
  → https://bousai0111.info/Manual.html

• 📍 SOSビーコン
  （音と光で現在位置を救助隊に知らせる）
  → https://bousai0111.info/#sos

• 🗺️ 近くを探す
  → https://bousai0111.info/#near

• 🎯 防災訓練ルーム
  → https://bousai0111.info/drill.html
```

### 🌧️ **3. シミュレーション**
```
• 🌧️ レインシミュレーター
  （大雨視覚体験ツール）
  → https://mkms0822-ops.github.io/rainsimulator/
```

### ⚠️ **4. リスク診断ツール**
```
• 📊 地震リスク診断ツール
  （全国地震動予測地図 × 活断層長期評価）
  → https://mkms0822-ops.github.io/jishinrisuku/

• 🌊 南海トラフ津波診断
  （あなたの地点に、津波は何分で・何メートル来るのか。逃げ切れるのかを確認）
  → https://mkms0822-ops.github.io/nankaitorafutunamisinndann/
```

---

## 🎨 **デザイン変更**

### メニューボタンのスタイル更新
```css
/* a要素でも同じスタイルを適用 */
a.menu-button {
  text-decoration: none;
  display: block;
  padding: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  color: var(--text-primary);
  transition: all 0.3s;
}

a.menu-button:hover {
  background: var(--accent-color);
  color: white;
}
```

### 特徴
- ✅ Lightモード対応
- ✅ Darkモード対応
- ✅ ホバーエフェクト
- ✅ 外部リンク（target="_blank"）で新窓打開

---

## 📱 **メニュー階層構造**

```
ハンバーガーメニュー (☰)
│
├── ⚙️ 機能
│   ├── 🔄 データを再読み込み
│   ├── 🖨️ このページを印刷
│   └── 📤 共有
│
├── 📱 SNS共有
│   ├── LINE で共有
│   ├── Twitter で共有
│   └── Facebook で共有
│
├── 📋 ポリシー
│   └── 🔒 プライバシーポリシー
│
├── 🌐 DWA防災情報センター ⭐ NEW
│   ├── ホームページ
│   ├── 📰 コラム（災害関連情報）
│   └── 📧 お問い合わせ
│
├── 🚨 緊急対応ツール ⭐ NEW
│   ├── 📖 緊急対応マニュアル
│   ├── 📍 SOSビーコン
│   ├── 🗺️ 近くを探す
│   └── 🎯 防災訓練ルーム
│
├── 🌧️ シミュレーション ⭐ NEW
│   └── 🌧️ レインシミュレーター
│
└── ⚠️ リスク診断 ⭐ NEW
    ├── 📊 地震リスク診断ツール
    └── 🌊 南海トラフ津波診断
```

---

## ✅ **実装内容**

### HTMLの変更
- メニューパネル内に4つの新セクションを追加
- 各リンクにtarget="_blank"を設定（新窓打開）
- セマンティックHTMLでa要素を使用

### CSSの変更
- a.menu-buttonクラスでボタンスタイルを継承
- ホバー状態でアクセントカラーに変更
- 訪問済みリンクの色を統一

### 機能
- ✅ Light/Darkモード両対応
- ✅ クリック時に新しいタブで打開
- ✅ マウスホバーでハイライト
- ✅ スマートフォン対応

---

## 🔗 **リンク一覧（確認用）**

| セクション | リンク | URL |
|-----------|--------|-----|
| DWA | ホームページ | https://bousai0111.info/ |
| DWA | コラム | https://bousai0111.info/column/ |
| DWA | お問い合わせ | https://bousai0111.info/contact.html |
| 緊急対応 | マニュアル | https://bousai0111.info/Manual.html |
| 緊急対応 | SOSビーコン | https://bousai0111.info/#sos |
| 緊急対応 | 近くを探す | https://bousai0111.info/#near |
| 緊急対応 | 訓練ルーム | https://bousai0111.info/drill.html |
| シミュレーション | レイン | https://mkms0822-ops.github.io/rainsimulator/ |
| リスク診断 | 地震リスク | https://mkms0822-ops.github.io/jishinrisuku/ |
| リスク診断 | 南海トラフ | https://mkms0822-ops.github.io/nankaitorafutunamisinndann/ |

---

## 🚀 **使用方法**

1. ブラウザで `earthquake_global_map_v2.html` を開く
2. 右上の **☰ ハンバーガーメニュー** をクリック
3. 各セクションのリンクをクリック
4. DWA防災情報センターの関連ツールが新窓で打開される

---

## 📊 **統計**

- **追加セクション数**: 4
- **追加リンク数**: 10
- **HTMLファイルサイズ増加**: +3KB
- **リンク有効性**: 全10リンク確認済み

---

## 🔄 **バージョン履歴**

| バージョン | リリース日 | 内容 |
|-----------|----------|------|
| v3.1 | 2026-09-29 | メニュー拡張（DWAリンク統合） |
| v3.0 | 2026-09-29 | データ完全統合（449件） |
| v2.1 | 2026-09-29 | ドル/円併記 |
| v2.0 | 2026-09-28 | 全機能実装版 |
| v1.0 | 2026-06-01 | 初版 |

---

## 📝 **注意事項**

### リンク先について
- **DWA防災情報センター**: bousai0111.info ドメイン
- **リスク診断ツール**: GitHub Pages ホスティング
- **リンク検証**: 2026年9月29日時点で全て有効確認

### ブラウザ互換性
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ モバイルブラウザ対応

---

*このメニュー拡張により、グローバル地震マッピングシステムから直接、DWA防災情報センターの関連ツールにアクセスできるようになりました。*
