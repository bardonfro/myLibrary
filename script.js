'use strict'

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;

    this.info = function() {
        const readStatement = this.isRead ? "has been read" : "not read yet";
        const info = `${title} by ${author}, ${pages} pages, ${readStatement}`
        return info;
    }
}