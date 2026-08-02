function openTool(id) {
    document.querySelectorAll(".tool").forEach(tool => {
        tool.style.display = "none";
    });

    document.getElementById(id).style.display = "block";
}

const input = document.getElementById("pdfInput");
const addBtn = document.getElementById("addPdf");
const fileList = document.getElementById("fileList");
const mergeBtn = document.getElementById("mergeBtn");

let pdfFiles = [];

addBtn.onclick = () => input.click();

input.onchange = () => {
    for (const file of input.files) {
        pdfFiles.push(file);
    }
    showFiles();
};

function showFiles() {
    fileList.innerHTML = "";

    pdfFiles.forEach((file, index) => {
        fileList.innerHTML += `
        <div class="file-item">
            <span>${index + 1}. ${file.name}</span>
            <button onclick="removeFile(${index})">Remove</button>
        </div>`;
    });
}

function removeFile(index) {
    pdfFiles.splice(index, 1);
    showFiles();
}

mergeBtn.addEventListener("click", async () => {

    if (pdfFiles.length < 2) {
        alert("Please select at least 2 PDF files.");
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

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Merged.pdf";

    link.click();
});
