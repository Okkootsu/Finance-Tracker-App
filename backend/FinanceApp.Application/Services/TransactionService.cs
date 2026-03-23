using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceApp.Application.DTOs.Transaction;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;

namespace FinanceApp.Application.Services;

public class TransactionService : ITransactionService
{   
    private readonly ITransactionRepository _repository;
    private readonly IMapper _mapper;
    public TransactionService(ITransactionRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ServiceResponse> CreateTransactionAsync(int userId, TransactionDto transactionDto)
    {
        var transaction = _mapper.Map<Transaction>(transactionDto);
        transaction.UserId = userId;

        await _repository.CreateTransactionAsync(transaction);

        var isSuccess = await _repository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse.Fail("A problem occured in the database", ServiceResultType.Failure);

        return ServiceResponse.Success(ServiceResultType.SuccessNoContent);
    }

    public Task<ServiceResponse> DeleteTransactionAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<ServiceResponse<TransactionsDto>> GetAllTransactionsAsync(int userId)
    {
        var transactions = await _repository.GetTransactionsAsync(userId);
        var dtoList = _mapper.Map<List<TransactionDto>>(transactions);

        var transactionsDto = new TransactionsDto
        {
            Transactions = dtoList
        };

        return ServiceResponse<TransactionsDto>.Success(transactionsDto, ServiceResultType.Success);
    }

    public Task<ServiceResponse<TransactionDto>> UpdateTransactionAsync(UpdateTransactionDto transactionDto)
    {
        throw new NotImplementedException();
    }
}