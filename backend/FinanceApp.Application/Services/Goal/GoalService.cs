using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceApp.Application.DTOs.Goal;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;

namespace FinanceApp.Application.Services;

public class GoalService : IGoalService
{   
    private readonly IGoalRepository _repository;
    private readonly IMapper _mapper;
    public GoalService(IGoalRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ServiceResponse<GoalDto>> CreateGoalAsync(int userId, CreateGoalDto goalDto)
    {
        var goal = _mapper.Map<Goal>(goalDto);
        goal.UserId = userId;
        goal.StartTime = goal.StartTime.ToUniversalTime();
        goal.DesiredFinish = goal.DesiredFinish?.ToUniversalTime();

        await _repository.CreateGoalAsync(goal);

        var isSuccess = await _repository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse<GoalDto>.Fail("A problem occured in the database", ServiceResultType.Failure);

        var dto = _mapper.Map<GoalDto>(goal);

        return ServiceResponse<GoalDto>.Success(dto, ServiceResultType.Success);
    }

    public async Task<ServiceResponse> DeleteGoalsAsync(DeleteGoalsDto goalsDto)
    {
        await _repository.DeleteGoalsAsync(goalsDto.Goals);

        return ServiceResponse.Success(ServiceResultType.SuccessNoContent);
    }

    public async Task<ServiceResponse<GoalsDto>> GetGoalsAsync(int userId)
    {
        var goals = await _repository.GetGoalsAsync(userId);
        var dtoList = _mapper.Map<List<GoalDto>>(goals);

        var goalsDto = new GoalsDto
        {
            Goals = dtoList
        };

        return ServiceResponse<GoalsDto>.Success(goalsDto, ServiceResultType.Success);
    }
}