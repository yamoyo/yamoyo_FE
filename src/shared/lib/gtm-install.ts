export const installGTM = (gtmId: string) => {
  // dataLayer init
  window.dataLayer ??= [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  // head script 삽입
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
};
