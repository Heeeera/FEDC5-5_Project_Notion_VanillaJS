// innerText로 추출한 text를 마크다운 문법에 따라 HTML로 변환
export const textToHtml = (text) => {
  if (!text) return text;
  const html = text
    .replace(/<div># (.+?)<\/div>/gm, "<h1>$1</h1>")
    .replace(/<div>## (.+?)<\/div>/gm, "<h2>$1</h2>")
    .replace(/<div>### (.+?)<\/div>/gm, "<h3>$1</h3>")
    .replace(/<div>#### (.+?)<\/div>/gm, "<h4>$1</h4>")
    .replace(/<div>##### (.+?)<\/div>/gm, "<h5>$1</h5>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/~~(.*?)~~/g, "<del>$1</del>")
    .replace(/__(.*?)__/g, "<u>$1</u>");
  return html;
};
