'use strict'

/* To-do
* - Validate form input
*/

// Defining the DOM elements needed
const wrapper = document.querySelector('#wrapper');
const form = document.querySelector('#new-book');
const btnNewBook = document.querySelector('#form-toggle');
btnNewBook.addEventListener('click', clickBtnNew);
const btnCloseForm = document.querySelector('#new-book .button-close');
btnCloseForm.addEventListener('click', clickBtnNew);
const emptyPrompt = document.querySelector('#empty-prompt');


btnNewBook.status = "open";


let myLibrary = {
    shelf: [],

    addBook: function (book) {
        this.shelf.push(book);
        this.sort();
        return this.shelf;
    },

    removeBook: function (obj) {
        this.shelf = this.shelf.filter(bk => !(bk === obj));
        this.save();
        return this.shelf;
    },

    display: function () {
        this.shelf.forEach(function (bk) {
            bk.generateCard();
        });

        if (this.shelf.length > 0) {
            emptyPrompt.classList.add('hidden');
        } else {
            emptyPrompt.classList.remove('hidden');
        }
    },

    load: function () {
        if (localStorage.libraryShelf) {
            this.shelf = [];
            const input = JSON.parse(localStorage.libraryShelf);
            input.forEach(function (bk) {
                const newbook = new book (bk.title, bk.author, bk.pages, bk.isRead);
            })
        } else {
            console.log("No saved library.");
        }
        return this.shelf;
    },

    save: function () {
        const output = JSON.stringify(this.shelf);
        localStorage.libraryShelf = output;
        return output;
    },
    
    sort: function () {
        this.shelf.sort(function (a,b) {
            if (a.title < b.title) {
                return -1;
            } else {return 1;}
        })
        return this.shelf;
    },
    

}

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;
    myLibrary.addBook(this);
    myLibrary.save();
}

book.prototype.clickDel = function () {
    const card = this.parentElement.parentElement
    const book = card.book;
    const confMessage = `Are you sure you want to delete ${book.title} from your library?`

    if(confirm(confMessage)) {
        myLibrary.removeBook(book);
        wrapper.removeChild(card);
    }

}

book.prototype.clickRead = function () {
    const card = this.parentElement.parentElement
    const book = card.book;

    if (book.isRead) {
        book.isRead = false;
        card.classList.remove("read");
    } else {
        book.isRead = true;
        card.classList.add("read");
    }
    myLibrary.save();
}

book.prototype.generateCard = function () {
    //Creating the card div
    const card = document.createElement('div');
    card.classList = "book";
    if (this.isRead) {
        card.classList.add("read");
    }
    wrapper.appendChild(card);

    card.book = this; // So the card and the book object are associated

    //Creating the contents of the card
    const header = document.createElement('div');
        header.classList = "header"
        const title = document.createElement('div');
            title.classList = "title"
            title.textContent = this.title;
        header.appendChild(title);
        
        const btnDel = document.createElement('div');
            btnDel.classList = "button del-button";
                const x = document.createElement('div');
                    x.classList = "symbol";
                    x.textContent = "X";
                    btnDel.appendChild(x);
                const delLabel = document.createElement('div');
                    delLabel.classList = "label";
                    delLabel.textContent = "Del";
                    btnDel.appendChild(delLabel);
            btnDel.addEventListener('click', this.clickDel);
        header.appendChild(btnDel);
     

        const btnRead = document.createElement('div');
            btnRead.classList = "button read-button";
                const check = document.createElement('div');
                    check.classList = "symbol";
                    check.textContent = "\u2713";
                    btnRead.appendChild(check);
                const readLabel = document.createElement('div');
                    readLabel.classList = "label";
                    readLabel.textContent = "Read";
                    btnRead.appendChild(readLabel);
            btnRead.addEventListener('click', this.clickRead);
        header.appendChild(btnRead);
    card.appendChild(header);

    const author = document.createElement('div');
        author.classList = "author";
        const by = document.createElement('span');
        by.classList = "by";
        by.textContent = "by ";
        author.appendChild(by);
        const name = document.createElement('span');
        name.classList = "name";
        name.textContent = this.author;
        author.appendChild(name);
    card.appendChild(author);

    const pages = document.createElement('div');
        pages.classList = "pages";
        pages.textContent = this.pages + " pg.";
    card.appendChild(pages);
}


//Function that opens and closes the form to add a new book
function clickBtnNew() {
    if (form.classList.contains("hidden")) {
        form.classList.remove('hidden');
        btnNewBook.classList.remove('open');
        btnNewBook.classList.add('close');
        btnNewBook.textContent = "x";
    } else {
        form.classList.add('hidden');
        btnNewBook.classList.add('open');
        btnNewBook.classList.remove('close');
        btnNewBook.textContent = "+";
    }
}

function formSubmit (e) {
    const title = document.querySelector("#form-title");
    const author = document.querySelector("#form-author");
    const pages = document.querySelector("#form-pages");
    const isRead = document.querySelector("#form-is-read");

    const newBook = new book (title.value, author.value, pages.value, isRead.checked);
    newBook.generateCard();
    clickBtnNew(); // To close the form
}


myLibrary.load();
myLibrary.display();