let library = [];
const tbody = document.querySelector('tbody');

function Book(title, author, numOfPages) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = false;

}


Book.prototype.addBookToLibrary = function() {
    library.push(this);

}

Book.prototype.finishReading = function() {
    let readIcon = document.createElement('i');
    readIcon.classList.add('mdi', 'mdi-eye');
    readIcon.setAttribute('style', 'cursor:pointer; color:lightgray; font-size: 1.5rem;');

    readIcon.addEventListener('click', () => {
        if (!this.isRead) {
            this.isRead = true;
            readIcon.setAttribute('style', 'color:green; cursor:pointer; font-size: 1.5rem;');
        } else {
            this.isRead = false;
            readIcon.setAttribute('style', 'color:lightgray; cursor: pointer; font-size: 1.5rem;');
        }

    });
    return readIcon;
}

function checkBookExistence(book) {
    let result = false;

    library.find(b => {
        loop: for (let attribute in b) {
            if (Object.prototype.hasOwnProperty.call(b, attribute)) {
                if (typeof b[attribute] === 'string') {
                    if (book[attribute].toLowerCase() === b[attribute].toLowerCase())
                        result = true;
                    else break loop;

                } else {
                    if (book[attribute] === b[attribute])
                        result = true;
                    else break loop;
                }
            }
        }
    });
    return result;
}

function addBookToTable(book) {

    const row = document.createElement('tr');
    for (let attribute in book) {
        if (Object.prototype.hasOwnProperty.call(book, attribute)) {
            const cell = document.createElement('td');
            if (typeof book[attribute] === 'boolean')
                cell.appendChild(book.finishReading());
            else
                cell.textContent = book[attribute];
            row.appendChild(cell);
        }
    }
    row.appendChild(book.addDeleteButton());
    tbody.appendChild(row);

}

Book.prototype.addDeleteButton = function() {
    const cell = document.createElement('td');
    const del = document.createElement('div');
    del.textContent = "Delete";
    del.classList.add('delete');

    cell.appendChild(del);
    del.addEventListener('click', () => {
        const row = del.parentElement.parentElement;
        const tableBody = row.parentElement;
        let index = Array.prototype.indexOf.call(tableBody.children, row);
        console.log(index);
        library.splice(index, 1);
        row.remove();
    });
    return cell;

}

const addBook = document.querySelector('button');

addBook.addEventListener('click', () => {
    let book;
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pageCount = document.querySelector('#num-of-pages').value;

    if (title && author && pageCount)
        book = new Book(title, author, pageCount);

    if (!checkBookExistence(book)) {
        book.addBookToLibrary();
        addBookToTable(book);
    } else
        alert("That book already exists!");

});

//clearing the form after submission
const form = document.querySelector('#myform');
form.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault(); //prevent page from loading
    form.reset();
});

//reseting form when reloading
window.onbeforeunload = form.reset();