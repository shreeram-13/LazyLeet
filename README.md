# ⚡ LazyLeet

### LeetCode → GitHub, without the copy-paste.

LazyLeet is a Chrome extension that automatically saves your accepted
LeetCode solutions to GitHub.

Instead of copying your code, creating folders, naming files and committing
everything manually, LazyLeet detects an accepted submission, lets you
optionally add a note, and saves the solution to your GitHub repository.

> Solve it once. Save it automatically.

---

<!-- 🎥 ADD YOUR BEST DEMO GIF/VIDEO HERE -->
<!-- Show: Submit on LeetCode → Accepted → LazyLeet panel → Add note → Save Solution → GitHub -->

## 🚀 What is LazyLeet?

If you're solving LeetCode consistently, you probably end up with a
workflow that looks something like this:

```text
Solve a problem
      ↓
Submit it
      ↓
Copy the solution
      ↓
Open GitHub
      ↓
Create a folder
      ↓
Create a file
      ↓
Paste the code
      ↓
Commit
````

It's not difficult.

It's just repetitive.

LazyLeet removes that entire manual step.

```text
Submit on LeetCode
        ↓
  Accepted submission
        ↓
      LazyLeet
        ↓
   Add an optional note
        ↓
    Save Solution
        ↓
       GitHub
```

The goal is simple:

**Make saving your solutions something you don't have to think about.**

---

## ✨ Features

* 🔍 **Accepted submission detection**

  * Detects when a LeetCode submission is accepted.

* 📋 **Automatic code extraction**

  * Captures the submitted solution directly from the LeetCode page.

* 📝 **Optional solution notes**

  * Add a quick explanation, approach, or reminder before saving.

* 🐙 **Automatic GitHub saving**

  * Sends the solution to the backend and saves it to GitHub.

* 📂 **Organized solution storage**

  * Solutions are stored in a structured repository instead of one
    giant collection of files.

* 🖥️ **Chrome extension interface**

  * A lightweight popup provides the current LazyLeet status and
    quick access to the solution repository.

* ↔️ **Draggable submission panel**

  * The save panel can be moved around the page without blocking
    the LeetCode interface.

* 🔗 **Direct GitHub access**

  * Open the solution repository directly from the extension.

---

# ⚙️ How It Works

LazyLeet is split into three main parts:

```text
┌──────────────────────┐
│       LeetCode       │
│                      │
│  User submits code   │
└──────────┬───────────┘
           │
           │ Accepted submission
           ▼
┌──────────────────────┐
│   Chrome Extension   │
│                      │
│ • Detect submission  │
│ • Extract code       │
│ • Show UI            │
│ • Collect notes      │
└──────────┬───────────┘
           │
           │ Solution data
           ▼
┌──────────────────────┐
│      FastAPI         │
│       Backend        │
│                      │
│ • Receive solution   │
│ • Process request    │
│ • Talk to GitHub     │
└──────────┬───────────┘
           │
           │ GitHub API
           ▼
┌──────────────────────┐
│        GitHub        │
│                      │
│   Store solutions    │
└──────────────────────┘
```

### 01 — Submit

Write and submit your solution normally on LeetCode.

### 02 — Detect

LazyLeet watches the submission flow and detects when the solution
has been accepted.

### 03 — Extract

The extension collects the relevant information, including:

* Problem name
* Programming language
* Submitted code

### 04 — Review

A small side panel appears on the page.

You can add an optional note explaining your approach, complexity,
or anything you want to remember later.

### 05 — Save

Click **Save Solution**.

The extension sends the solution data to the FastAPI backend.

### 06 — Store

The backend communicates with GitHub and stores the solution in the
configured repository.

---

## 🎥 See It In Action

<!-- 📹 ADD A SHORT DEMO VIDEO/GIF HERE -->

<!-- Recommended: 10–20 seconds, no narration required. -->

### The workflow

```text
LeetCode
   ↓
Accepted
   ↓
LazyLeet panel
   ↓
Optional note
   ↓
Save Solution
   ↓
