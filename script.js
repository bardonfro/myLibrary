'use strict'

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;
}
book.prototype.clickButton = function (e) {
    /* In this function:
    *   - e = click event
    *   - this = button
    *   - card is set below
    * */
    const card = e.target.parentElement.parentElement;
    const confMessage = `Are you sure you want to remove ${card.book.title} from your "have read" list?`

    if (card.book.isRead /*&& confirm(confMessage)*/) {
        card.book.isRead = false;
        card.classList.remove("read");
        this.textContent = "I have not read";
    } else {
        card.book.isRead = true;
        card.classList.add("read");
        this.textContent = "I have read";
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
            btnRead.textContent = "I have not read";
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

const lordoftherings = new book ("The Lord Of The Rings", "J.R.R. Tolkein", "495", false);
const hamlet = new book("Hamlet", "William Shakespeare", "173", false);
hamlet.generateCard();
lordoftherings.generateCard();