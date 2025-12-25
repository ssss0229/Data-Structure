function renderBreadcrumb(targetId) {
  const breadcrumbEl = document.querySelector(".breadcrumb");
  if (!breadcrumbEl) return;

  const path = findPath(siteTree, targetId);
  if (!path) return;

  breadcrumbEl.innerHTML = "";

  // 1. 현재 페이지의 깊이(Depth) 계산
  // 예: linear/stack.html 에 있다면 깊이는 1 (../ 한 번 필요)
  // 예: nonlinear/tree/binary-tree.html 에 있다면 깊이는 2 (../../ 두 번 필요)
  const currentPath = window.location.pathname;
  // GitHub Pages 저장소 이름(Data_Structure) 이후의 경로만 추출
  const pathAfterRepo = currentPath.split("docs/")[1] || "";
  const depth = (pathAfterRepo.match(/\//g) || []).length;
  const prefix = "../".repeat(depth);

  path.forEach((node, index) => {
    if (index > 0) {
      const sep = document.createElement("span");
      sep.textContent = " › ";
      breadcrumbEl.appendChild(sep);
    }

    if (index === path.length - 1) {
      const strong = document.createElement("strong");
      strong.textContent = node.title;
      breadcrumbEl.appendChild(strong);
    } else {
      const a = document.createElement("a");
      
      // 2. 경로 앞에 계산된 prefix(../)를 붙여줍니다.
      // 단, 루트(index.html)로 갈 때는 prefix만으로도 충분하거나 prefix + url 구조가 되어야 합니다.
      a.href = prefix + node.url;
      
      a.textContent = node.title;
      breadcrumbEl.appendChild(a);
    }
  });
}