GitHub
```

<!-- 📸 ADD SCREENSHOT: LazyLeet popup -->

<!-- 📸 ADD SCREENSHOT: Accepted submission + LazyLeet side panel -->

<!-- 📸 ADD SCREENSHOT: Resulting GitHub repository -->

---

# 🧠 Why I Built It

While solving problems consistently, I noticed that saving solutions
to GitHub was almost as repetitive as solving the problem itself.

The actual work wasn't difficult.

It was the small things:

* copying the solution
* creating folders
* naming files
* switching between applications
* writing notes
* committing changes

LazyLeet started with a simple idea:

> **What if saving an accepted solution was just one click?**

That became the project.

---

# 🏗️ Architecture

LazyLeet uses a small client–server architecture.

### Chrome Extension

The extension is responsible for everything happening inside the browser.

It handles:

* LeetCode page interaction
* Submission detection
* Solution extraction
* User interface
* Notes
* Communication with the backend

### FastAPI Backend

The backend acts as the bridge between the extension and GitHub.

It handles:

* Receiving solution data
* Processing the request
* GitHub integration
* Creating/updating solution files

### GitHub

GitHub acts as the final storage layer.

It provides:

* Version control
* Repository organization
* Accessible solution history
* A permanent home for saved solutions

---

# 🛠️ Tech Stack

| Part                   | Technology                      |
| ---------------------- | ------------------------------- |
| Browser Extension      | JavaScript                      |
| Extension UI           | HTML + CSS                      |
| Backend                | Python                          |
| API Framework          | FastAPI                         |
| Storage                | GitHub                          |
| Repository Integration | GitHub API                      |
| Browser Platform       | Chrome Extensions / Manifest V3 |

The project intentionally keeps the stack relatively small.

There isn't a database just for the sake of having one.

The solutions are already code, and GitHub provides exactly what
the project needs for storing and versioning them.

---

# 📁 Project Structure

```text
LazyLeet/
│
├── backend/
│   ├── github_api.py
│   └── main.py
│
├── extension/
│   ├── icons/
│   │   └── lazyleetlogo.png
│   │
│   ├── content.js
│   ├── manifest.json
│   ├── page-bridge.js
│   ├── popup.css
│   ├── popup.html
│   ├── popup.js
│   └── styles.css
│
├── .gitignore
├── .gitattributes
├── README.md
└── requirements.txt
```

### Important files

| File             | Purpose                                                                     |
| ---------------- | --------------------------------------------------------------------------- |
| `content.js`     | Handles LeetCode interaction, submission detection and the main LazyLeet UI |
| `page-bridge.js` | Handles communication with the LeetCode page                                |
| `manifest.json`  | Chrome extension configuration                                              |
| `popup.html`     | Extension popup structure                                                   |
| `popup.css`      | Popup styling                                                               |
| `popup.js`       | Popup behavior                                                              |
| `styles.css`     | Styles for the submission panel                                             |
| `main.py`        | FastAPI backend                                                             |
| `github_api.py`  | GitHub API integration                                                      |

---

# 🚀 Getting Started

## Prerequisites

Before running LazyLeet, you'll need:

* Google Chrome
* Python 3.x
* Git
* A GitHub account
* A GitHub Personal Access Token

---

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd LazyLeet
```

---

## 2. Create a virtual environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure environment variables

Create a `.env` file in the backend directory or project root,
depending on the backend configuration.

Example:

```env
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_github_username
GITHUB_REPO=your_solution_repository
```

> **Never commit your `.env` file or GitHub token to the repository.**

The project includes a `.gitignore` configuration to prevent local
environment files and other development files from being committed.

---

# 🧩 Load the Extension

LazyLeet is currently loaded as an unpacked Chrome extension.

### Step 1

Open:

```text
chrome://extensions
```

### Step 2

Enable **Developer mode**.

### Step 3

Click:

```text
Load unpacked
```

### Step 4

Select the project's:

```text
extension/
```

directory.

### Step 5

Pin LazyLeet from the Chrome extensions menu.

### Step 6

Open a LeetCode problem and submit a solution.

---

# ▶️ Using LazyLeet

The normal workflow is:

```text
1. Open a LeetCode problem
2. Write your solution
3. Submit it
4. Wait for the Accepted result
5. LazyLeet detects the submission
6. The save panel appears
7. Add an optional note
8. Click "Save Solution"
9. Check your GitHub repository
```

The original LeetCode page remains accessible while the LazyLeet
panel is open.

The panel can also be dragged around the page.

---

<!-- 📸 ADD SCREENSHOT: LazyLeet popup showing "LazyLeet is ready" -->

