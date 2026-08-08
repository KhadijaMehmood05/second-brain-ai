import * as pdfjsLib from "pdfjs-dist";

import workerSrc from 
"pdfjs-dist/build/pdf.worker.min.mjs?url";



pdfjsLib.GlobalWorkerOptions.workerSrc =
workerSrc;




async function extractTextFromPDF(file){


const arrayBuffer =
await file.arrayBuffer();




const pdf =
await pdfjsLib
.getDocument({
data:arrayBuffer
})
.promise;




let text="";





for(
let i=1;
i<=pdf.numPages;
i++
){


const page =
await pdf.getPage(i);



const content =
await page.getTextContent();




const pageText =
content.items

.map(item=>item.str)

.join(" ");




text += pageText + "\n";


}





return {


text:text,

pages:pdf.numPages


};



}



export default extractTextFromPDF;