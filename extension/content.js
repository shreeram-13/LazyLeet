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

    // Remove an existing modal if one somehow remains
    const existingModal = document.getElementById("lazyleet-modal");

    if (existingModal) {
        existingModal.remove();
    }


    // ==============================
    // Modal overlay
    // ==============================

    const overlay = document.createElement("div");

    overlay.id = "lazyleet-modal";


    // ==============================
    // Modal
    // ==============================

    const modal = document.createElement("div");

    modal.className = "lazyleet-modal";


    // ==============================
    // Modal content
    // ==============================

    modal.innerHTML = `

        <div class="lazyleet-modal-header">

            <div class="lazyleet-modal-brand">

                <div class="lazyleet-modal-logo">
                    ⚡
                </div>

                <div>
                    <h2>LazyLeet</h2>
                    <span>LeetCode → GitHub</span>
                </div>

            </div>

            <button
                class="lazyleet-close"
                id="lazyleet-close"
            >
                ×
            </button>

        </div>


        <div class="lazyleet-modal-divider"></div>


        <div class="lazyleet-success">

            <div class="lazyleet-success-icon">
                ✓
            </div>

            <div>
                <h3>Solution accepted</h3>

                <p>
                    Your submission passed all test cases.
                </p>
            </div>

        </div>


        <div class="lazyleet-problem">

            <strong>${problem}</strong>

            <span>${language}</span>

        </div>


        <label class="lazyleet-notes-label">
            Add a note
            <span>optional</span>
        </label>


        <textarea
            id="lazyleet-notes"
            class="lazyleet-notes"
            placeholder="e.g. Used a hash map to get O(n) time..."
        ></textarea>


        <div class="lazyleet-actions">

            <button
                id="lazyleet-save"
                class="lazyleet-btn lazyleet-btn-primary"
            >
                Save Solution
            </button>

        </div>

    `;


    overlay.appendChild(modal);

    document.body.appendChild(overlay);


    // ==============================
    // Elements
    // ==============================

    const notesInput =
        document.getElementById("lazyleet-notes");

    const saveButton =
        document.getElementById("lazyleet-save");

    const closeButton =
        document.getElementById("lazyleet-close");

    // ==============================+++++++++++++++++++++++++++++++++++++++++


// ==============================
// Make LazyLeet panel draggable
// ==============================

const header =
    modal.querySelector(".lazyleet-modal-header");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

header.addEventListener("pointerdown", (event) => {

    // Don't drag when clicking the close button
    if (event.target.closest("#lazyleet-close")) {
        return;
    }

    isDragging = true;

    // IMPORTANT:
    // The fixed element is "overlay", not "modal".
    const rect = overlay.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    // Convert from right-based positioning
    // to left/top positioning.
    overlay.style.right = "auto";
    overlay.style.left = `${rect.left}px`;
    overlay.style.top = `${rect.top}px`;

    header.setPointerCapture(event.pointerId);

    event.preventDefault();
});


header.addEventListener("pointermove", (event) => {

    if (!isDragging) {
        return;
    }

    let newLeft =
        event.clientX - offsetX;

    let newTop =
        event.clientY - offsetY;


    // Keep panel inside browser window.

    const maxLeft =
        window.innerWidth - overlay.offsetWidth;

    const maxTop =
        window.innerHeight - overlay.offsetHeight;


    newLeft =
        Math.max(0, Math.min(newLeft, maxLeft));

    newTop =
        Math.max(0, Math.min(newTop, maxTop));


    // IMPORTANT:
    // Move the fixed overlay.
    overlay.style.left = `${newLeft}px`;
    overlay.style.top = `${newTop}px`;

});


header.addEventListener("pointerup", (event) => {

    isDragging = false;

    if (header.hasPointerCapture(event.pointerId)) {
        header.releasePointerCapture(event.pointerId);
    }

});


