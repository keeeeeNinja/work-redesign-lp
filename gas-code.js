/**
 * Google Apps Script (GAS) - 無料相談フォーム バックエンド
 *
 * 【設定手順】
 * 1. Googleスプレッドシートを作成: https://sheets.google.com/
 * 2. シート名を「相談申込み」に変更
 * 3. 1行目に列名を入力: タイムスタンプ | お名前 | メールアドレス | 職種・役職 | 相談内容 | 希望日時 | 流入経路
 * 4. スプレッドシート上部メニュー → 拡張機能 → Apps Script
 * 5. このコードを貼り付け
 * 6. sendNotificationEmail 関数内のメールアドレスを変更
 * 7. デプロイ → 新しいデプロイ → ウェブアプリ → デプロイ
 * 8. ウェブアプリURLをコピーして、form.js の GAS_URL に貼り付け
 */

/**
 * POSTリクエストを受け取る関数
 * フォームから送信されたデータをスプレッドシートに保存
 */
function doPost(e) {
  try {
    // スプレッドシートを取得
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('相談申込み');

    if (!sheet) {
      throw new Error('シート「相談申込み」が見つかりません');
    }

    // POSTデータをパース
    const data = JSON.parse(e.postData.contents);

    // データ検証
    if (!data.name || !data.email || !data.content || !data.datetime) {
      throw new Error('必須項目が入力されていません');
    }

    // スプレッドシートに新しい行を追加
    sheet.appendRow([
      new Date(),              // タイムスタンプ
      data.name,               // お名前
      data.email,              // メールアドレス
      data.job || '',          // 職種・役職
      data.content,            // 相談内容
      data.datetime,           // 希望日時
      data.source || ''        // 流入経路
    ]);

    // メール通知を送信
    sendNotificationEmail(data);

    // 申込者に自動返信メールを送信（オプション）
    sendConfirmationEmail(data);

    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: '送信完了しました'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // エラーログを記録
    Logger.log('Error in doPost: ' + error.toString());

    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'エラーが発生しました: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 管理者に通知メールを送信
 * @param {Object} data - フォームデータ
 */
function sendNotificationEmail(data) {
  // ★★★ ここにあなたのメールアドレスを設定 ★★★
  const recipient = 'your-email@example.com';

  const subject = '【新規相談申込み】' + data.name + '様';

  const body = `
新しい相談申込みがありました。

━━━━━━━━━━━━━━━━━━━━━━
■ お名前
${data.name}

■ メールアドレス
${data.email}

■ 職種・役職
${data.job || '（未記入）'}

■ 相談内容
${data.content}

■ 希望日時（第1〜3希望）
${data.datetime}

■ 流入経路
${data.source || '（未記入）'}

■ 申込み日時
${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
━━━━━━━━━━━━━━━━━━━━━━

スプレッドシートで詳細を確認:
${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
  `.trim();

  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body
    });
    Logger.log('通知メール送信成功: ' + recipient);
  } catch (error) {
    Logger.log('通知メール送信エラー: ' + error.toString());
  }
}

/**
 * 申込者に確認メールを送信（オプション）
 * @param {Object} data - フォームデータ
 */
function sendConfirmationEmail(data) {
  const subject = '【無料相談お申し込み受付】仕事のやり方再設計';

  const body = `
${data.name} 様

この度は無料相談にお申し込みいただき、ありがとうございます。

以下の内容で受け付けました。
2営業日以内にメールでご連絡いたしますので、しばらくお待ちください。

━━━━━━━━━━━━━━━━━━━━━━
■ お名前
${data.name}

■ メールアドレス
${data.email}

■ 職種・役職
${data.job || '（未記入）'}

■ 相談内容
${data.content}

■ 希望日時（第1〜3希望）
${data.datetime}
━━━━━━━━━━━━━━━━━━━━━━

※ このメールは自動送信されています。
※ ご不明点がございましたら、このメールに返信してください。

――――――――――――――――――――
仕事のやり方再設計
――――――――――――――――――――
  `.trim();

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body
    });
    Logger.log('確認メール送信成功: ' + data.email);
  } catch (error) {
    Logger.log('確認メール送信エラー: ' + error.toString());
  }
}

/**
 * テスト用関数
 * Apps Scriptエディタで実行して動作確認できます
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'テスト 太郎',
        email: 'test@example.com',
        job: 'エンジニア',
        content: 'これはテストです',
        datetime: '12/25 14:00\n12/26 10:00',
        source: 'テスト'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
