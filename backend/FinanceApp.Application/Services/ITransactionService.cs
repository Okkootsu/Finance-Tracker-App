using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Transaction;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Application.Services;

public interface ITransactionService
{
    public Task<ServiceResponse> CreateTransactionAsync(int userId, TransactionDto transactionDto);
    public Task<ServiceResponse<TransactionsDto>> GetAllTransactionsAsync(int userId);
    public Task<ServiceResponse<TransactionDto>> UpdateTransactionAsync(UpdateTransactionDto transactionDto);
    public Task<ServiceResponse> DeleteTransactionAsync(int id);
}