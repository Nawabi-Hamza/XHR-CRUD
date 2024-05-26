console.log("CRUD with XHR")



// const fileInput = document.querySelector(".file-input");
//   fileInput.onchange = () => {
//     if (fileInput.files.length > 0) {
//       const fileName = document.querySelector(".img-file .file-name");
//       fileName.innerText = fileInput.files[0].name;
//     }
//   };



const api = "http://localhost:7000/api"
const imgApi = "http://localhost:7000/api/images"
const showData = document.getElementById("showPost")
showData.innerHTML = `<tr><td colspan='7'><progress class="progress is-small is-primary" max="100">15%</progress></td></tr>`

/////////////////////////////////////////////////////////////////////////
// ===================START GET DATA FROM API WITH XHR===================
window.addEventListener("load",()=>{
        let rows = ''
        setTimeout(()=>{
            const req = new XMLHttpRequest()
            req.open("GET",`${api}/posts`)
            req.onload = function(){
                const data = JSON.parse(this.responseText)
                for(let item of data){
                    rows += `
                        <tr class="is-success">
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.description}</td>
                            <td>${item.status}</td>
                            <td>${item.date.split("T")[0]}</td>
                            <td>
                                <img src="${imgApi}/${item.file}" class='tbl-img' alt="${item.file}">
                            </td>
                            <td>
                                <button class="button is-dark is-small">Edit</button>
                                <button class="button is-danger is-small" id='deleteBtn' onclick="deleteFile(${item.id},'${item.file}')" >Delete</button>
                            </td>
                        </tr>
                    `
                }
                showData.innerHTML = rows
                // console.log(rows)
            }
            req.onerror = function(){
                console.log("ERROR ")
                console.log(this)
            }
            req.send()
        },2000)
})
// ====================END GET DATA FROM API WITH XHR====================
/////////////////////////////////////////////////////////////////////////
// ===================START POST DATA FROM API WITH XHR==================
const form = document.querySelector("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const formData = new FormData();
    
    const title = document.querySelector("#title").value
    const description = document.querySelector("#description").value
    const status = document.querySelector("#status").value
    const file = document.querySelector('#file').files[0];

    formData.append('title', title);
    formData.append('description', description);
    formData.append('status', status);
    formData.append('file', file);
    console.log(formData)

    const req = new XMLHttpRequest()
    req.open("POST",`${api}/posts`,true)
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('Failed to upload file');
            }
        }
    };

    req.onerror = function(){
        console.log("ERROR ")
        console.log(this)
    }
    req.send(formData)
})
// ===================END POST DATA FROM API WITH XHR====================
/////////////////////////////////////////////////////////////////////////
// =================START DELETE DATA FROM API WITH XHR==================
// Function to send a DELETE request
function deleteFile(fileId,img) {
    const req = new XMLHttpRequest();
    const url = `${api}/posts/delete/${fileId}/${img}`;
    req.open('DELETE', url, true);
    // Optional: Add headers if needed, e.g., for authentication
    // req.setRequestHeader('Authorization', 'Bearer YOUR_TOKEN');
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                console.log('File deleted successfully');
            } else {
                console.error('Failed to delete file', req.status, req.responseText);
            }
        }
    };
    req.send();
}

// Example usage
// const fileId = '12345'; // Replace with the actual file ID or name
// deleteFile(fileId);/


// ==================END DELETE DATA FROM API WITH XHR===================
