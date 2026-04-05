using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime RefreshTokenExpiryTime { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    public ICollection<Goal> Goals { get; set; } = new List<Goal>();
    public ICollection<Category> Categories { get; private set; } = new List<Category>();

    public void InitializeDefaultCategories()
    {
        var defaultCategories = new List<Category>
        {
            new Category { Name = "Food & Dining", Icon = "🍔" },
            new Category { Name = "Transport", Icon = "🚕" },
            new Category { Name = "Subscriptions", Icon = "🎬" },
            new Category { Name = "Technology", Icon = "💻" },
            new Category { Name = "Health", Icon = "💊" },
            new Category { Name = "Salary", Icon = "💰" }
        };

        foreach (var category in defaultCategories)
        {
            Categories.Add(category);
        }
    }
}