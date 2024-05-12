import DocumentListPage from "./pages/DocumentListPage.js";
import DocumentEditPage from "./pages/DocumentEditPage.js";

import { initRouter } from "./utils/router.js";
import { request } from "./utils/api.js";
import { validDocument, validDocumentsArray } from "./utils/validation.js";
import Introduction from "./components/Introduction.js";

export default function App({ $target }) {
  const documentListPage = new DocumentListPage({
    $target,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      id: "new",
      document: {
        title: "제목 없음",
        content: "",
      },
    },
  });

  const introduction = new Introduction({ $target });

  this.route = async () => {
    const documents = await request("/documents");
    try {
      validDocumentsArray(documents);
    } catch (error) {
      console.error(error);
    }

    documentListPage.setState({
      documents,
      selectedId: null,
    });

    const { pathname } = window.location;

    // 루트 경로일 때 소개글 렌더링
    if (pathname === "/" && $target.querySelector(".document-edit-page")) {
      $target.removeChild($target.querySelector(".document-edit-page"));
      introduction;

      return;
    }

    if (pathname !== "/" && $target.querySelector(".introduction-container")) {
      $target.removeChild($target.querySelector(".introduction-container"));
    }

    if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");

      if (id !== "new") {
        const document = await request(`/documents/${id}`);
        try {
          validDocument(document);
        } catch (error) {
          console.error(error);
        }

        documentListPage.setState({
          documents,
          selectedId: id,
        });

        documentEditPage.setState({
          id,
          document,
        });
      }
    }
  };

  // 뒤로가기, 앞으로 가기 동작하도록
  window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
