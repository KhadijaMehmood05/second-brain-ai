# Second Brain AI 🧠

Second Brain AI is an AI-powered document assistant that helps users quickly find and understand information from their PDF documents. Users can upload one or multiple PDFs, and the application extracts their text and allows them to ask questions about the uploaded documents. The AI analyzes the available document content and generates relevant answers, helping users avoid manually searching through long files.

## 🚀 Live Application

**Live Demo:** https://second-brain-ai-bice.vercel.app/

**GitHub Repository:** https://github.com/KhadijaMehmood05/second-brain-ai

---

## ✨ Features

* 📄 Upload multiple PDF documents
* 🔍 Extract text from uploaded PDFs
* 🤖 Ask AI questions about uploaded documents
* 📚 Search information across multiple PDFs
* 💬 Display AI-generated answers using Markdown
* 🕘 Save and view previous chat history
* 💾 Store uploaded documents and chat history using browser LocalStorage
* 🗑️ Delete individual documents or clear all documents
* ⚠️ Handle PDF extraction and AI request errors
* 📱 Responsive and accessible interface

---

## 🛠️ Tech Stack

* React
* Vite
* JavaScript
* React Markdown
* PDF.js
* Vitest
* React Testing Library
* V8 Coverage
* AI/LLM API
* LocalStorage
* Vercel

---

## 💻 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/KhadijaMehmood05/second-brain-ai.git
```

### 2. Open the project

```bash
cd second-brain-ai
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the required AI API key using the environment-variable name expected by the application.

Do not commit the `.env` file or expose API keys in the repository.

### 5. Start the development server

```bash
npm run dev
```

Then open the local URL displayed in the terminal.

---

## 📦 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The production build was successfully tested before deployment.

---

# 🏗️ Architecture

The application is organized into several main parts.

## `src/components`

Contains the main user-interface components.

### `Header.jsx`

Displays the application header and branding.

### `UploadBox.jsx`

Handles:

* PDF file selection
* PDF text extraction
* Document display
* Individual document deletion
* Clearing uploaded documents

### `ChatBox.jsx`

Handles:

* User questions
* AI requests
* AI responses
* Loading state
* Error messages
* Chat history
* Saving chat history to LocalStorage

---

## `src/services`

Contains services responsible for external functionality.

### `aiService.js`

Handles communication with the AI/LLM service.

It receives the extracted document content and the user's question, sends the information to the AI model, and returns the generated answer.

---

## `src/utils`

Contains reusable utility functions.

### `pdfReader.js`

Uses PDF.js to extract text and page information from uploaded PDF documents.

---

## `src/tests`

Contains automated tests for important application functionality.

* `aiService.test.js`
* `UploadBox.test.jsx`
* `ChatBox.test.jsx`

---

## `App.jsx`

Acts as the main application controller.

It:

1. Maintains uploaded document state.
2. Saves documents to LocalStorage.
3. Removes individual documents.
4. Clears all documents.
5. Combines extracted PDF content.
6. Passes the combined document content to `ChatBox`.

---

# 🤖 AI Integration

The AI functionality is the core feature of Second Brain AI.

Instead of being a general-purpose chatbot, the AI is used specifically to help users understand and retrieve information from their own uploaded documents.

### AI Workflow

1. The user uploads one or more PDF documents.
2. PDF.js extracts the text from each document.
3. The application stores the extracted document information.
4. The extracted content is combined and provided to the AI service.
5. The user enters a question about the documents.
6. The AI receives the document content together with the user's question.
7. The AI generates an answer based on the available document information.
8. The answer is displayed using Markdown formatting.
9. The question and answer can be saved in chat history.

This makes the AI capability meaningful because it directly solves the problem of finding information inside lengthy documents.

---

# 🛡️ Error Handling & Resilience

The application handles several common failure cases.

### Empty Question

If the user submits an empty question, the request is ignored.

### No Uploaded Documents

If the user asks a question before uploading documents, the application displays an appropriate message:

> ⚠️ Please upload documents first.

### PDF Processing Failure

If a PDF cannot be processed or its text cannot be extracted, the application handles the error instead of allowing the application to crash.

### AI Request Failure

If the AI service fails, the application catches the error and displays an error message instead of leaving the interface in a broken state.

### Loading State

While the AI is generating a response, the application displays a loading state so the user knows that the request is being processed.

---

# 🧪 Testing

The project uses **Vitest** and **React Testing Library** for automated testing.

Run the tests with:

```bash
npm test
```

Current test results:

* **3 test files passed**
* **15 tests passed**
* **0 tests failed**

## Test Coverage

Coverage can be generated using:

```bash
npm test -- --coverage
```

Current coverage:

| Metric     | Coverage |
| ---------- | -------: |
| Statements |   75.53% |
| Branches   |   70.37% |
| Functions  |      80% |
| Lines      |   75.53% |

