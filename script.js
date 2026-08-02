const pdfInput = document.createElement("input");
pdfInput.type = "file";
pdfInput.multiple = true;
pdfInput.accept = ".pdf";

async function mergePDFs() {
    pdfInput.click();

    pdfInput.onchange = async () => {
        const files = pdfInput.files;

        if (files.length < 2) {
            alert("कम से कम 2 PDF चुनो");
            return;
        }

        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(bytes);

            const pages = await mergedPdf.copyPages(
                pdf,
                pdf.getPageIndices()
            );

            pages.forEach(page => mergedPdf.addPage(page));
        }

        const mergedBytes = await mergedPdf.save();

        const blob = new Blob(
            [mergedBytes],
            { type: "application/pdf" }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "merged.pdf";
        a.click();
    };
}
