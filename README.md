# ⚡ LazyLeet

A Chrome extension that saves your accepted LeetCode solutions to GitHub automatically — no copy-paste, no manual commits, no folder juggling everytime.

> Solve it once. Save it automatically.

[![JavaScript](https://img.shields.io/badge/JavaScript-Extension-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)](https://fastapi.tiangolo.com)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Manifest%20V3-blue)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![GitHub API](https://img.shields.io/badge/GitHub-API%20Integration-black)](https://docs.github.com/en/rest)
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

---


## Why This Project?

It all started as a simple idea:

> **If I'm already solving the problem, saving the solution shouldn't be another problem.**

It's not difficult.

It's just repetitive.

If you're solving LeetCode consistently and saving the solutions to GitHub, you probably end up with a workflow that looks something like this:

```text
Solve → Submit → Copy code → Open GitHub → Create folder → Create file → Paste code → Commit
```

LazyLeet removes that loop entirely. 

It watches for an accepted submission, lets you attach an optional note, and pushes the solution straight to a structured GitHub repository — automatically.


### With LazyLeet

```text
Solve → Submit → Accepted → Add note (optional) → Save Solution
```

The goal is simple:

> **Make saving your solutions something you don't have to think about.**

---


## 🖥️ Demo

https://github.com/user-attachments/assets/503b69a5-0902-471d-9a5e-b7fe03f5a315

### Extension Popup

A lightweight dashboard showing LazyLeet's current status and providing quick access to the GitHub solution repository.

<img width="1920" height="1200" alt="Screenshot 2026-08-15 204233" src="https://github.com/user-attachments/assets/22060b81-e527-429c-a6f0-fe9610366126" />




### Saving a Solution

Once LeetCode reports an accepted submission, LazyLeet opens a draggable side panel where the solution can be reviewed and an optional note can be added.

<img width="1920" height="1200" alt="Screenshot 2026-08-15 204514" src="https://github.com/user-attachments/assets/1c772f0a-ae66-43e0-b4d5-af4aefd3d348" />




### Saved

After the backend successfully processes the request, LazyLeet confirms that the solution has been saved to GitHub.

<img width="1920" height="1200" alt="Screenshot 2026-08-15 204529" src="https://github.com/user-attachments/assets/dde340cd-f9eb-4aaf-89e1-2df582136402" />




### GitHub

The final result is an organized repository containing the saved solutions and optional notes.


<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/29d6285a-af32-4f34-a1ed-014901513888" />


---

## What Was Built

| Phase | What | Stack |
|---|---|---|
| 1 | Submission detection — watch LeetCode's accepted flow in real time | JavaScript, Chrome Extension APIs |
| 2 | Code + metadata extraction — problem name, language, submitted code | Content scripts, page-bridge messaging |
| 3 | Draggable in-page panel — review, annotate, save | HTML, CSS, JavaScript |
| 4 | FastAPI backend — bridge between the browser and GitHub | Python, FastAPI |
| 5 | GitHub integration — structured, versioned solution storage | GitHub REST API |

---

## ✨ Features

- 🔍 Automatic detection of accepted LeetCode submissions
- 📋 Automatic extraction of problem name, language, and code
- 📝 Optional per-solution notes for approaches, complexity, or reminders
- 🐙 One-click saving directly to a GitHub repository
- 📂 Organized per-problem folder structure
- ↔️ Draggable in-page panel that stays out of the way
- 🔗 Direct access to the solution repository from the extension popup
- 🖥️ Lightweight Manifest V3 popup showing extension status
- 🔐 GitHub credentials kept on the backend rather than inside the extension

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       LeetCode       │
                         │                      │
                         │   User submits code  │
                         └──────────┬───────────┘
                                    │
                                    │ Submission detection
                                    ▼
                         ┌──────────────────────┐
                         │   Chrome Extension   │
                         │                      │
                         │ • Detect submission  │
                         │ • Extract code       │
                         │ • Render UI          │
                         │ • Collect notes      │
                         └──────────┬───────────┘
                                    │
                                    │ HTTP solution payload
                                    ▼
                         ┌──────────────────────┐
                         │    FastAPI Backend   │
                         │                      │
                         │ • Receive request    │
                         │ • Process solution   │
                         │ • Talk to GitHub     │
                         └──────────┬───────────┘
                                    │
                                    │ GitHub REST API
                                    ▼
                         ┌──────────────────────┐
                         │        GitHub        │
                         │                      │
                         │  Organized solution  │
                         │      repository      │
                         └──────────────────────┘
```

### Client–server split

```text
extension/  →  everything inside the browser
               detection · extraction · UI · notes

backend/    →  everything outside the browser
               GitHub · authentication · storage
```

The extension handles the LeetCode-facing workflow, while the FastAPI backend handles GitHub operations and repository access.

---

## ⚙️ How It Works

### 01 — Submit

Write and submit a solution normally on LeetCode.

### 02 — Detect

LazyLeet watches the submission flow and detects when the submission is accepted.

### 03 — Extract

The extension retrieves the relevant information:

- Problem name
- Programming language
- Submitted code

### 04 — Review

A draggable side panel appears with the accepted status and an optional notes field.

### 05 — Save

Clicking **Save Solution** sends the solution payload to the FastAPI backend.

### 06 — Store

The backend communicates with GitHub and creates the required solution files and folders inside the configured repository.

The complete workflow becomes:

```text
LeetCode
    ↓
Accepted
    ↓
LazyLeet
    ↓
Optional note
    ↓
Save Solution
    ↓
FastAPI
    ↓
GitHub
```

---

## 📦 GitHub Output

Before using LazyLeet, create an **empty GitHub repository** where you want your solutions to be stored.

LazyLeet currently does **not** create the GitHub repository itself.

Instead, once the repository is configured, LazyLeet automatically creates and organizes the solution files and problem folders inside it.

For example:

```text
LazyLeet-Solutions/
│
├── 1. Two Sum/
│   ├── solution.py
│   └── notes.md
│
├── 9. Palindrome Number/
│   └── solution.py
│
└── 53. Maximum Subarray/
    ├── solution.py
    └── notes.md
```

If multiple solutions are saved for the same problem, the backend handles file naming so existing solutions are not accidentally overwritten.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Extension | JavaScript, HTML, CSS | Browser interaction and UI |
| Platform | Chrome Extensions, Manifest V3 | Runs LazyLeet inside Chrome |
| Backend | FastAPI | API layer between the extension and GitHub |
| Storage | GitHub REST API | Source-code storage and version control |
| Authentication | GitHub Personal Access Token | Controlled repository access |

---

## 🧠 Key Design Decisions

### No database

The primary data being stored is source code.

GitHub already provides file storage, version control, history, and organization, so introducing a database would add another layer without solving a current requirement.

### Separate extension and backend

The extension handles everything LeetCode-facing:

```text
Detection
Extraction
UI
Notes
```

The backend handles everything GitHub-facing:

```text
Authentication
Repository operations
File creation
Commits
```

This keeps both sides easier to modify independently.

### GitHub credentials stay server-side

The extension does not directly communicate with GitHub.

Solution data is sent to the FastAPI backend, which handles the GitHub request using the configured credentials.

### Explicit saving instead of automatic syncing

LazyLeet does not automatically save every accepted submission.

The user explicitly clicks **Save Solution**, giving them control over what gets added to their repository and allowing them to add notes before saving.

---

## 📁 Project Structure

```text
LazyLeet/
│
├── backend/
│   ├── main.py                 # FastAPI backend
│   └── github_api.py           # GitHub API integration
│
├── extension/
│   ├── icons/
│   │   └── lazyleetlogo.png
│   │
│   ├── content.js              # Submission detection + main UI logic
│   ├── page-bridge.js          # Communication with the LeetCode page
│   ├── manifest.json           # Chrome extension configuration
│   ├── popup.html              # Extension popup structure
│   ├── popup.js                # Popup behavior
│   ├── popup.css               # Popup styling
│   └── styles.css              # Submission panel styling
│
├── .gitignore
├── .gitattributes
├── requirements.txt
└── README.md
```

---

## 🚀 Run Locally

### Prerequisites

Before running LazyLeet, you'll need:

- Google Chrome
- Python 3.x
- Git
- A GitHub account
- A GitHub Personal Access Token
- An existing GitHub repository where your solutions will be stored

> **Create the GitHub repository before configuring LazyLeet.**
>
> LazyLeet currently creates and organizes solution files inside the configured repository — it does **not** create the repository itself.

---

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd LazyLeet
```

### 2. Create a virtual environment

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the backend directory:

```env
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_github_username
GITHUB_REPO=your_solution_repository
```

The repository specified in `GITHUB_REPO` must already exist under the configured GitHub account.

For example:

```text
GitHub
└── your-username
    └── LazyLeet-Solutions   ← create this first
```

LazyLeet will then create and update the solution files and folders inside that repository.

> **Never commit `.env` or a raw GitHub token to the repository.**

---

### 5. Start the backend

```bash
cd backend
uvicorn main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

---

### 6. Load the extension

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the project's `extension/` directory
5. Pin LazyLeet from the extensions menu
6. Open a LeetCode problem
7. Submit a solution

If the submission is accepted, the LazyLeet panel should appear.

---

## 🔐 Security

The current version is designed primarily for personal/local use.

- GitHub tokens are stored in server-side environment variables
- `.env` is excluded from source control
- `venv/`, `.venv/`, `__pycache__/`, and compiled files are ignored
- The extension does not directly communicate with GitHub
- GitHub operations are handled by the FastAPI backend

> **Never place a real GitHub token inside the extension source code.**

---

## ⚠️ Current Limitations

LazyLeet is currently a working prototype rather than a production multi-user service.

Current limitations include:

- Chrome-only
- Requires a running and configured backend
- Requires manual GitHub token configuration
- Depends on LeetCode's current page structure and submission flow
- Designed primarily for personal use
- Limited retry and recovery handling for failed requests
- No GitHub OAuth flow yet
- No public deployment yet

These are areas planned for future development as the project evolves.

---

## 🛣️ Roadmap

### Completed

- [x] Detect accepted LeetCode submissions
- [x] Extract submitted code, problem name, and language
- [x] Optional solution notes
- [x] FastAPI backend
- [x] GitHub API integration
- [x] Structured solution storage
- [x] Draggable side panel
- [x] Extension popup
- [x] Custom LazyLeet branding
- [x] Automatic solution file naming

### Planned

- [ ] Better error handling and retry logic
- [ ] Duplicate solution handling
- [ ] Automated backend tests
- [ ] Improved repository organization
- [ ] GitHub OAuth instead of manual token configuration
- [ ] Solution statistics and dashboard
- [ ] Optional AI-generated solution summaries
- [ ] Public backend deployment
- [ ] Chrome Web Store release
- [ ] Support for additional coding platforms

---

## 💡 What I Learned

Building LazyLeet ended up being less about one specific technology and more about connecting several pieces into one working system.

Some of the biggest takeaways were:

- Browser-side and server-side responsibilities need to be clearly separated.
- Third-party API credentials should never be unnecessarily exposed to the client.
- Not every storage problem needs a database.
- Small repetitive workflows are often great candidates for automation.
- Building against a real website introduces edge cases that don't appear when working with isolated code.
- Connecting the extension, backend, API integration, and UI gave me a much better understanding of how the pieces of a real application communicate.

---

## 🤝 Contributing

LazyLeet is currently a personal project, but ideas, suggestions, and contributions are welcome.

If you find a bug or have an idea:

1. Open an issue describing the problem or feature
2. Fork the repository
3. Create a branch
4. Make your changes
5. Open a pull request

---

## 📄 License

LazyLeet is intended to be released under the **MIT License**.

An official `LICENSE` file will be added before the project's public release.

---

## 👨‍💻 Built By

**Shree Ram Jamana**

B.Tech CSE · Applied AI & Backend Development

