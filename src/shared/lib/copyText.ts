export async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // 실패하면 대체 방법 시도
  }

  // 대체 방법
  try {
    const ta = document.createElement('textarea');
    ta.value = text;

    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';

    document.body.appendChild(ta);

    ta.focus();
    ta.select();
    ta.setSelectionRange(0, ta.value.length); // iOS 대응

    const ok = document.execCommand('copy');
    document.body.removeChild(ta);

    return ok;
  } catch {
    return false;
  }
}
