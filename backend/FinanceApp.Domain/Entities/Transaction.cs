using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Domain.Entities;

public class Transaction : BaseEntity
{
    // FK
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public string Name { get; set; } = "New Transaction";
    public string Category { get; set; } = null!;
    public string? Description { get; set; }
    public int Amount { get; set; }
    public DateTime Time { get; set; }
}