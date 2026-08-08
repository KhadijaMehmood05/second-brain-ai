import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});


/* ==============================
   CLEAN TEXT
============================== */

function cleanText(text) {
  return text
    .replace(/\s+/g, " ")
    .trim();
}


/* ==============================
   STOP WORDS
============================== */

const stopWords = new Set([
  "what",
  "which",
  "where",
  "when",
  "why",
  "how",
  "who",
  "is",
  "are",
  "was",
  "were",
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "for",
  "from",
  "with",
  "about",
  "this",
  "that",
  "these",
  "those",
  "can",
  "could",
  "should",
  "would",
  "please",
  "explain",
  "tell",
  "me",
  "give"
]);


/* ==============================
   GET IMPORTANT QUESTION WORDS
============================== */

function getQuestionWords(question) {

  return question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(word =>
      word.length > 2 &&
      !stopWords.has(word)
    );

}


/* ==============================
   CREATE DOCUMENT CHUNKS
============================== */

function createChunks(documentText) {

  const documents = documentText
    .split("====================")
    .filter(doc => doc.trim().length > 0);


  const chunks = [];


  documents.forEach((document, documentIndex) => {

    /* ==========================
       GET FILE NAME
    ========================== */

    let fileName = "Unknown Document";


    const fileMatch = document.match(
      /FILE NAME:\s*(.*?)(?:PAGES:|DOCUMENT CONTENT:)/is
    );


    if (fileMatch) {
      fileName = fileMatch[1].trim();
    }


    /* ==========================
       GET PAGE COUNT
    ========================== */

    let pages = "";


    const pageMatch = document.match(
      /PAGES:\s*(.*?)(?:DOCUMENT CONTENT:)/is
    );


    if (pageMatch) {
      pages = pageMatch[1].trim();
    }


    /* ==========================
       GET ACTUAL CONTENT
    ========================== */

    const contentMatch = document.match(
      /DOCUMENT CONTENT:\s*(.*)/is
    );


    if (!contentMatch) {
      return;
    }


    const content = cleanText(
      contentMatch[1]
    );


    if (!content) {
      return;
    }


    const words = content.split(" ");


    /*
      Medium-sized chunks.

      Smaller = less token usage.
      Larger = better context.
    */

    const chunkSize = 220;

    const overlap = 45;


    for (
      let i = 0;
      i < words.length;
      i += chunkSize - overlap
    ) {

      const chunkWords = words.slice(
        i,
        i + chunkSize
      );


      if (chunkWords.length < 30) {
        continue;
      }


      chunks.push({

        id:
          `${documentIndex}-${i}`,

        fileName,

        pages,

        text:
          chunkWords.join(" ")

      });

    }

  });


  return chunks;
}


/* ==============================
   SCORE CHUNKS
============================== */

function scoreChunk(
  chunk,
  question,
  questionWords
) {

  const text =
    chunk.text.toLowerCase();

  const fileName =
    chunk.fileName.toLowerCase();

  let score = 0;


  /* ==========================
     NORMAL WORD MATCH
  ========================== */

  questionWords.forEach(word => {

    if (text.includes(word)) {

      score += 3;

    }

  });


  /* ==========================
     FILE NAME MATCH
  ========================== */

  questionWords.forEach(word => {

    if (fileName.includes(word)) {

      score += 8;

    }

  });


  /* ==========================
     EXACT QUESTION PHRASE
  ========================== */

  const questionLower =
    question.toLowerCase();


  if (
    text.includes(questionLower)
  ) {

    score += 20;

  }


  /* ==========================
     FREQUENCY BONUS
  ========================== */

  questionWords.forEach(word => {

    const matches =
      text.split(word).length - 1;


    if (matches > 1) {

      score += Math.min(
        matches,
        4
      );

    }

  });


  return score;
}


/* ==============================
   FIND RELEVANT DOCUMENTS
============================== */

