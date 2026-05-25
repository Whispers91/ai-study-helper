🧠 Prompt

I’m building a project called “AI Study Helper” using React (Vite) for frontend and Node.js (Express) for backend.

Frontend is already done:

React app with Tailwind
File upload (PDF input)
Task selector (summarize / quiz)
Fake AI output working
State handled (file, task, loading, output)

Now I want to start backend work.

Help me step by step to:

Build an Express backend properly
Create a file upload API (using Multer)
Connect React frontend to backend using fetch/axios
Send PDF from frontend to backend
Receive file in backend and confirm upload works first
Then prepare backend for AI processing later

Important:

Explain things simply, not theory-heavy
Give clean code with minimal but clear comments
Don’t overcomplicate architecture
Focus on building MVP first, not production-level design

My goal:
A working flow: Upload PDF → Backend receives it → returns response → frontend displays it

--------------------------------------------------------------------------------------------

🟢 WEEK 1 — CORE SYSTEM (BUILD THE ENGINE)
Day 1–2 (Backend setup)
Express server
Basic routes (/, /upload)
CORS setup
Multer file upload working

🎯 Goal:

Backend can receive a PDF

Day 3 (Frontend → backend connection)
React fetch() / axios
Send file to backend
Confirm backend receives it

🎯 Goal:

Upload button is REAL (not fake anymore)

Day 4 (Processing pipeline)
Read file info
Return response from backend
Replace fake AI with backend response

🎯 Goal:

End-to-end flow works

Day 5 (stabilize + fix bugs)
clean UI flow
loading states
error handling
debug issues

🎯 Goal:

stable MVP

Day 6 (buffer / catch up / rest light day)
fix anything broken
improve structure
optional small features

🟡 WEEK 2 — REAL INTELLIGENCE + PRODUCT FEEL
Day 7–8 (AI integration)
connect AI API (OpenAI or similar)
send extracted text
get summary output

🎯 Goal:

real AI summarization

Day 9 (quiz generation)
generate questions
format output nicely

🎯 Goal:

2 working AI features

Day 10–11 (UI upgrade)
Tailwind polish
spacing improvements
card layout
better UX flow

🎯 Goal:

feels like real product

Day 12 (error handling + edge cases)
empty file
wrong input
loading failures

Day 13 (final cleanup)
refactor code
clean structure
remove messy logic

Day 14 (deployment OR showcase)
deploy frontend
deploy backend
connect live API

🎯 Goal:

shareable working app