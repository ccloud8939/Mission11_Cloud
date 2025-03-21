using System.ComponentModel.DataAnnotations;

namespace Mission11_Cloud.Data;

public class Books
{
    [Key]
    public int BookId { get; set; }
    
    [Required]
    public string? Title { get; set; }
    [Required]
    public string? Author { get; set; }
    [Required]
    public string? Publisher { get; set; }
    [Required]
    public string? ISBN { get; set; }
    [Required]
    public string? Classification { get; set; }
    [Required]
    public string? Category { get; set; }
    [Required]
    public int PageCount { get; set; }
    [Required]
    public string? Price { get; set; }
    
}