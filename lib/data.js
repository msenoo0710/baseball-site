export const reports = [
  { id: '1', title: '夏季交流戦 vs 〇〇ジュニアーズ', date: '2025-07-15', category: '試合', body: '本日の交流戦は6対4で勝利！3回裏の逆転打が試合を決めました。選手たちの成長を感じる一戦でした。全員が声を出し、最後まで諦めない姿勢が印象的でした。' },
  { id: '2', title: '守備練習レポート', date: '2025-07-08', category: '練習', body: '内野ゴロの捕球とスローイングを重点的に練習。全員の動きがどんどん良くなっています！特に6年生のリーダーシップが光りました。' },
  { id: '3', title: '市大会 準優勝！', date: '2025-06-30', category: '試合', body: '決勝戦は惜しくも2対3で敗れましたが、チーム一丸となって戦い抜きました。秋の大会に向けて練習頑張ります！' },
  { id: '4', title: '体験入団会を開催しました', date: '2025-06-22', category: 'イベント', body: '5名の新しいお友達が参加してくれました。キャッチボールやバッティングを体験。みんな楽しそうでした！' },
  { id: '5', title: '練習試合 vs 〇〇ファイターズ', date: '2025-06-15', category: '試合', body: '8対5で勝利！新しく練習したダブルプレーが実戦で決まりました。投手陣も安定した投球を見せてくれました。' },
  { id: '6', title: 'バッティング強化練習', date: '2025-06-08', category: '練習', body: 'ティーバッティングとフリーバッティングを中心に練習。下半身の使い方を意識して、力強いスイングができるようになってきました。' },
  { id: '7', title: '親子BBQ大会', date: '2025-05-25', category: 'イベント', body: '恒例の親子BBQ大会を開催！選手もお父さんお母さんも一緒に楽しい時間を過ごしました。来年もやりたいとの声多数。' },
  { id: '8', title: '地区予選 第1回戦 勝利', date: '2025-05-18', category: '試合', body: '地区予選初戦を5対1で勝利。先発の山田くんが5回を1失点に抑える好投。打線も初回から積極的に攻めました。' },
  { id: '9', title: '走塁・ベースランニング練習', date: '2025-05-11', category: '練習', body: 'リードの取り方、スライディング、タッチアップのタイミングを重点的に練習。試合で走塁ミスを減らすことが目標です。' },
  { id: '10', title: '春季大会 ベスト8', date: '2025-04-27', category: '試合', body: '準々決勝で惜しくも敗退しましたが、4年生・5年生の活躍が目立ちました。夏に向けてチーム力を高めていきます。' },
  { id: '11', title: '新入団員歓迎会', date: '2025-04-13', category: 'イベント', body: '今年度の新入団員5名の歓迎会を開催。先輩たちが優しく教える姿が印象的でした。一緒に頑張ろう！' },
  { id: '12', title: 'ノック＆キャッチボール基礎練習', date: '2025-04-06', category: '練習', body: '新年度最初の練習。基礎に立ち返り、キャッチボールの正しいフォームとノックでの捕球姿勢を確認しました。' },
];

export const reportDetail = {
  id: '3',
  title: '市大会 準優勝！最後まで諦めない全力プレー',
  date: '2025-06-30',
  category: '試合',
  body: [
    { type: 'text', content: '6月30日、〇〇市少年野球夏季大会の決勝戦が行われました。対戦相手は昨年の優勝チーム・〇〇イーグルス。選手たちは朝から気合十分で試合に臨みました。' },
    { type: 'image', caption: '試合前の円陣。「絶対勝つぞ！」の掛け声', index: 0 },
    { type: 'heading', content: '緊迫の序盤戦' },
    { type: 'text', content: '初回、先発の山田くん（6年）が三者凡退に抑える好スタート。2回表には鈴木くん（6年）のタイムリーヒットで1点を先制しました！ベンチも応援席も大盛り上がりでした。' },
    { type: 'text', content: 'しかし3回裏、相手の4番バッターに同点ホームランを打たれ1-1の振り出しに。それでも選手たちは下を向かず、声を掛け合って守備につきました。' },
    { type: 'image', caption: '鈴木くんの先制タイムリーヒット', index: 1 },
    { type: 'heading', content: '手に汗握る中盤' },
    { type: 'text', content: '4回表、佐藤くん（5年）の二塁打をきっかけに田中くん（5年）が犠牲フライ。再び2-1とリードを奪います。5年生コンビの活躍にチームの層の厚さを感じました。' },
    { type: 'text', content: '5回裏、ピンチの場面でショートの佐藤くんがファインプレー！難しいゴロを確実にさばき、ダブルプレーで切り抜けました。この日一番の盛り上がりでした。' },
    { type: 'image', caption: '佐藤くんのファインプレー！ダブルプレー完成', index: 2 },
    { type: 'heading', content: '惜しくも逆転を許す' },
    { type: 'text', content: '最終回の6回裏、疲れの見えた山田くんから連打を浴び、2-3と逆転を許してしまいました。最後の打者が倒れた瞬間、悔し涙を流す選手もいましたが、全員が最後まで全力で戦い抜いた素晴らしい試合でした。' },
    { type: 'text', content: '試合後、監督からは「準優勝おめでとう。今日の試合は君たちの成長の証だ。秋の大会では必ず優勝しよう」との言葉がありました。選手たちは涙を拭い、秋に向けて決意を新たにしていました。' },
    { type: 'image', caption: '準優勝の表彰。立派な盾をいただきました！', index: 3 },
    { type: 'heading', content: '試合結果' },
    { type: 'score', home: '〇〇', away: '〇〇イーグルス', homeScore: 2, awayScore: 3, innings: ['0','1','0','1','0','0','—','2', '0','0','1','0','0','2','—','3'] },
    { type: 'text', content: '応援に来てくださった保護者の皆さま、ありがとうございました！秋の大会に向けて、夏休みの練習を頑張っていきます。引き続き応援よろしくお願いいたします。' },
  ],
};

