"""
hello.py — Starter execution script.
Verifies the project environment is set up correctly.

Usage:
    python execution/hello.py
"""

import os
import sys
from pathlib import Path


def main():
    project_root = Path(__file__).resolve().parent.parent
    print("=" * 50)
    print("  Dragon Website — Environment Check")
    print("=" * 50)

    # Check Python version
    py_version = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    print(f"\n✓ Python version: {py_version}")

    # Check directory structure
    required_dirs = ["directives", "execution", ".tmp"]
    for d in required_dirs:
        path = project_root / d
        status = "✓" if path.is_dir() else "✗ MISSING"
        print(f"{status} Directory: {d}/")

    # Check .env file
    env_path = project_root / ".env"
    if env_path.is_file():
        print("✓ .env file found")
    else:
        print("✗ .env file missing — create one from the template")

    # Check CLAUDE.md
    claude_path = project_root / "CLAUDE.md"
    if claude_path.is_file():
        print("✓ CLAUDE.md found")
    else:
        print("✗ CLAUDE.md missing")

    print("\n" + "=" * 50)
    print("  Setup complete. Ready to go!")
    print("=" * 50)


if __name__ == "__main__":
    main()
