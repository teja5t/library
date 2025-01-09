class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}

class Library {
    constructor() {
        this.dialog = document.querySelector("dialog");
        this.showButton = document.querySelector("dialog + button");
        this.submitButton = document.querySelector("dialog #submit");
        this.libraryContainer = document.querySelector(".library");
        
        
        // "Show the dialog" button opens the dialog modally
        this.showButton.addEventListener("click", () => {
            this.dialog.showModal();
        });
        
        this.submitButton.addEventListener("click", (e) => {
            e.preventDefault()
            if (this.addNewBook()) {
                document.querySelector("#title").value = "";
                document.querySelector("#author").value = "";
                document.querySelector("#pages").value = "";
                this.dialog.close();
            }
        });

        this.myLibrary = [];
    }

    showBooks() {
        this.libraryContainer.textContent = "";
    
        for (const book of this.myLibrary) {
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
                this.myLibrary = this.myLibrary.filter((book) => book.title.replaceAll(" ", "_") !== deleteButton.id);
                this.showBooks();
            }); 
            bookContainer.appendChild(deleteButton);
    
            this.libraryContainer.append(bookContainer);
        }
    }

    addBook(book) {
        this.myLibrary.push(book);
        this.showBooks();
    }

    addNewBook() {
        const newTitle = document.querySelector("#title").value;
        const newAuthor = document.querySelector("#author").value;
        const newPages = document.querySelector("#pages").value;
        if (!newTitle || !newAuthor || isNaN(newPages) || newPages < 0) {
            alert("Please fill all fields correctly.");
            return false;
        }
        const newBook = new Book(newTitle, newAuthor, newPages);
        console.log(newBook);
        this.addBook(newBook);
        return true;
    }
}

const myLibrary = new Library();
myLibrary.addBook(new Book("The Exaltation of Inana", "Enheduana", 50));
myLibrary.addBook(new Book("Gilgamesh", "Unknown", 210));
myLibrary.addBook(new Book("Genesis", "Unknown", 150));
myLibrary.addBook(new Book("Iliad", "Homer, tr. Lattimore", 704));
myLibrary.addBook(new Book("If Not, Winter: Fragments of Sappho", "Sappho, tr. Carson", 416));
myLibrary.addBook(new Book("Odyssey", "Homer, tr. Wilson", 560));
myLibrary.addBook(new Book("Oresteia", "Aeschylus, tr. Lattimore", 336));
myLibrary.addBook(new Book("Symposium", "Plato, trs. Nehamas and Woodruff", 128));
myLibrary.addBook(new Book("Aeneid", "Virgil, tr. Mandelbaum", 416));
myLibrary.addBook(new Book("Gospel of Luke", "Unknown", 60));
myLibrary.addBook(new Book("Gospel of John", "Unknown", 40));
myLibrary.showBooks();