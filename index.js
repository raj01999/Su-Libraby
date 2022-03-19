// Book Class Creating the book object
class Book {
    constructor(bookName, author, type, idx) {
        this.bookName = bookName;
        this.author = author;
        this.type = type;
        this.idx = idx;
    }

    addToDom() {
        let tableBody = document.getElementById("tableBody");
        let tableRow = document.createElement("tr");
        tableRow.setAttribute("id", `row${this.idx}`);
        let html = `<td id="name${this.idx}" class ="bookNameShow">${this.bookName}</td>
                <td>${this.author}</td>
                <td class="td">${this.type}</td>
                <td class ="td"><button id="btn${this.idx}" class="btn btn-primary" onclick="deleting(this.id)">Delete</button></td>`;
        tableRow.innerHTML = html;
        tableBody.appendChild(tableRow);

        document.getElementById("bookAddedSuccess").style.display = "block";

        setTimeout(()=>{
            document.getElementById("bookAddedSuccess").style.display = "none";
        }, 3500);

    }

    validating() {
        if (this.bookName.length < 3) {

            document.getElementById("bookNameError").style.display = "block";

            setTimeout(()=>{
                document.getElementById("bookNameError").style.display = "none";
            }, 3500);

            return false;
        }
        if (this.author.length < 3) {

            document.getElementById("authorNameError").style.display = "block";

            setTimeout(()=>{
                document.getElementById("authorNameError").style.display = "none";
            }, 3500);

            return false;
        }
        return true;
    }
}


// Search class, Searching the book;
class Search {
    constructor(searchKey) {
        this.searchKey = searchKey.toLowerCase();
    }

    searching() {
        document.getElementById("addBookContainer").style.display = "none";
        let elements = document.getElementsByClassName("bookNameShow");

        Array.from(elements).forEach((ele) => {
            let row = document.getElementById(`row${ele.id.replace("name", "")}`);

            if (ele.innerHTML.toLowerCase().includes(this.searchKey)) {
                row.style.display = "table-row";
            }
            else {
                row.style.display = "none";
            }
        });

    }
}


// adding the books and populating the dom.
let idx = 0;
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let bookType = document.getElementById("bookType").value;
    let newBook = new Book(bookName, author, bookType, idx);

    if (newBook.validating()) {
        newBook.addToDom();
        idx++;
        document.getElementById("addBookContainer").style.display = "none";
        form.reset();
    }
});



// make add book area hidden and visible
let btnAddBook = document.getElementById("btnAddBook");
btnAddBook.addEventListener("click", (e) => {
    let addBookContainer = document.getElementById("addBookContainer");

    if (addBookContainer.style.display == "block") {
        addBookContainer.style.display = "none";
    }
    else {
        addBookContainer.style.display = "block";
    }
});


// Deleting Function
function deleting(id) {
    let idx = id.replace("btn", "");
    let tableBody = document.getElementById("tableBody");
    let row = document.getElementById(`row${idx}`);
    tableBody.removeChild(row);
}


// using search class search the books
let searchArea = document.getElementById("searchArea");
searchArea.addEventListener("input", (e) => {
    let newSearch = new Search(searchArea.value);
    newSearch.searching();
    if (e.key == "Enter") {
        newSearch.searching();
        searchArea.value = "";
    }
});

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newSearch = new Search(searchArea.value);
    newSearch.searching();
    searchArea.value = "";
});


// Home and S Librey logo to load full page;
document.getElementById("logo").addEventListener("click", (e) => {
    let newSearch = new Search("");
    newSearch.searching();
});

document.getElementById("home").addEventListener("click", (e) => {
    let newSearch = new Search("");
    newSearch.searching();
});
