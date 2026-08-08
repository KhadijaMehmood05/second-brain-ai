import { useState } from "react";

import extractTextFromPDF from "../utils/pdfReader";



function UploadBox({

addDocument,

documents,

removeDocument,

clearDocuments


}) {



const [loading,setLoading]=useState(false);






async function handleFile(e){


const files =
Array.from(e.target.files);



if(files.length===0)
return;




try{


setLoading(true);




for(const file of files){



const result =

await extractTextFromPDF(file);





addDocument({


name:file.name,


size:

(file.size/1024)

.toFixed(2)

+" KB",



pages:

result.pages,



text:

result.text



});



}



}

catch(error){


console.log(
"PDF ERROR:",
error
);


alert(
"Unable to read PDF"
);


}

finally{


setLoading(false);

e.target.value="";


}



}






return (

<div className="upload-box">



<h2>

📚 Upload Knowledge Documents

</h2>





<label htmlFor="pdf-upload">
  Upload PDF documents
</label>

<label htmlFor="pdf-upload">
  Upload PDF documents
</label>

<input
  id="pdf-upload"
  type="file"
  accept=".pdf"
  multiple
  onChange={handleFile}
/>




{

loading &&

<p>

📖 Reading PDF...

</p>


}







<div className="document-title">


<h3>

Uploaded Documents

({documents.length})

</h3>




{

documents.length>0 &&

<button

className="clear-button"

onClick={clearDocuments}

>

🗑 Clear All

</button>

}



</div>









{

documents.map((doc,index)=>(



<div

className="file-card"

key={index}

>


<h4>

📄 {doc.name}

</h4>




<p>

{doc.pages} Pages

<br/>

{doc.size}

</p>




<span>

✅ Ready for AI

</span>





<button

onClick={()=>removeDocument(index)}

>

Delete

</button>



</div>



))


}






</div>

);



}



export default UploadBox;