## 🖥️ Extension Popup

The popup gives a quick overview of LazyLeet's current state.

It also provides direct access to the GitHub repository where your
solutions are stored.

---

<!-- 📸 ADD SCREENSHOT: Accepted submission with LazyLeet side panel -->

## 💾 Saving a Solution

Once a submission is accepted, LazyLeet opens a side panel containing:

* The accepted status
* Problem name
* Programming language
* Optional notes field
* Save Solution button

The panel is intentionally lightweight so that it doesn't get in
the way of the LeetCode interface.

---

# 📦 GitHub Output

The main result of LazyLeet is an organized repository containing
your solutions.

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

This turns GitHub into a searchable collection of solved problems
without requiring manual file management after every submission.

---

<!-- 📸 ADD SCREENSHOT: Your actual LazyLeet-Solutions GitHub repository -->

# 🔐 Security

LazyLeet requires GitHub authentication to save solutions to your
repository.

Sensitive credentials such as GitHub tokens should be stored in
environment variables and must never be committed to source control.

The repository intentionally excludes:

```text
.env
venv/
.venv/
__pycache__/
*.pyc
```

---

# 🧠 Design Decisions

## Why a Chrome extension?

The main problem exists directly inside the LeetCode browser workflow.

A Chrome extension allows LazyLeet to detect submissions and provide
the saving interface without forcing the user to manually copy data
between applications.

---

## Why FastAPI?

FastAPI provides a lightweight way to expose the backend functionality
while keeping the server-side code simple and easy to extend.

It also fits naturally with the Python-based backend.

---

## Why GitHub instead of a database?

The primary data being stored is source code.

GitHub already provides:

* File storage
* Version control
* Repository organization
* History
* Easy access from anywhere

Adding a database would introduce another layer without solving the
core problem.

---

## Why separate the extension and backend?

The browser extension handles the user-facing interaction and
LeetCode-specific logic.

The backend handles GitHub operations.

Keeping these responsibilities separate makes the project easier to
modify and maintain.

---

# ⚠️ Current Limitations

LazyLeet is still a personal project and currently has a few limitations:

* Currently designed for Chrome.
* Requires a running/configured backend.
* Requires GitHub authentication.
* Depends on the current structure and behavior of LeetCode's pages.
* The project is currently intended for personal use rather than
  large-scale deployment.
* Error handling and recovery can still be improved.

These are areas I'd like to address as the project evolves.

---

# 🛣️ Roadmap

### Completed

* [x] Detect accepted LeetCode submissions
* [x] Extract submitted code
* [x] Identify problem and language
* [x] FastAPI backend
* [x] GitHub API integration
* [x] Optional solution notes
* [x] LazyLeet extension popup
* [x] Accepted-submission side panel
* [x] Draggable side panel
* [x] GitHub repository integration
* [x] Custom LazyLeet branding

### Next

* [ ] Better error handling and retry logic
* [ ] GitHub OAuth instead of manual token configuration
* [ ] Improved repository organization
* [ ] Better support for edge cases in submission detection
* [ ] More polished onboarding
* [ ] Chrome Web Store release
* [ ] Support for additional coding platforms

---

# 🔮 What's Next?

The current version focuses on one thing:

**Automatically getting an accepted solution from LeetCode into GitHub.**

The next step would be making LazyLeet more useful beyond simply
saving code.

Some ideas include:

* Automatically generating solution summaries
* Tracking solved problems
* Showing basic solving statistics
* Organizing solutions by topic
* Generating better notes
* Supporting more coding platforms

The project can eventually become more than a solution saver —
it could become a small personal coding archive.

---

# 🤝 Contributing

LazyLeet is currently a personal project, but ideas, suggestions and
contributions are welcome.

If you find a bug or have an idea for improving the project:

1. Open an issue
2. Describe the problem or idea
3. Fork the repository
4. Create a branch
5. Make your changes
6. Open a pull request

---

# 📄 License

This project is licensed under the MIT License.

See the `LICENSE` file for details.

---

# 👨‍💻 Built By

**Shree Ram Jamana**

B.Tech CSE · Applied AI & Backend Development

LazyLeet started as a simple idea:

> **If I'm already solving the problem, saving the solution shouldn't
> be another problem.**

---

<p align="center">

### ⚡ LazyLeet

**Solve. Submit. Save.**

</p>
