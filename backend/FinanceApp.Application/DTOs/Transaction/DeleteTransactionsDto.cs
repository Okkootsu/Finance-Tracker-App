using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Transaction;

public class DeleteTransactionsDto
{
    public List<int> Transactions { get; set; } = null!;
}