/**
 * 無料相談フォーム送信処理
 * Google Apps Script（GAS）と連携してデータをスプレッドシートに保存
 */

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('consultation-form');

  // フォームが存在しない場合は処理しない
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');

  // GASのウェブアプリURL（デプロイ後にここに貼り付け）
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzsFBgCkJn8bIBkNp3udSCXvyyoLSENZYtM58qnq4P6qknesTHTStiULXi9o17qWLgN/exec';

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // バリデーションチェック
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // ボタンを無効化
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    formMessage.style.opacity = '1';
    formMessage.style.display = 'none';

    // フォームデータを取得
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      job: document.getElementById('job').value.trim(),
      content: document.getElementById('content').value.trim(),
      datetime: document.getElementById('datetime').value.trim(),
      source: document.getElementById('source').value
    };

    try {
      // GAS URLが設定されているか確認
      if (GAS_URL === 'YOUR_GAS_WEB_APP_URL_HERE') {
        throw new Error('GAS URLが設定されていません');
      }

      const response = await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors', // CORS制限を回避（GASの仕様）
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // no-corsモードではresponseの内容を読めないため、常に成功として扱う
      // GAS側でエラーが発生した場合は、メール通知で気づく
      showSuccessMessage();
      form.reset();

      // Googleアナリティクスイベント送信（設定されている場合）
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
          'event_category': 'consultation',
          'event_label': 'success'
        });
      }

    } catch (error) {
      console.error('Form submission error:', error);
      showErrorMessage(error.message);

      // Googleアナリティクスイベント送信（設定されている場合）
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
          'event_category': 'consultation',
          'event_label': 'error'
        });
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '無料相談を申し込む';
    }
  });

  /**
   * 成功メッセージを表示
   */
  function showSuccessMessage() {
    formMessage.className = 'form-message success';
    formMessage.textContent = 'お申し込みありがとうございます。2営業日以内にメールでご連絡いたします。';
    formMessage.style.display = 'block';
    formMessage.style.opacity = '1';

    // メッセージを5秒後にフェードアウト
    setTimeout(() => {
      formMessage.style.opacity = '0';
      setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
        formMessage.style.opacity = '1';
      }, 300);
    }, 5000);
  }

  /**
   * エラーメッセージを表示
   */
  function showErrorMessage(message) {
    formMessage.className = 'form-message error';
    formMessage.style.display = 'block';
    formMessage.style.opacity = '1';

    if (message === 'GAS URLが設定されていません') {
      formMessage.textContent = 'フォームの設定が完了していません。しばらくお待ちください。';
    } else {
      formMessage.textContent = '送信に失敗しました。もう一度お試しいただくか、メールでお問い合わせください。';
    }
  }
});
