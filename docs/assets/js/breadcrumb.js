/**
 * 1. 트리 구조에서 특정 ID를 가진 노드까지의 경로를 찾는 함수
 * (에러 해결을 위해 함수 내부에 직접 포함시켰습니다)
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

  // siteTree가 정상적으로 로드되었는지 확인
  if (typeof siteTree === 'undefined') {
    console.error("siteTree.js가 로드되지 않았습니다. HTML에서 스크립트 순서를 확인하세요.");
    return;
  }

  const path = findPath(siteTree, targetId);
  if (!path) return;

  breadcrumbEl.innerHTML = "";

  // --- 경로 계산 로직 (로컬 & GitHub Pages 공용) ---
  const pathName = window.location.pathname;
  const directoryPath = pathName.substring(0, pathName.lastIndexOf('/'));
  
  // 저장소 이름(Data_Structure) 이후의 폴더 깊이를 계산
  const pathSegments = directoryPath.split("/").filter(Boolean);
  const repoIndex = pathSegments.indexOf("Data_Structure");
  
  let prefix = "";
  if (repoIndex !== -1) {
    // 배포 환경: Data_Structure 폴더 이후에 몇 개의 폴더가 더 있는지 계산
    const depth = pathSegments.length - (repoIndex + 1);
    prefix = "../".repeat(depth);
  } else {
    // 로컬 환경: 최상위 root 폴더를 기준으로 계산 (보통 depth가 0~2 사이)
    // 퀴즈나 하위 문서 폴더 구조에 맞춰 ../ 를 자동 생성합니다.
    const depth = pathSegments.length; 
    prefix = "../".repeat(depth);
  }

  // --- HTML 생성 ---
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
      // siteTree의 url 앞에 계산된 상대경로(prefix)를 붙임
      a.href = prefix + node.url;
      a.textContent = node.title;
      breadcrumbEl.appendChild(a);
    }
  });
}

// 전역에서 함수를 호출할 수 있도록 설정
window.renderBreadcrumb = renderBreadcrumb;
