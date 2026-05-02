using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Goal;
using FinanceApp.Application.DTOs.Transaction;
using FinanceApp.Application.Wrappers;

namespace FinanceApp.Application.Services;

public interface IGoalService
{
    public Task<ServiceResponse<GoalDto>> CreateGoalAsync(int userId, CreateGoalDto goalDto);
    public Task<ServiceResponse<GoalsDto>> GetGoalsAsync(int userId);
    public Task<ServiceResponse> DeleteGoalsAsync(DeleteGoalsDto goalsDto);
    public Task<ServiceResponse<TransactionDto>> AddSavingToGoalAsync(UpdateGoalDto request, int userId);
}