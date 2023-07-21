let selectedFile;
console.log(window.XLSX);
document.getElementById('myFileInput').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
});

let data = [{
    "LogCode":"GTB057545903",
    "PAN": "506108*********9761",
    "STAN" : "201039",
    "RRN" :  "030300987982",
    "Terminal ID": "2PALW974",
    "Amount": "3100",
    "ResponseCode": "00",
    "Response Description" : "Approved",
    "Date": "03-03-2023 12:30:26",
    }];

    document.getElementById('convertBtn').addEventListener("click", () => {
        console.log('clicked')
        XLSX.utils.json_to_sheet(data, 'out.xlsx');
        if (selectedFile) {
            console.log('clicked', selectedFile)
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event) => {
                let data = event.target.result;
                console.log('test: ', data)
                let workbook = XLSX.read(data, { type: "binary" });
                console.log('WB: ', workbook);
                workbook.SheetNames.forEach(sheet => {
                    console.log('Sheet: ', sheet)
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    console.log('data: ', rowObject, ...rowObject);
                    document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 100);
                    console.log(document.getElementById("jsondata"))
                    document.getElementById('generateBtn').addEventListener("click", () => {
                        const data = document.getElementById('jsondata')
                        
                        // for(let i = 0; i < rowObject.length; i++ ) {
                            html2canvas(document.getElementById('jsondata')).then(function (canvas) {
                                var imageData = canvas.toDataURL("image/png");
                                var downloadLink = document.createElement("a");
                                downloadLink.href = imageData;
                                downloadLink.download = "Receipt";
                                downloadLink.click();
                            });
                        // }
                    }); 
                });
            };
        }
    });
    
// document.getElementById('generateBtn').addEventListener("click", () => {
//     const data = document.getElementById('jsondata')

//     html2canvas(data).then(function (canvas) {
//         var imageData = canvas.toDataURL("image/png");
//         var downloadLink = document.createElement("a");
//         downloadLink.href = imageData;
//         downloadLink.download = "Receipt";
//         downloadLink.click();
//     });
// });          