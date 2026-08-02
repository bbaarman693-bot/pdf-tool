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
