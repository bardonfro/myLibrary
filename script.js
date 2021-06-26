'use strict'

/* To-do
* - Local storage option, then allow form submit to reset and use displayLibrary()
* - Update footer links
* - Validate form input
*
*/

let arrLibrary = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;
    arrLibrary.push(this);
}
book.prototype.clickButton = function (e) {
    /* In this function:
    *   - e = click event
    *   - this = button
    *   - book is set below
    */

    const book = this.parentElement.parentElement.book;
    const confMessage = `Are you sure you want to remove ${book.title} from your "have read" list?`

    if (book.isRead /*&& confirm(confMessage)*/) {
        book.isRead = false;
        book.card.classList.remove("read");
    } else {
        book.isRead = true;
        book.card.classList.add("read");
    }
}
book.prototype.info = function() {
    const readStatement = this.isRead ? "has been read" : "not read yet";
    const info = `${title} by ${author}, ${pages} pages, ${readStatement}`
    return info;
}
book.prototype.generateCard = function () {
    //Creating the card div
    this.card = document.createElement('div');
    this.card.classList = "book";
    if (this.isRead) {
        this.card.classList.add("read");
    }
    this.card.book = this;

    //Creating the contents
    const header = document.createElement('div');
        header.classList = "header"
        const title = document.createElement('div');
            title.classList = "title"
            title.textContent = this.title;
            header.appendChild(title);
        const btnRead = document.createElement('button');
            btnRead.classList = "read-button";
                const check = document.createElement('div');
                    check.classList = "read-check";
                    check.textContent = "\u2713";
                    btnRead.appendChild(check);
                const readLabel = document.createElement('div');
                    readLabel.classList = "read-label";
                    readLabel.textContent = "Read";
                    btnRead.appendChild(readLabel);
            btnRead.addEventListener('click', this.clickButton);
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
    this.card.appendChild(header);
    this.card.appendChild(author);
    this.card.appendChild(pages);
    document.body.appendChild(this.card);
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
}

const lordoftherings = new book ("The Lord Of The Rings", "J.R.R. Tolkein", "495", false);
const hamlet = new book("Hamlet", "William Shakespeare", "173", false);

function displayLibrary () {
    arrLibrary.sort(function sort(a,b) {
        if (a.title < b.title) {return -1;
    } else {return 1;}
    })
    

    arrLibrary.forEach(function a(a) {a.generateCard()});
}

displayLibrary();