using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Transaction;
using FinanceApp.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinanceApp.API.Controllers;

[Authorize]
public class TransactionController : BaseController
{   
    private readonly ITransactionService _transactionService;
    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetAllTransactions()
    {   
        var userId = GetUserId();
        var result = await _transactionService.GetAllTransactionsAsync(userId);

        return CreateActionResult(result);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateTransaction(CreateTransactionDto transactionDto)
    {   
        var userId = GetUserId();
        var result = await _transactionService.CreateTransactionAsync(userId, transactionDto);

        return CreateActionResult(result);
    }

    [HttpPost("delete-range")]
    public async Task<IActionResult> DeleteTransactions(DeleteTransactionsDto transactionsDto)
    {   
        var result = await _transactionService.DeleteTransactionsAsync(transactionsDto);

        return CreateActionResult(result);
    }
}