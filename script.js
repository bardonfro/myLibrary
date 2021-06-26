'use strict'

/* To-do
* - Local storage option, then allow form submit to reset and use displayLibrary()
* - Update footer links
* - Validate form input
*
*/

let myLibrary = {
    shelf: [],

    addBook: function (book) {
        this.shelf.push(book);
        this.sort();
        this.save();
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
    },

    load: function () {
        if (localStorage.libraryShelf) {
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
                return true;
            } else {return false;}
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
}

book.prototype.clickDel = function () {
    const card = this.parentElement.parentElement
    const book = card.book;
    const confMessage = `Are you sure you want to delete ${book.title} from your library?`

    myLibrary.removeBook(book);
    document.body.removeChild(card);

}

book.prototype.clickRead = function (e) {
    /* In this function:
    *   - e = click event
    *   - this = button
    *   - book is set below
    */

    const card = this.parentElement.parentElement
    const book = card.book;
    const confMessage = `Are you sure you want to remove ${book.title} from your "have read" list?`

    if (book.isRead /*&& confirm(confMessage)*/) {
        book.isRead = false;
        card.classList.remove("read");
    } else {
        book.isRead = true;
        card.classList.add("read");
    }
}
book.prototype.info = function() {
    const readStatement = this.isRead ? "has been read" : "not read yet";
    const info = `${title} by ${author}, ${pages} pages, ${readStatement}`
    return info;
}
book.prototype.generateCard = function () {
    //Creating the card div
    const card = document.createElement('div');
    card.classList = "book";
    if (this.isRead) {
        card.classList.add("read");
    }
    card.book = this;

    //Creating the contents
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
        //author.textContent = "por " + this.author;
    const pages = document.createElement('div');
        pages.classList = "pages";
        pages.textContent = this.pages + " pg.";
    //Filling the card and placing it in the DOM
    card.appendChild(header);
    card.appendChild(author);
    card.appendChild(pages);
    document.body.appendChild(card);
}

const form = document.querySelector('#new-book');
const btnNewBook = document.querySelector('#form-toggle');
btnNewBook.addEventListener('click', clickBtnNew);
const btnCloseForm = document.querySelector('#new-book .button-close');
btnCloseForm.addEventListener('click', clickBtnNew);

btnNewBook.status = "open";

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

    console.log(title.value);
    console.log(author.value);
    console.log(pages.value);
    console.log(isRead.value);
    const newBook = new book (title.value, author.value, pages.value, isRead.checked);
    newBook.generateCard();
    clickBtnNew();
}

// const lordoftherings = new book ("The Lord Of The Rings", "J.R.R. Tolkein", "495", false);
// const hamlet = new book("Hamlet", "William Shakespeare", "173", false);

myLibrary.load();
myLibrary.display();