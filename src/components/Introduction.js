export default function Introduction({ $target }) {
  const $introduction = document.createElement("div");

  $introduction.className = "introduction-container text-container";

  $introduction.innerHTML = `
    <div class="title-box">
      <div class="title-top-margin"></div>
      <h1>👋시작하기</h1>
    </div>
    <p>자바스크립트만을 이용하여 제작한 자동 저장 편집기입니다.</p>
    <p>일부 마크다운 문법을 사용할 수 있습니다.</p>
    <br>
    <h1>제목1</h1>
    <h2>제목2</h2>
    <h3>제목3</h3>
    <h4>제목4</h4>
    <h5>제목5</h5>
    <p><strong>볼드</strong></p>
    <p><em>이탤릭</em></p>
    <p><del>취소선</del></p>
    <p><u>밑줄</u></p>
  `;

  this.render = () => {
    $target.appendChild($introduction);
  };

  this.render();
}
