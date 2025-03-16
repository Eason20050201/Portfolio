var typed= new Typed(".text", {
    strings:["資工系的學生","持續挑戰的學生"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop:true
});


function toggleMenu() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("active");
}

// 📌 點擊選單內的連結時，自動關閉漢堡選單（只在手機版有效）
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        const navbar = document.querySelector(".navbar");
        if (window.innerWidth <= 768) { // 只有手機版時執行
            navbar.classList.remove("active");
        }
    });
});

// 📌 確保 menu-toggle 存在並監聽點擊事件
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btn-box").forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault(); // 防止預設行為
            const targetId = this.getAttribute("href"); // 取得 href，例如 "#about"
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section"); // 選取所有 section
    const navLinks = document.querySelectorAll("nav a[href^='#']"); // 選取 Navbar 內所有內部連結

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // 防止瞬間跳轉，改用 JS 控制

            const targetId = link.getAttribute("href"); // 取得點擊的 section ID
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                restartAnimations(targetSection);

                // 針對 Skills 區塊，重新播放進度條動畫
                if (targetId === "#skills") {
                    restartSkillBars();
                }

                // 平滑滾動到該 section
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    function restartAnimations(element) {
        element.querySelectorAll("*").forEach(child => {
            child.style.animation = "none";  // 清除動畫
            child.offsetHeight;  // 強制重繪
            child.style.animation = null;  // 恢復動畫
        });
    }

    function restartSkillBars() {
        const paths = document.querySelectorAll(".path");
        paths.forEach((path, index) => {
            // **步驟 1：完全移除 CSS 動畫**
            path.style.animation = "none";
            path.style.strokeDasharray = "502";
            path.style.strokeDashoffset = "502";

            // **步驟 2：強制重繪**
            path.offsetHeight; // 觸發重繪

            // **步驟 3：短暫延遲後重新設定動畫**
            setTimeout(() => {
                path.style.animation = `animation-path${index + 1} 1s 1s linear forwards`;
            }, 50);
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contactForm"); // 取得表單
    var successMessage = document.getElementById("successMessage"); // 取得成功訊息元素

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // 阻止表單預設提交

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    form.style.display = "none"; // 隱藏表單
                    if (successMessage) {
                        successMessage.style.display = "block"; // 先顯示元素
                        setTimeout(() => {
                            successMessage.classList.add("show"); // 加入動畫效果
                        }, 50);
                    }
                } else {
                    alert("提交失敗，請稍後再試！");
                }
            })
            .catch(error => {
                console.error("表單提交錯誤", error);
                alert("發生錯誤，請稍後再試！");
            });
        });
    }
});
