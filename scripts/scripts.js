class Book {
    constructor(title, authors, numberOfPages, isRead, isFavorite) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = !this.isRead;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}

class Bookshelf {
    constructor(books) {
        this.books = books;
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        const bookIndex = this.books.indexOf(book);
        if (bookIndex !== -1) {
            this.books.splice(bookIndex, 1);
        }
    }

    getUnreadBooks() {
        return this.books.filter(book => !book.isRead);
    }

    getFavBooks() {
        return this.books.filter(book => book.isFavorite);
    }
}

const shelf = new Bookshelf([]);
const totalBooks = document.getElementById('totalBooks');
const bookInShelf = document.getElementById('bookshelf');
const unreadBooksButton = document.getElementById('unreadBooks');
const favBooksButton = document.getElementById('favBooks');
const addBookButton = document.getElementById('addBook');
const TitleInput = document.getElementById('Title');
const AuthorInput = document.getElementById('Author');
const PagesInput = document.getElementById('Pages');

function updateTotalBooksCount() {
    totalBooks.textContent = shelf.books.length;
}

function displayBooks() {
    bookInShelf.innerHTML = '';
    shelf.books.forEach((book) => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <p>Title: ${book.title}</p>
            <p>Authors: ${book.authors}</p>
            <p>Pages: ${book.numberOfPages}</p>
            <p>Read: ${book.isRead ? 'Yes' : 'No'}</p>
            <p>Favorite: ${book.isFavorite ? 'Yes' : 'No'}</p>
            <button class="read"">Mark as Read</button>
            <button class="favorite"">Toggle Favorite</button>
            <button class="remove"">Remove</button>
        `;

        bookElement.querySelector('.read').addEventListener('click', () => {
            book.markAsRead();
            displayBooks();
        });

        bookElement.querySelector('.favorite').addEventListener('click', () => {
            book.toggleFavorite();
            displayBooks();
        });

        bookElement.querySelector('.remove').addEventListener('click', () => {
            shelf.removeBook(book);
            displayBooks();
            updateTotalBooksCount();
        });

        bookInShelf.appendChild(bookElement);
    });
}

unreadBooksButton.addEventListener('click', () => {
    const unreadBooks = shelf.getUnreadBooks();
    alert(`Number of Unread Books: ${unreadBooks.length}`);
});

favBooksButton.addEventListener('click', () => {
    const favBooks = shelf.getFavBooks();
    alert(`Number of Favorite Books: ${favBooks.length}`);
});

function addBook(){
    const title = TitleInput.value;
    const authors = AuthorInput.value;
    const numberOfPages = parseInt(PagesInput.value);
    const newBook = new Book(title, authors, numberOfPages, false, false);
    shelf.addBook(newBook);
    displayBooks();
    updateTotalBooksCount();
};

displayBooks();
updateTotalBooksCount();
