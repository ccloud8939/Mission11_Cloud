using Microsoft.AspNetCore.Mvc;
using Mission11_Cloud.Data;

namespace Mission11_Cloud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BooksDbContext _booksContext;

        public BooksController(BooksDbContext temp)
        {
            _booksContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? Category = null)
        {
            var query = _booksContext.Books.AsQueryable();

            // Sorting Logic
            if (sortOrder.ToLower() == "asc")
            {
                query = query.OrderBy(b => b.Title);
            }
            else
            {
                query = query.OrderByDescending(b => b.Title);
            }

            // Filtering by book types
            if (Category != null && Category.Any())
            {
                query = query.Where(b => Category.Contains(b.Category));
            }

            var totalNumBooks = _booksContext.Books.Count();
            
            var paginatedBooks = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            return Ok(new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetBooksTypes")]
        public IActionResult GetBooksTypes()
        {
            var query = _booksContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(query);
        }
    }
}
