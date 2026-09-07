export function scrollToPageTop() {
  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.scrollBehavior;
  const prevBody = body.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  html.scrollTop = 0;
  body.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  html.style.scrollBehavior = prevHtml;
  body.style.scrollBehavior = prevBody;
}
