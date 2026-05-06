using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Transaction;

namespace FinanceApp.Application.DTOs.Goal;

public class AddSavingResponseDto
{
    public TransactionDto Transaction { get; set; } = null!;
    public decimal SavedAmount { get; set; }
}