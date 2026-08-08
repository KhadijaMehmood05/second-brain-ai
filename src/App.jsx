import { useState } from "react";

import Header from "./components/Header";
import UploadBox from "./components/UploadBox";
import ChatBox from "./components/ChatBox";
import "./App.css";


function App() {



  const [documents, setDocuments] = useState(() => {


    const savedDocuments =
      localStorage.getItem(
        "secondBrainDocuments"
      );


    return savedDocuments
      ? JSON.parse(savedDocuments)
      : [];


  });







  function addDocument(newDocument) {



    const updatedDocuments = [

      ...documents,

      newDocument

    ];



    setDocuments(updatedDocuments);



    localStorage.setItem(

      "secondBrainDocuments",

      JSON.stringify(updatedDocuments)

    );



  }







  function removeDocument(index) {



    const updatedDocuments =

      documents.filter(

        (_, i) => i !== index

      );



    setDocuments(updatedDocuments);



    localStorage.setItem(

      "secondBrainDocuments",

      JSON.stringify(updatedDocuments)

    );



  }







  function clearDocuments() {



    setDocuments([]);



    localStorage.removeItem(

      "secondBrainDocuments"

    );


  }









  // Combine all uploaded PDFs for AI

  const documentText = documents

    .map((doc) => {



      return `



====================


FILE NAME:

${doc.name}



PAGES:

${doc.pages}



DOCUMENT CONTENT:


${doc.text}



====================



`;



    })

    .join("\n");









 return (
  <div>
    <Header />

    <main>
      <UploadBox
        addDocument={addDocument}
        documents={documents}
        removeDocument={removeDocument}
        clearDocuments={clearDocuments}
      />

      <ChatBox
        documentText={documentText}
      />
    </main>
  </div>
);

}



export default App;