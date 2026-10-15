console.log("홍길동의 자기소개 페이지에 오신 걸 환영합니다!");

// 푸터에 현재 연도 표시
document.getElementById("year").textContent = new Date().getFullYear();

// 다크모드 토글 (선택한 테마는 localStorage에 저장)
const THEME_KEY = "theme";
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "dark" || saved === "light" ? saved : null;
  } catch (e) {
    return null;
  }
}

function currentTheme() {
  return document.documentElement.dataset.theme || (systemDark.matches ? "dark" : "light");
}

const themeToggle = document.createElement("button");
themeToggle.type = "button";
themeToggle.className = "theme-toggle";

function updateToggle() {
  const isDark = currentTheme() === "dark";
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

const savedTheme = getSavedTheme();
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {
    // 저장이 막힌 환경(사생활 보호 모드 등)에서는 이번 방문에만 적용
  }
  updateToggle();
});

// 직접 고른 적이 없으면 시스템 설정이 바뀔 때 아이콘도 따라 바뀜
systemDark.addEventListener("change", updateToggle);

updateToggle();
document.body.prepend(themeToggle);

// 섹션이 화면에 들어오면 서서히 나타나게 하기
const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("visible"));
}
