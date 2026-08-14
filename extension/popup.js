const statusTitle = document.getElementById("statusTitle");
const statusText = document.getElementById("statusText");
const githubBtn = document.getElementById("githubBtn");


// ------------------------------------
// Check the current tab
// ------------------------------------

chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs) => {

        const tab = tabs[0];

        if (!tab || !tab.url) {
            return;
        }

        const isLeetCode =
            tab.url.startsWith("https://leetcode.com/problems/");

        if (isLeetCode) {

            statusTitle.textContent =
                "LeetCode detected";

            statusText.textContent =
                "LazyLeet is ready to capture your accepted submissions.";

        } else {

            statusTitle.textContent =
                "LazyLeet is ready";

            statusText.textContent =
                "Open a LeetCode problem to start saving solutions.";

        }
    }
);


// ------------------------------------
// GitHub button
// ------------------------------------

githubBtn.addEventListener("click", () => {

    chrome.tabs.create({
        url: "https://github.com/shreeram-13/LazyLeet-Solutions"
    });

});