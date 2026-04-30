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

    public async Task<ServiceResponse<TransactionDto>> CreateTransactionAsync(int userId, CreateTransactionDto transactionDto)
    {
        var transaction = _mapper.Map<Transaction>(transactionDto);
        transaction.UserId = userId;
        transaction.Time = transaction.Time.ToUniversalTime();

        await _repository.CreateTransactionAsync(transaction);

        var isSuccess = await _repository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse<TransactionDto>.Fail("Common.DbError", ServiceResultType.Failure);

        var dto = _mapper.Map<TransactionDto>(transaction);

        return ServiceResponse<TransactionDto>.Success(dto, ServiceResultType.Success);
    }

    public async Task<ServiceResponse> DeleteTransactionsAsync(DeleteTransactionsDto transactionsDto)
    {
        await _repository.DeleteTransactionsAsync(transactionsDto.Transactions);

        return ServiceResponse.Success(ServiceResultType.SuccessNoContent);
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

}