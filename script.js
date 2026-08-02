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
let mergedBlob = null;
addBtn.onclick = () => input.click();

input.onchange = () => {

    for (const file of input.files) {

        if (file.type !== "application/pdf") {
            alert("JPEG/JPG/PNG files are not allowed. Please select PDF files only.");
            continue;
        }

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
        if (file.type !== "application/pdf") {
    alert("JPEG/JPG/PNG files are not allowed in Merge PDF. Please select PDF files only.");
    return;
}
        const bytes = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

        pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
mergedBlob = new Blob([mergedBytes], {
    type: "application/pdf"
});

downloadBtn.style.display = "inline-block";

alert("PDF Merged Successfully!");
    
});
downloadBtn.addEventListener("click", () => {

    if (!mergedBlob) {
        alert("Please merge PDF first.");
        return;
    }

    const url = URL.createObjectURL(mergedBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Merged.pdf";
    a.click();

    URL.revokeObjectURL(url);

});
// ===== Split PDF =====

const splitPdfInput = document.getElementById("splitPdfInput");
const selectSplitPdf = document.getElementById("selectSplitPdf");
const splitFileName = document.getElementById("splitFileName");

let splitPdfFile = null;

selectSplitPdf.addEventListener("click", () => {
    splitPdfInput.click();
});

splitPdfInput.addEventListener("change", () => {

    if (splitPdfInput.files.length > 0) {
        splitPdfFile = splitPdfInput.files[0];
        splitFileName.textContent = splitPdfFile.name;
    }

});
