const badge = document.createElement("div");

badge.id = "lazyleet-badge";
badge.textContent = "🟢 LazyLeet Active";

document.body.appendChild(badge);


// ------------------------------------
// Submission state
// ------------------------------------

let waitingForResult = false;
let previousResultElement = null;
let previousResultText = null;
let alreadyDetected = false;


function getProblemName() {

    const currentSlug = window.location.pathname
        .split("/")
        .filter(Boolean)[1];

    const links = document.querySelectorAll(
        'a[href*="/problems/"]'
    );

    for (const link of links) {

        const href = link.getAttribute("href");

        if (!href || !href.includes(`/problems/${currentSlug}`)) {
            continue;
        }

        const text = link.innerText.trim();

        // Look for something like:
        // "1. Two Sum"
        // "75. Sort Colors"
        const match = text.match(/^(\d+)\.\s*(.+)$/);

        if (match) {

            const problemNumber = parseInt(match[1]);
            const problemName = match[2].trim();

            // Ignore suspicious 0 values
            if (problemNumber > 0) {
                return `${problemNumber}. ${problemName}`;
            }
        }
    }

    // Fallback if LeetCode's UI doesn't expose the number
    const title = document.title
        .replace(" - LeetCode", "")
        .trim();

    return title || currentSlug || "Unknown Problem";
}


function askForNotes(problem, language, code) {

    const saveNotes = confirm(
        `🎉 ${problem} accepted!\n\nDo you want to save notes for this solution?`
    );

    let notes = "";

    if (saveNotes) {
        notes = prompt(
            "📝 Enter your notes for this solution:"
        ) || "";
    }

//    console.log("📦 LazyLeet final data:", {
//        problem,
//        language,
//        code,
//        notes
//    });
//
//    sendToBackend(
//        problem,
//        language,
//        code,
//        notes
//    );

    console.log("📦 LazyLeet final data:", {
        problem,
        language,
        code,
        notes
    });

    console.log("🔥 ABOUT TO CALL BACKEND");

    console.log(
        "🔎 sendToBackend type:",
        typeof sendToBackend
    );

    sendToBackend(
        problem,
        language,
        code,
        notes
    );

    console.log("🔥 BACKEND FUNCTION CALL FINISHED");
}

async function sendToBackend(problem, language, code, notes) {

    console.log("🔥 sendToBackend() CALLED!");

    try {

        console.log("📡 Sending request to FastAPI...");

        const response = await fetch(
            "http://127.0.0.1:8000/save",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    problem: problem,
                    language: language,
                    code: code,
                    notes: notes
                })
            }
        );

        console.log("📡 FastAPI responded:", response.status);

        const result = await response.json();

        console.log(
            "🚀 LazyLeet backend response:",
            result
        );

        if (!response.ok) {
            console.error(
                "❌ LazyLeet failed to save:",
                result
            );
            return;
        }

        console.log(
            "✅ LazyLeet solution saved successfully!"
        );

    } catch (error) {

        console.error(
            "❌ LazyLeet could not connect to FastAPI:",
            error
        );
    }
}

// ------------------------------------
// Get the actual LeetCode submission result
// ------------------------------------

function getSubmissionResultElement() {

    return document.querySelector(
        '[data-e2e-locator="submission-result"]'
    );
}


// ------------------------------------
// Submission started
// ------------------------------------

function submissionStarted() {

    const resultElement = getSubmissionResultElement();

    previousResultElement = resultElement;

    previousResultText = resultElement
        ? resultElement.innerText.trim()
        : null;

    waitingForResult = true;
    alreadyDetected = false;

    console.log("🚀 LazyLeet: Submission started");

    console.log(
        "Previous submission result:",
        previousResultText
    );
}


// ------------------------------------
// Mouse Submit
// ------------------------------------

document.addEventListener("click", (event) => {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const buttonText = button.innerText.trim();

    if (buttonText === "Submit") {

        submissionStarted();
    }
});


// ------------------------------------
// Ctrl + Enter
// ------------------------------------

document.addEventListener("keydown", (event) => {

    if (event.ctrlKey && event.key === "Enter") {

        console.log("⌨️ LazyLeet: Ctrl + Enter detected");

        submissionStarted();
    }
});


// ------------------------------------
// Watch the page for submission result changes
// ------------------------------------

const observer = new MutationObserver(() => {

    if (!waitingForResult || alreadyDetected) {
        return;
    }

    const currentResultElement =
        getSubmissionResultElement();


    // No submission result exists yet.
    if (!currentResultElement) {
        return;
    }


    const currentResultText =
        currentResultElement.innerText.trim();


    // Check whether LeetCode created/replaced
    // the submission result element.
    const elementChanged =
        currentResultElement !== previousResultElement;


    // Check whether the result text changed.
    const textChanged =
        currentResultText !== previousResultText;


    if (!elementChanged && !textChanged) {
        return;
    }


    console.log(
        "📊 LazyLeet: New submission result detected:",
        currentResultText
    );


    // ------------------------------------
    // Accepted
    // ------------------------------------

if (currentResultText === "Accepted") {

    console.log("🎉 LazyLeet: Accepted submission detected!");

    alreadyDetected = true;
    waitingForResult = false;

    alert("🎉 LazyLeet detected Accepted!");

    window.postMessage({
        type: "LAZYLEET_GET_CODE"
    }, "*");

    return;
}


    // ------------------------------------
    // Failed submission
    // ------------------------------------

    const failedResults = [
        "Wrong Answer",
        "Runtime Error",
        "Compile Error",
        "Time Limit Exceeded",
        "Memory Limit Exceeded"
    ];


    if (failedResults.includes(currentResultText)) {

        console.log(
            "❌ LazyLeet: Submission failed:",
            currentResultText
        );

        waitingForResult = false;

        return;
    }


    // Update our reference in case LeetCode
    // temporarily shows another state.
    previousResultElement = currentResultElement;
    previousResultText = currentResultText;
});


observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});


window.addEventListener("message", (event) => {

    if (event.source !== window) {
        return;
    }

    if (event.data?.type !== "LAZYLEET_CODE_RESULT") {
        return;
    }

    const problem = getProblemName();

    const language = event.data.language;
    const code = event.data.code;

    console.log("📦 LazyLeet captured solution!");

    askForNotes(problem, language, code);
});