/**
 * 1. 트리 구조에서 특정 ID를 가진 노드까지의 경로를 찾는 함수
 */
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

/**
 * 2. 브레드크럼을 화면에 그리는 함수
 */
function renderBreadcrumb(targetId) {
  const breadcrumbEl = document.querySelector(".breadcrumb");
  if (!breadcrumbEl) return;

  // siteTree가 로드되었는지 확인
  if (typeof siteTree === 'undefined') {
    console.error("siteTree.js가 로드되지 않았습니다.");
    return;
  }

  const path = findPath(siteTree, targetId);
  if (!path) return;

  breadcrumbEl.innerHTML = "";

  // --- 경로 계산 로직 ---
  const pathName = window.location.pathname;
  // 파일명을 제외한 현재 폴더 경로 추출
  const directoryPath = pathName.substring(0, pathName.lastIndexOf('/'));
  
  // 저장소 이름(Data_Structure) 이후의 폴더 개수를 세어 깊이(depth) 측정
  // .split("Data_Structure") 대신 범용적으로 쓸 수 있게 다듬음
  const pathSegments = directoryPath.split("/").filter(Boolean);
  const repoIndex = pathSegments.indexOf("Data_Structure");
  
  // 만약 저장소 이름을 찾았다면 그 이후의 폴더 개수만큼 ../ 추가
  let prefix = "";
  if (repoIndex !== -1) {
    const depth = pathSegments.length - (repoIndex + 1);
    prefix = "../".repeat(depth);
  } else {
    // 로컬 환경(Live Server 등) 대응
    // 최상위에 index.html이 있다고 가정하고 depth 계산
    const depth = pathSegments.length; 
    prefix = "../".repeat(depth);
  }

  // --- HTML 생성 로직 ---
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
      // siteTree에 적힌 url 앞에 ../ (prefix)를 붙여줍니다.
      a.href = prefix + node.url;
      a.textContent = node.title;
      breadcrumbEl.appendChild(a);
    }
  });
}

// 외부에서 쓸 수 있게 전역으로 노출 (type="module"을 안 쓸 경우 대비)
window.renderBreadcrumb = renderBreadcrumb;