function findRelevantText(
  documentText,
  question
) {

  const chunks =
    createChunks(documentText);


  const questionWords =
    getQuestionWords(question);


  if (chunks.length === 0) {

    return "";

  }


  /* ==========================
     SCORE EVERY CHUNK
  ========================== */

  const scoredChunks =
    chunks.map(chunk => {

      return {

        ...chunk,

        score:
          scoreChunk(
            chunk,
            question,
            questionWords
          )

      };

    });


  /* ==========================
     SORT BY RELEVANCE
  ========================== */

  scoredChunks.sort(
    (a, b) =>
      b.score - a.score
  );


  /* ==========================
     KEEP BEST CHUNKS
  ========================== */

  const relevantChunks =
    scoredChunks
      .filter(
        chunk => chunk.score > 0
      )
      .slice(0, 6);


  /* ==========================
     DEBUG INFORMATION
  ========================== */

  console.log(
    "================================"
  );

  console.log(
    "TOTAL DOCUMENT CHUNKS:",
    chunks.length
  );

  console.log(
    "QUESTION:",
    question
  );

  console.log(
    "QUESTION WORDS:",
    questionWords
  );

  console.log(
    "SELECTED CHUNKS:",
    relevantChunks.length
  );

  console.log(
    "SELECTED DOCUMENTS:",
    [
      ...new Set(
        relevantChunks.map(
          chunk => chunk.fileName
        )
      )
    ]
  );

  console.log(
    "================================"
  );


  /* ==========================
     FORMAT FOR AI
  ========================== */

  return relevantChunks
    .map(chunk => {

      return `

SOURCE DOCUMENT:
${chunk.fileName}

PAGE INFORMATION:
${chunk.pages}

DOCUMENT CONTENT:
${chunk.text}

--------------------------------

`;

    })
    .join("\n");

}


/* ==============================
   ASK GROQ AI
============================== */

async function askAI(
  documentText,
  question
) {

  try {

    /* ==========================
       CHECK DOCUMENTS
    ========================== */

    if (
      !documentText ||
      !documentText.trim()
    ) {

      return (
        "⚠️ Please upload documents first."
      );

    }


    /* ==========================
       FIND RELEVANT INFORMATION
    ========================== */

    const relevantText =
      findRelevantText(
        documentText,
        question
      );


    if (
      !relevantText.trim()
    ) {

      return (
        "The information is not available " +
        "in uploaded documents."
      );

    }


    /* ==========================
       GROQ REQUEST
    ========================== */

    const result =
      await groq.chat.completions.create({

        model:
          "llama-3.1-8b-instant",


        messages: [

          {

            role: "system",

            content: `

You are Second Brain AI.

You answer questions ONLY from
the uploaded documents provided
by the user.

IMPORTANT RULES:

1. Do NOT use outside knowledge.

2. Do NOT guess.

3. Do NOT invent information.

4. Carefully read ALL provided
   document sections.

5. Multiple PDFs may contain
   relevant information.

6. Combine information from
   different PDFs when necessary.

7. If the answer is not contained
   in the provided documents,
   say exactly:

"The information is not available
in uploaded documents."

8. Give a clear and useful answer.

9. Keep the answer concise but
   complete.

10. If useful, mention the PDF
    source where the information
    was found.

`


          },


          {

            role: "user",

            content: `

UPLOADED DOCUMENT INFORMATION:

${relevantText}


USER QUESTION:

${question}


Answer the user's question using
ONLY the uploaded document
information above.

`

          }

        ],


        temperature: 0.1,


        /*
          Keep output controlled
          to reduce token usage.
        */

        max_tokens: 600

      });


    /* ==========================
       GET ANSWER
    ========================== */

    const answer =
      result
        ?.choices?.[0]
        ?.message?.content;


    if (!answer) {

      return (
        "❌ No answer was generated."
      );

    }


    return answer;

  }


  catch (error) {

    console.error(
      "========== GROQ ERROR =========="
    );

    console.error(error);

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "Status:",
      error?.status
    );

    console.error(
      "================================"
    );


    /* ==========================
       RATE LIMIT ERROR
    ========================== */

    if (
      error?.status === 429
    ) {

      return (
        "⏳ Groq rate limit reached. " +
        "Please wait a few seconds " +
        "before asking again."
      );

    }


    return (
      "❌ Unable to generate answer. " +
      "Please try again."
    );

  }

}


export default askAI;