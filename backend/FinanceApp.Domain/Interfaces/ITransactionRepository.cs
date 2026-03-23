using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Domain.Interfaces;

public interface ITransactionRepository
{
    public Task CreateTransactionAsync(Transaction transaction);
    public Task<bool> SaveChangesAsync();
    public Task<List<Transaction>> GetTransactionsAsync(int userId);
}