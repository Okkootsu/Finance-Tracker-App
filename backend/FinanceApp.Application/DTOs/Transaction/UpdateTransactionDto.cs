using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Transaction;

public class UpdateTransactionDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string Category { get; set; } = null!;
    public string? Description { get; set; }
    public int Amount { get; set; }
    public DateTime Time { get; set; }
}