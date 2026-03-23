"""
Vercel serverless entry point.
This file re-exports the FastAPI app so that Vercel can pick it up
as a Python serverless function.
"""

from app.main import app

# Vercel looks for an `app` variable in this file
# The FastAPI instance is already named `app` in app/main.py,
# so the re-import above is all that's needed.