The project exceeds the capstone requirement of at least **50% component coverage**.

---

# ⚡ Performance & Accessibility

A mobile Lighthouse audit was performed on the production application.

### Lighthouse Results

| Category       |   Score |
| -------------- | ------: |
| Performance    |  **91** |
| Accessibility  | **100** |
| Best Practices | **100** |
| SEO            |  **50** |

### Results

* ✅ Performance score is above the capstone target of 85
* ✅ Accessibility score is 100
* ✅ Best Practices score is 100
* ✅ No automated WCAG AA accessibility violations were reported by Lighthouse
* ⚠️ SEO score is 50 and can be improved in a future version

The Lighthouse audit was performed using a mobile device simulation and slow 4G network conditions.

### Accessibility Improvement

The question input was reviewed to ensure it has an associated accessible label. Duplicate labels were removed so the input has a clear and meaningful accessible name.

This improves usability for people using screen readers and other assistive technologies.

---

# 🚀 Deployment

The application is deployed as a production web application using Vercel and is connected to the GitHub repository.

**Live Application:**
https://second-brain-ai-bice.vercel.app/

**Repository:**
https://github.com/KhadijaMehmood05/second-brain-ai

Production builds were successfully tested locally before deployment.

Environment variables are configured through the deployment environment rather than being committed to the repository.

---

# ✅ Deployment Checklist

* [x] Application builds successfully
* [x] Production build tested locally
* [x] Application deployed successfully
* [x] Live production URL verified
* [x] GitHub repository connected
* [x] Environment variables configured through deployment settings
* [x] AI functionality tested
* [x] PDF upload functionality tested
* [x] Error states implemented
* [x] Automated tests pass
* [x] Test coverage exceeds 50%
* [x] Lighthouse performance audit completed
* [x] Lighthouse accessibility audit completed
* [x] README documentation completed
* [x] Rollback procedure documented

**Deployment status:** Production deployment completed successfully.

---

# 🔄 Rollback Plan

If a production deployment introduces a critical problem, the application can be rolled back by reverting the problematic Git commit and pushing the corrected version to the `main` branch.

Because the Vercel project is connected to GitHub, a new deployment will be triggered automatically.

Vercel deployment and runtime logs can also be used to identify production problems.

---

# ⚠️ Known Limitations

* PDF processing is performed in the browser, so very large PDFs may take longer to process.
* AI responses depend on the quality and completeness of the extracted document text.
* The application currently focuses on PDF documents.
* LocalStorage is browser-specific, so documents and chat history are not synchronized between different devices.
* AI service availability can affect response generation.
* The current application sends the extracted document content to the AI service when answering questions, which may become less efficient for very large document collections.

---

# 🔮 Future Improvements

Possible future improvements include:

* Support for additional document formats such as DOCX and TXT
* Improved semantic document retrieval
* Vector database integration for large document collections
* User accounts and cloud synchronization
* Streaming AI responses
* More advanced document summarization
* Document citations showing exactly where an answer came from
* Improved handling of very large documents
* Better chunking and retrieval for large PDF collections
* Improved SEO and metadata

---

# 📊 Production Audit Summary

| Area                      | Result               |
| ------------------------- | -------------------- |
| Live Application          | ✅ Deployed           |
| GitHub Repository         | ✅ Available          |
| Production Build          | ✅ Successful         |
| AI Integration            | ✅ Implemented        |
| PDF Processing            | ✅ Implemented        |
| Error Handling            | ✅ Implemented        |
| Automated Tests           | ✅ 15 passing         |
| Test Coverage             | ✅ ~75.53% statements |
| Lighthouse Performance    | ✅ 91                 |
| Lighthouse Accessibility  | ✅ 100                |
| Lighthouse Best Practices | ✅ 100                |
| SEO                       | ⚠️ 50                |
| Deployment Checklist      | ✅ Completed          |
| Rollback Plan             | ✅ Documented         |

---

# 🧠 Reflection

The hardest part of this project was integrating the AI service with the frontend while making PDF text extraction, API authentication, error handling, testing, and deployment work together. I also faced production deployment issues involving environment variables and configuration. These problems taught me that an application working correctly on a local machine does not automatically mean it is production-ready.

If I built the project again, I would plan the production architecture and environment-variable setup earlier instead of leaving deployment configuration until the end. I would also design the document-retrieval system with large documents in mind from the beginning.

One thing that surprised me was how many details are involved in shipping a real application beyond implementing the main feature. Testing, accessibility, performance, environment configuration, deployment, error handling, documentation, and rollback planning are all important parts of building a production-ready product.

---

# 🎯 Project Goal

Second Brain AI demonstrates how an AI/LLM can be integrated into a practical frontend application to solve a real information-retrieval problem.

The project combines PDF processing, AI-powered document understanding, persistent browser storage, automated testing, accessibility considerations, error handling, and production deployment into a complete working application.

