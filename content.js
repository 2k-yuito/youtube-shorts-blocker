// YouTube Shortsを非表示にする関数
function hideShortsElements() {
  // Shortsのセクション全体を非表示
  const shortsSelectors = [
    'ytd-rich-section-renderer', // ホーム画面のShortsセクション
    'ytd-reel-shelf-renderer',   // Shortsの棚
    '[is-shorts]',                // Shorts動画
    'ytd-guide-entry-renderer:has([title="ショート"])', // サイドバーのShortsリンク
  ];

  shortsSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      // Shortsかどうかチェック
      if (el.textContent.includes('Shorts') || 
          el.textContent.includes('ショート') ||
          el.querySelector('[title="ショート"]')) {
        el.style.display = 'none';
      }
    });
  });

  // Shorts専用ページへのアクセスをブロック
  if (window.location.pathname.includes('/shorts/')) {
    document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 24px; color: #666;">YouTube Shortsはブロックされています</div>';
  }
}

// ページ読み込み時に実行
hideShortsElements();

// DOM変更を監視して動的に追加されるShortsも非表示
const observer = new MutationObserver(hideShortsElements);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('YouTube Shorts Blocker: 有効');