const input = document.getElementById("pdfInput");
const addBtn = document.getElementById("addPdf");
const fileList = document.getElementById("fileList");

let pdfFiles = [];

addBtn.onclick = () => input.click();

input.onchange = () => {

    for (let file of input.files) {
        pdfFiles.push(file);
    }

    showFiles();
};

function showFiles() {

    fileList.innerHTML = "";

    pdfFiles.forEach((file,index)=>{

        fileList.innerHTML += `
        <div class="file-item">
            <span>${file.name}</span>
            <button onclick="removeFile(${index})">❌</button>
        </div>
        `;

    });

}

function removeFile(index){
    pdfFiles.splice(index,1);
    showFiles();
}
document.getElementById("mergeBtn").addEventListener("click", async () => {

    if (pdfFiles.length < 2) {
        alert("कम से कम 2 PDF चुनें।");
        return;
    }

    const mergedPdf = await PDFLib.PDFDocument.create();

    for (const file of pdfFiles) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

        pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();

    const blob = new Blob([mergedBytes], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();

    URL.revokeObjectURL(url);

});
