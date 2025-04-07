import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Pagination from "./Pagination";

function BooksList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Get addToCart function from context

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories
                .map((cat) => `Category=${encodeURIComponent(cat)}`)
                .join('&');
            
            const response = await fetch(
                `http://localhost:4000/api/Books/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
            );
            const data = await response.json();
            
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum, selectedCategories]);

    return (
        <>
            <h1>Books List</h1>
            <br />
            {books.map((b) => (
                <div id="booksCard" className="card" key={b.bookId}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Book Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification/Category:</strong> {b.classification} / {b.category}</li>
                            <li><strong>Book Number of Pages:</strong> {b.pageCount}</li>
                            <li><strong>Book Price:</strong> {b.price}</li>
                        </ul>
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                addToCart({
                                    bookID: b.bookId, 
                                    title: b.title,
                                    author: b.author,
                                    price: Number(b.price),
                                    quantity: 1
                                });
                                navigate("/CartPage");
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
            
            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </>
    );
}

export default BooksList;
