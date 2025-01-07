let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    showBooks();
}

function showBooks() {
    const libraryContainer = document.querySelector(".library");
    libraryContainer.textContent = "";

    for (const book of myLibrary) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book");

        for (const key in book) {
            const keyContainer = document.createElement("div");
            keyContainer.classList.add(key);
            keyContainer.textContent = book[key];
            bookContainer.appendChild(keyContainer);
        }

        bookContainer.querySelector(".author").textContent = "Author: " + bookContainer.querySelector(".author").textContent;
        bookContainer.querySelector(".pages").textContent = "Pages: " + bookContainer.querySelector(".pages").textContent;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.id = book.title.replaceAll(" ", "_");
        deleteButton.addEventListener("click", () => {
            myLibrary = myLibrary.filter((book) => book.title.replaceAll(" ", "_") !== deleteButton.id);
            showBooks();
        }); 
        bookContainer.appendChild(deleteButton);

        libraryContainer.append(bookContainer);
    }
}

addBookToLibrary(new Book("The Exaltation of Inana", "Enheduana", 50));
addBookToLibrary(new Book("Gilgamesh", "Unknown", 210));
addBookToLibrary(new Book("Genesis", "Unknown", 150));
addBookToLibrary(new Book("Iliad", "Homer, tr. Lattimore", 704));
addBookToLibrary(new Book("If Not, Winter: Fragments of Sappho", "Sappho, tr. Carson", 416));
addBookToLibrary(new Book("Odyssey", "Homer, tr. Wilson", 560));
addBookToLibrary(new Book("Oresteia", "Aeschylus, tr. Lattimore", 336));
addBookToLibrary(new Book("Symposium", "Plato, trs. Nehamas and Woodruff", 128));
addBookToLibrary(new Book("Aeneid", "Virgil, tr. Mandelbaum", 416));
addBookToLibrary(new Book("Gospel of Luke", "Unknown", 60));
addBookToLibrary(new Book("Gospel of John", "Unknown", 40));


showBooks();    



function addNewBook() {
    const newTitle = document.querySelector("#title").value;
    const newAuthor = document.querySelector("#author").value;
    const newPages = document.querySelector("#pages").value;
    if (!newTitle || !newAuthor || isNaN(newPages) || newPages < 0) {
        alert("Please fill all fields correctly.");
        return false;
    }
    const newBook = new Book(newTitle, newAuthor, newPages);
    console.log(newBook);
    addBookToLibrary(newBook);
    return true;
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const submitButton = document.querySelector("dialog #submit");


// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    if (addNewBook()) {
        dialog.close();
    }
});