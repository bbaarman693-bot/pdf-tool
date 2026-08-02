let pdfFiles = [];

function addPDF() {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = ".pdf";

  input.onchange = function () {
    if (input.files.length > 0) {
      pdfFiles.push(input.files[0]);

      let li = document.createElement("li");
      li.innerText = input.files[0].name;
      document.getElementById("pdfList").appendChild(li);
    }
  };

  input.click();
}
