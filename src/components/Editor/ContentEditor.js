import { textToHtml } from "../../utils/transfer.js";

export default function ContentEditor({
  $target,
  initialState,
  onContentEditing,
}) {
  const $contentContainer = document.createElement("div");
  $contentContainer.className = "text-container";

  $contentContainer.innerHTML = `
    <div class="input-content" contenteditable data-text="내용을 입력하세요."></div>
  `;

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    $contentContainer.querySelector(".input-content").innerHTML = textToHtml(
      this.state.content
    );
  };

  this.render = () => {
    $target.appendChild($contentContainer);
  };

  this.render();

  $contentContainer
    .querySelector(".input-content")
    .addEventListener("input", (e) => {
      onContentEditing(e.target.innerHTML);
    });
}
