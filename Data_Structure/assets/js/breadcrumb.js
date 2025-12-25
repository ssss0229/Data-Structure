function findPath(node, targetId, path = []) {
  if (!node) return null;

  const newPath = [...path, node];

  if (node.id === targetId) {
    return newPath;
  }

  if (node.children) {
    for (const child of node.children) {
      const result = findPath(child, targetId, newPath);
      if (result) return result;
    }
  }

  return null;
}

function renderBreadcrumb(targetId) {
  const breadcrumbEl = document.querySelector(".breadcrumb");
  if (!breadcrumbEl) return;

  const path = findPath(siteTree, targetId);
  if (!path) return;

  breadcrumbEl.innerHTML = "";

  path.forEach((node, index) => {
    if (index > 0) {
      const sep = document.createElement("span");
      sep.textContent = "›";
      breadcrumbEl.appendChild(sep);
    }

    if (index === path.length - 1) {
      const strong = document.createElement("strong");
      strong.textContent = node.title;
      breadcrumbEl.appendChild(strong);
    } else {
      const a = document.createElement("a");
      a.href = node.url;
      a.textContent = node.title;
      breadcrumbEl.appendChild(a);
    }
  });
}