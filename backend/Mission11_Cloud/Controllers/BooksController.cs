using Microsoft.AspNetCore.Mvc;
using Mission11_Cloud.Data;

namespace Mission11_Cloud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
			    
    public class BooksController : ControllerBase
    {
        private BooksDbContext _booksContext;
	    
        public BooksController(BooksDbContext temp)
        {
            _booksContext = temp;
        }
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sortOrder = "asc")
        {
            var booksQuery = _booksContext.Books.AsQueryable();
            // Sorting Logic
            if (sortOrder.ToLower() == "asc")
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);
            }
            else
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);
            }
            
            var something = booksQuery
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany).ToList();
            
            var totalNumBooks = _booksContext.Books.Count();

            var result = new
            {
                Books = something,
                totalNumBooks = totalNumBooks
            };
            return Ok(result);
        }
        }

        //[HttpGet("FunctionalProjects")]
        //public IEnumerable<Project> GetFunctionalProjects()
        //{
            //var something = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            //return something;
        //}
    }
    

