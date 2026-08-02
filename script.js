let pdfFiles = [];

function addPDF() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".pdf";

  input.onchange = function () {
    const file = input.files[0];
    if (!file) return;

    pdfFiles.push(file);

    const li = document.createElement("li");
    li.textContent = file.name;
    document.getElementById("pdfList").appendChild(li);
  };

  input.click();
}

async function mergePDFs() {
  if (pdfFiles.length < 2) {
    alert("कम से कम 2 PDF जोड़ें।");
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
}
