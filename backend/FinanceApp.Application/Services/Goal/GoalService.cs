using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceApp.Application.DTOs.Goal;
using FinanceApp.Application.DTOs.Transaction;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;

namespace FinanceApp.Application.Services;

public class GoalService : IGoalService
{   
    private readonly IGoalRepository _goalRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IMapper _mapper;
    private readonly ITranslationService _translationService;

    public GoalService(IGoalRepository goalRepository, IMapper mapper, ITransactionRepository transactionRepository, ITranslationService translationService)
    {
        _goalRepository = goalRepository;
        _mapper = mapper;
        _transactionRepository = transactionRepository;
        _translationService = translationService;
    }

    public async Task<ServiceResponse<AddSavingResponseDto>> AddSavingToGoalAsync(AddSavingRequestDto request, int userId)
    {
        var goal = await _goalRepository.GetByIdAsync(request.Id);

        if (goal == null)
            return ServiceResponse<AddSavingResponseDto>.Fail("Goal.NotFound", ServiceResultType.NotFound);

        if (goal.UserId != userId)
            return ServiceResponse<AddSavingResponseDto>.Fail("Common.Unauthorized", ServiceResultType.Conflict);

        decimal realAmount = request.AmountToAdd;
        decimal previousSavedAmount = goal.SavedAmount;
        goal.SavedAmount += request.AmountToAdd;

        if (goal.SavedAmount > goal.TargetAmount)
        {
            realAmount = goal.TargetAmount - previousSavedAmount;
            goal.SavedAmount = goal.TargetAmount;
        }

        var transactionName = _translationService.Translate("Transaction.TransferTo", goal.Name);

        var transferTransaction = new Transaction
        {
            UserId = userId,
            Name = transactionName,
            Category = "Goal Transfer",
            Amount = -Math.Abs(realAmount),
            Time = DateTime.UtcNow
        };

        await _transactionRepository.CreateTransactionAsync(transferTransaction);

        var isSuccess = await _goalRepository.SaveChangesAsync(); 

        if (!isSuccess)
            return ServiceResponse<AddSavingResponseDto>.Fail("Common.DbError", ServiceResultType.Failure);

        var transactionDto = _mapper.Map<TransactionDto>(transferTransaction);

        var addSavingResponse = new AddSavingResponseDto
        {
            Transaction = transactionDto,
            SavedAmount = goal.SavedAmount
        };
        
        return ServiceResponse<AddSavingResponseDto>.Success(addSavingResponse, ServiceResultType.Success);
    }

    public async Task<ServiceResponse<GoalDto>> CreateGoalAsync(int userId, CreateGoalDto goalDto)
    {
        var goal = _mapper.Map<Goal>(goalDto);
        goal.UserId = userId;
        goal.DesiredFinish = goal.DesiredFinish?.ToUniversalTime();

        await _goalRepository.CreateGoalAsync(goal);

        var isSuccess = await _goalRepository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse<GoalDto>.Fail("Common.DbError", ServiceResultType.Failure);

        var dto = _mapper.Map<GoalDto>(goal);

        return ServiceResponse<GoalDto>.Success(dto, ServiceResultType.Success);
    }

    public async Task<ServiceResponse> DeleteGoalsAsync(DeleteGoalsDto goalsDto)
    {
        await _goalRepository.DeleteGoalsAsync(goalsDto.Goals);

        return ServiceResponse.Success(ServiceResultType.SuccessNoContent);
    }

    public async Task<ServiceResponse<GoalsDto>> GetGoalsAsync(int userId)
    {
        var goals = await _goalRepository.GetGoalsAsync(userId);
        var dtoList = _mapper.Map<List<GoalDto>>(goals);

        var goalsDto = new GoalsDto
        {
            Goals = dtoList
        };

        return ServiceResponse<GoalsDto>.Success(goalsDto, ServiceResultType.Success);
    }
}