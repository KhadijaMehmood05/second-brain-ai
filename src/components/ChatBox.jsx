import { useState } from "react";
import ReactMarkdown from "react-markdown";
import askAI from "../services/aiService";


function ChatBox({ documentText }) {


  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);



  const [chatHistory, setChatHistory] = useState(() => {

    const savedChat =

      localStorage.getItem(
        "secondBrainChat"
      );


    return savedChat
      ? JSON.parse(savedChat)
      : [];


  });




  const [showHistory, setShowHistory] = useState(false);








  async function handleAsk() {



    if (!question.trim()) {

      return;

    }





    if (!documentText) {


      setAnswer(
        "⚠️ Please upload documents first."
      );


      return;


    }







    try {


      setLoading(true);

      setAnswer("");




      const response =

        await askAI(

          documentText,

          question

        );






      const newChat = {


        question: question,


        answer: response,


        date:

          new Date()

          .toLocaleString()


      };







      const updatedHistory = [


        ...chatHistory,


        newChat


      ];






      setChatHistory(updatedHistory);






      localStorage.setItem(

        "secondBrainChat",

        JSON.stringify(updatedHistory)

      );







      setAnswer(response);


      setQuestion("");



    }

    catch(error) {

  console.log("AI Error:", error);

  setAnswer(
    "❌ Unable to generate answer."
  );

}

    finally {


      setLoading(false);


    }


  }









  function clearHistory() {


    setChatHistory([]);


    localStorage.removeItem(

      "secondBrainChat"

    );


  }









  return (


    <div className="chat-container">






     








      {/* History Sidebar */}



      {

        showHistory && (



          <div className="history-sidebar">





            <div className="history-header">

  <h3>
    Chat History
  </h3>


  <div>

    <button
      onClick={clearHistory}
    >
      🗑 Clear
    </button>


    <button
      className="close-history"
      onClick={() => setShowHistory(false)}
    >
      ✖
    </button>

  </div>


</div>









            {

              chatHistory.length === 0

                ?

                <p>

                  No previous chats

                </p>


                :



                chatHistory.map((chat,index)=>(



                  <div


                    className="history-item"


                    key={index}


                  >





                    <h4>

                      🧑 Question

                    </h4>



                    <p>

                      {chat.question}

                    </p>







                    <h4>

                      🤖 Answer

                    </h4>





                    <div className="history-answer">


                      <ReactMarkdown>

                        {chat.answer}

                      </ReactMarkdown>


                    </div>







                    <small>

                      {chat.date}

                    </small>




                  </div>



                ))


            }






          </div>



        )

      }









      {/* Main Chat Area */}





      
       <div className="chat-main">


<button
  className="history-toggle"
  onClick={() =>
    setShowHistory(!showHistory)
  }
>
  🕘 See Chat History
</button>


<h2>
  🤖 Ask Your Knowledge
</h2>
      







        {

          loading &&

          <p>

            🤖 Thinking...

          </p>


        }









        {

          answer &&


          <div className="answer-box">



            <h3>

              AI Answer

            </h3>





            <ReactMarkdown>

              {answer}

            </ReactMarkdown>




          </div>



        }









 
<div className="input-area">
  <label htmlFor="question-input">
  </label>

  <div className="question-row">
    <input
      id="question-input"
      type="text"
      placeholder="Ask a question about your documents..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleAsk();
        }
      }}
    />

    <button onClick={handleAsk}>
      Ask AI
    </button>
  </div>
</div>





      </div>






    </div>


  );



}



export default ChatBox;