export const players = [
  { name: '山田 太郎', grade: '6年', position: 'ピッチャー', number: 1, throwBat: '右投左打', comment: 'チームを優勝に導く！', role: 'キャプテン', stats: { games: 24, hits: 32, avg: '.348' } },
  { name: '鈴木 次郎', grade: '6年', position: 'キャッチャー', number: 2, throwBat: '右投右打', comment: '全力プレーで勝つ！', role: '副キャプテン', stats: { games: 24, hits: 28, avg: '.311' } },
  { name: '高橋 翼', grade: '6年', position: 'ファースト', number: 3, throwBat: '左投左打', comment: 'ホームラン打つぞ！', role: null, stats: { games: 22, hits: 25, avg: '.295' } },
  { name: '伊藤 陸', grade: '6年', position: 'サード', number: 5, throwBat: '右投右打', comment: '守備は任せろ！', role: null, stats: { games: 23, hits: 20, avg: '.267' } },
  { name: '佐藤 健太', grade: '5年', position: 'ショート', number: 6, throwBat: '右投右打', comment: '守備でチームを助ける！', role: null, stats: { games: 20, hits: 18, avg: '.273' } },
  { name: '中村 大地', grade: '5年', position: 'レフト', number: 7, throwBat: '右投左打', comment: 'レギュラー目指す！', role: null, stats: { games: 18, hits: 14, avg: '.250' } },
  { name: '田中 翔', grade: '5年', position: 'センター', number: 8, throwBat: '左投左打', comment: '足を活かして盗塁王！', role: null, stats: { games: 21, hits: 22, avg: '.302' } },
  { name: '小林 悠真', grade: '5年', position: 'ライト', number: 9, throwBat: '右投右打', comment: 'バッティング磨く！', role: null, stats: { games: 16, hits: 10, avg: '.238' } },
  { name: '渡辺 蓮', grade: '4年', position: 'セカンド', number: 4, throwBat: '右投左打', comment: 'ヒットいっぱい打つ！', role: null, stats: { games: 12, hits: 8, avg: '.242' } },
  { name: '加藤 颯太', grade: '4年', position: 'ピッチャー', number: 10, throwBat: '右投右打', comment: '三振とるぞ！', role: null, stats: { games: 10, hits: 6, avg: '.214' } },
  { name: '松本 結人', grade: '4年', position: 'ショート', number: 11, throwBat: '右投右打', comment: 'エラーしない！', role: null, stats: { games: 8, hits: 5, avg: '.227' } },
  { name: '吉田 湊', grade: '3年', position: '外野手', number: 12, throwBat: '右投右打', comment: '先輩みたいになる！', role: null, stats: { games: 5, hits: 2, avg: '.200' } },
  { name: '木村 陽翔', grade: '3年', position: '内野手', number: 13, throwBat: '右投左打', comment: 'キャッチボールが楽しい！', role: null, stats: { games: 4, hits: 1, avg: '.167' } },
  { name: '山本 蒼空', grade: '2年', position: '外野手', number: 14, throwBat: '右投右打', comment: '野球大好き！', role: null, stats: { games: 2, hits: 0, avg: '.000' } },
  { name: '井上 大翔', grade: '2年', position: '内野手', number: 15, throwBat: '右投右打', comment: 'はやくしあいにでたい！', role: null, stats: { games: 1, hits: 0, avg: '.000' } },
];

export const coaches = [
  { name: '山田 正志', role: '監督', since: '2015年〜', comment: '子どもたちの笑顔が一番の宝です。野球を通じて人として成長できるよう、全力でサポートします。' },
  { name: '佐藤 雅人', role: 'コーチ', since: '2018年〜', comment: '基礎をしっかり身につけて、試合で力を発揮できるよう指導しています。一緒に頑張ろう！' },
  { name: '鈴木 健一', role: 'コーチ', since: '2020年〜', comment: 'バッティング担当です。「打てると楽しい」を実感してもらえるように教えています。' },
];
