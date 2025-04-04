import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function BookstList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Get addToCart function from context
    
    // useEffect only grabs the data when it is needed instead of constantly going back and grabbing it 
    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories
                .map((cat: string | number | boolean) => `projectTypes=${encodeURIComponent(cat)}`)
                .join('&');
            // this is where it is getting the data from
            const response = await fetch(`http://localhost:4000/api/Books/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            //this variable holds the data
            const data = await response.json();
            //sets the project with the updated data
            setBooks(data.books);
            setTotalItems(data.totalNumBooks)
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum, totalItems, sortOrder, selectedCategories]);
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
                            <li><strong>Book Number of Page:</strong> {b.pageCount}</li>
                            <li><strong>Book Price:</strong> {b.price}</li>
                        </ul>
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                addToCart({
                                    bookID: b.bookId, // Map bookId to bookID
                                    title: b.title, 
                                    author: b.author,
                                    price: Number(b.price),
                                    quantity: 1 // Default quantity
                                }); // Add book to cart
                                navigate("/CartPage"); // Navigate after adding
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}

            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === i + 1}>
                    {i + 1}
                </button>
            ))}
            <button disabled={pageNum === totalPages} onClick={() =>
                setPageNum(pageNum + 1)} >Next</button>

            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <br />

            <label>
                Results per page:
                <select
                    value={pageSize}
                    onChange={(p) => {
                        setPageSize(Number(p.target.value))
                        setPageNum(1);
                    }}
                >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                </select>
            </label>
        </>
    );
}

export default BookstList;