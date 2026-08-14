from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import re

from backend.github_api import upload_file


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://leetcode.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Solution(BaseModel):
    problem: str
    language: str
    code: str
    notes: str = ""


@app.get("/")
def home():
    return {
        "project": "LazyLeet",
        "status": "running"
    }


@app.post("/save")
def save_solution(solution: Solution):

    # --------------------------------------------------
    # 1. Extract problem number and problem name
    # --------------------------------------------------

    match = re.match(r"(\d+)\.\s*(.+)", solution.problem)

    if match:
        problem_number = int(match.group(1))
        problem_name = match.group(2).strip()
    else:
        problem_number = 0
        problem_name = solution.problem.strip()

    # --------------------------------------------------
    # 2. Create the local problem folder
    # --------------------------------------------------

    folder = Path("solutions") / f"{problem_number}. {problem_name}"
    folder.mkdir(parents=True, exist_ok=True)

    # --------------------------------------------------
    # 3. Decide the file extension
    # --------------------------------------------------

    extension = {
        "python": "py",
        "python3": "py",
        "Python": "py",

        "java": "java",
        "Java": "java",

        "cpp": "cpp",
        "c++": "cpp",
        "C++": "cpp",

        "javascript": "js",
        "JavaScript": "js",

        "typescript": "ts",
        "TypeScript": "ts"
    }.get(solution.language, "txt")

    # --------------------------------------------------
    # 4. Find the next solution number
    # --------------------------------------------------

    solution_number = 1

    while any(
            folder.glob(f"solution{solution_number}.*")
    ):
        solution_number += 1

    # --------------------------------------------------
    # 5. Create the local solution file
    # --------------------------------------------------

    solution_file = folder / f"solution{solution_number}.{extension}"

    solution_file.write_text(
        solution.code,
        encoding="utf-8"
    )

    # --------------------------------------------------
    # 6. Create the GitHub solution path
    # --------------------------------------------------

    github_folder = f"{problem_number}. {problem_name}"

    github_solution_path = (
        f"{github_folder}/solution{solution_number}.{extension}"
    )

    # --------------------------------------------------
    # 7. Upload solution to GitHub
    # --------------------------------------------------

    response = upload_file(
        github_solution_path,
        solution.code
    )

    if response.status_code not in (200, 201):
        raise HTTPException(
            status_code=502,
            detail="Failed to save solution to GitHub."
        )

    # --------------------------------------------------
    # 8. Save notes only if notes were provided
    # --------------------------------------------------

    notes_saved = False

    if solution.notes.strip():

        notes_file = folder / f"notes{solution_number}.md"

        notes_file.write_text(
            solution.notes,
            encoding="utf-8"
        )

        github_notes_path = (
            f"{github_folder}/notes{solution_number}.md"
        )

        response = upload_file(
            github_notes_path,
            solution.notes
        )

        if response.status_code not in (200, 201):
            raise HTTPException(
                status_code=502,
                detail=(
                    "Solution was uploaded, "
                    "but notes failed to upload to GitHub."
                )
            )

        notes_saved = True

    # --------------------------------------------------
    # 9. Return success response
    # --------------------------------------------------

    return {
        "message": "Solution saved successfully",
        "problem": f"{problem_number}. {problem_name}",
        "solution_number": solution_number,
        "notes_saved": notes_saved
    }