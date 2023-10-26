import PostListPage from "./pages/PostListPage.js";
import PostEditPage from "./pages/PostEditPage.js";

import { initRouter } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const postListPage = new PostListPage({
    $target,
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      id: "new",
      post: {
        title: "제목 없음",
        content: "",
      },
    },
  });

  this.route = async () => {
    const posts = await request("/documents");
    postListPage.setState({
      posts,
      selectedId: null,
    });

    const { pathname } = window.location;

    // 루트 경로일 때 편집기가 보이지 않도록 설정
    if (pathname === "/" && $target.querySelector(".post-edit-page")) {
      $target.removeChild($target.querySelector(".post-edit-page"));
      return;
    }

    if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      console.log("URL 변경");

      if (id !== "new") {
        const post = await request(`/documents/${id}`);
        postListPage.setState({
          posts,
          selectedId: id,
        });
        postEditPage.setState({
          id,
          post,
        });
      }
    }
  };

  // 뒤로가기, 앞으로 가기 동작하도록
  window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
