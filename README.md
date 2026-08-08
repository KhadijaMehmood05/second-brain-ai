# Second Brain AI 🧠

Second Brain AI is an AI-powered document assistant that helps users quickly find and understand information from their PDF documents. Users can upload one or multiple PDFs, and the application extracts their text and allows them to ask questions about the uploaded documents. The AI retrieves relevant information from the documents and generates an answer, helping users avoid manually searching through long files.

## Features

* 📄 Upload multiple PDF documents
* 🔍 Extract text from uploaded PDFs
* 🤖 Ask AI questions about uploaded documents
* 📚 Search information across multiple PDFs
* 💬 Display AI-generated answers using Markdown
* 🕘 Save and view previous chat history
* 💾 Store uploaded documents and chat history using browser local storage
* 🗑️ Delete individual documents or clear all documents
* ⚠️ Error handling for invalid or unreadable documents
* 📱 Responsive and accessible interface

## Tech Stack

* React
* Vite
* JavaScript
* React Markdown
* PDF.js
* Vitest
* V8 Coverage
* AI/LLM API
* LocalStorage

## How to Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd second-brain-ai
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Architecture

The application is organized into several main parts:

### `src/components`

Contains the main UI components.

* `Header.jsx` — Application header
* `UploadBox.jsx` — Handles PDF uploading, extraction and document management
* `ChatBox.jsx` — Handles user questions, AI responses and chat history

### `src/services`

Contains services used by the application.

* `aiService.js` — Handles communication with the AI service and generates answers from document information

### `src/utils`

Contains utility functions.

* `pdfReader.js` — Extracts text and page information from PDF documents

### `src/tests`

Contains automated tests for important application functionality.

* `aiService.test.js`
* `UploadBox.test.jsx`
* `ChatBox.test.jsx`

### `App.jsx`

Manages uploaded documents and combines their extracted text before passing it to the AI chat component.

## How the AI Works

The AI is used to solve a real document-search problem rather than acting as a general chatbot.

The workflow is:

1. The user uploads one or more PDF documents.
2. The application extracts text from each PDF.
3. The extracted document information is stored in the application.
4. The document text is provided to the AI service together with the user's question.
5. The AI identifies relevant information from the uploaded documents.
6. The AI generates an answer based on the available document content.
7. The answer is displayed to the user using Markdown formatting.

This allows users to ask questions about their own documents instead of manually searching through potentially large PDF files.

## Error Handling

The application handles several common failure cases.

### No question

If the user submits an empty question, the request is ignored.

### No documents

If the user tries to ask a question before uploading documents, the application displays:

> Please upload documents first.

### PDF extraction failure

If a PDF cannot be processed, the application catches the error and displays an error message instead of crashing.

### AI request failure

If the AI service fails to generate a response, the application displays an error message instead of leaving the user with a broken interface.

## Testing

The project uses Vitest for automated testing.

Run the tests with:

```bash
npm test
```

Current test results:

* **3 test files passed**
* **15 tests passed**
* **0 tests failed**

### Test Coverage

Coverage is generated using Vitest's V8 coverage provider.

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

The project exceeds the capstone requirement of at least 50% component coverage.

## Performance & Accessibility

The application was tested using Lighthouse.

Current audit results:

| Category       |   Score |
| -------------- | ------: |
| Performance    |  **92** |
| Accessibility  | **100** |
| Best Practices | **100** |
| SEO            |  **82** |

The capstone requires a Lighthouse score of at least 85 and no WCAG AA accessibility violations.

The application achieved:

* ✅ Performance above 85
* ✅ Accessibility 100
* ✅ No reported WCAG AA violations in the audit
* ✅ Best Practices 100

### Accessibility Improvement

During the accessibility audit, form controls were identified as needing associated labels. Accessible labels were added to improve the experience for users who rely on assistive technologies such as screen readers.

## Deployment

The application is deployed as a production web application.

**Live Application:**
YOUR_DEPLOYED_URL

**Repository:**
YOUR_GITHUB_REPOSITORY_URL

## Deployment Checklist

Before deployment, the following areas were checked:

* [x] Application builds successfully
* [x] Application works in production preview
* [x] Automated tests pass
* [x] Test coverage exceeds 50%
* [x] Accessibility audit completed
* [x] Performance audit completed
* [x] Error states handled
* [x] Production environment configured
* [x] README documentation completed

## Rollback Plan

If a production deployment introduces a problem, the previous working deployment can be restored through the deployment platform. The repository also provides the source code required to rebuild and redeploy a known working version.

## Known Limitations

* PDF processing is performed in the browser and very large PDFs may take longer to process.
* AI responses depend on the quality and completeness of the extracted document text.
* The application currently focuses on PDF documents.
* LocalStorage is browser-specific, so documents and chat history are not automatically synchronized across different devices.
* AI service availability can affect response generation.

## Future Improvements

Possible future improvements include:

* Support for additional document formats such as DOCX and TXT
* Improved semantic document retrieval
* User accounts and cloud synchronization
* Vector database integration for large document collections
* Streaming AI responses
* More advanced document summarization
* Document citations showing exactly where an answer came from
* Improved handling of very large documents

## Project Goal

Second Brain AI demonstrates how AI can be integrated into a practical frontend application to solve a real information-retrieval problem while considering accessibility, performance, testing, error handling and production readiness.
