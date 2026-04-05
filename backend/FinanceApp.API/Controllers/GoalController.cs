using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Goal;
using FinanceApp.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinanceApp.API.Controllers;

[Authorize]
public class GoalController : BaseController
{
    private readonly IGoalService _goalService;
    public GoalController(IGoalService goalService)
    {
        _goalService = goalService;
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetGoals()
    {   
        var userId = GetUserId();
        var result = await _goalService.GetGoalsAsync(userId);

        return CreateActionResult(result);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateTransaction(CreateGoalDto goalDto)
    {   
        var userId = GetUserId();
        var result = await _goalService.CreateGoalAsync(userId, goalDto);

        return CreateActionResult(result);
    }

    [HttpPost("delete-range")]
    public async Task<IActionResult> DeleteTransactions(DeleteGoalsDto goalsDto)
    {   
        var result = await _goalService.DeleteGoalsAsync(goalsDto);

        return CreateActionResult(result);
    }
}