header.addEventListener("pointercancel", () => {

    isDragging = false;

});





    // ==============================+++++++++++++++++++++++++++++++++++++++++
    // Close modal
    // ==============================

    function closeModal() {
        overlay.remove();
    }


    closeButton.addEventListener(
        "click",
        closeModal
    );


    // ==============================
    // Save solution
    // ==============================

    async function saveSolution(notes) {

        saveButton.disabled = true;
        saveButton.textContent = "Saving...";


        try {

            await sendToBackend(
                problem,
                language,
                code,
                notes
            );


            modal.innerHTML = `

                <div class="lazyleet-modal-header">

                    <div class="lazyleet-modal-brand">

                        <div class="lazyleet-modal-logo">
                            ⚡
                        </div>

                        <div>
                            <h2>LazyLeet</h2>
                            <span>LeetCode → GitHub</span>
                        </div>

                    </div>

                    <button
                        class="lazyleet-close"
                        id="lazyleet-close"
                    >
                        ×
                    </button>

                </div>


                <div class="lazyleet-modal-divider"></div>


                <div class="lazyleet-saved">

                    <div class="lazyleet-saved-icon">
                        ✓
                    </div>

                    <h2>Saved successfully</h2>

                    <p>
                        Your solution has been saved to GitHub.
                    </p>

                    <button
                        id="lazyleet-done"
                        class="lazyleet-btn lazyleet-btn-primary"
                    >
                        Done
                    </button>

                </div>

            `;

            const savedHeader =
                modal.querySelector(".lazyleet-modal-header");

            savedHeader.addEventListener("pointerdown", (event) => {

                if (event.target.closest("#lazyleet-close")) {
                    return;
                }

                isDragging = true;

                const rect = overlay.getBoundingClientRect();

                offsetX = event.clientX - rect.left;
                offsetY = event.clientY - rect.top;

                overlay.style.right = "auto";
                overlay.style.left = `${rect.left}px`;
                overlay.style.top = `${rect.top}px`;

                savedHeader.setPointerCapture(event.pointerId);

                event.preventDefault();
            });


            savedHeader.addEventListener("pointermove", (event) => {

                if (!isDragging) {
                    return;
                }

                let newLeft =
                    event.clientX - offsetX;

                let newTop =
                    event.clientY - offsetY;

                const maxLeft =
                    window.innerWidth - overlay.offsetWidth;

                const maxTop =
                    window.innerHeight - overlay.offsetHeight;

                newLeft =
                    Math.max(0, Math.min(newLeft, maxLeft));

                newTop =
                    Math.max(0, Math.min(newTop, maxTop));

                overlay.style.left = `${newLeft}px`;
                overlay.style.top = `${newTop}px`;
            });


            savedHeader.addEventListener("pointerup", (event) => {

                isDragging = false;

                if (savedHeader.hasPointerCapture(event.pointerId)) {
                    savedHeader.releasePointerCapture(event.pointerId);
                }

            });


            savedHeader.addEventListener("pointercancel", () => {

                isDragging = false;

            });


            document
                .getElementById("lazyleet-done")
                .addEventListener(
                    "click",
                    closeModal
                );

            document
                .getElementById("lazyleet-close")
                .addEventListener(
                    "click",
                    closeModal
                );


        } catch (error) {

            console.error(
                "❌ LazyLeet save failed:",
                error
            );


            saveButton.disabled = false;
            saveButton.textContent =
                "Save Solution";


            alert(
                "LazyLeet could not save the solution. Check the backend."
            );
        }

    }


    // ==============================
    // Save with notes
    // ==============================

    saveButton.addEventListener(
        "click",
        () => {

            const notes =
                notesInput.value.trim();

            saveSolution(notes);

        }
    );

    // ==============================
    // Click outside modal
    // ==============================

    overlay.addEventListener(
        "click",
        (event) => {

            if (event.target === overlay) {
                closeModal();
            }

        }
    );


    // Focus textarea
    setTimeout(() => {
        notesInput.focus();
    }, 100);

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
        throw error;
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

//    alert("🎉 LazyLeet detected Accepted!");

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