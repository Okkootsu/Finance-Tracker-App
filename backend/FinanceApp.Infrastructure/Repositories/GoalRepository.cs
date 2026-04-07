using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.Infrastructure.Repositories;

public class GoalRepository : IGoalRepository
{
    private readonly AppDbContext _context;
    public GoalRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateGoalAsync(Goal goal)
    {
        await _context.Goals.AddAsync(goal);
    }

    public async Task DeleteGoalsAsync(List<int> goals)
    {
        await _context.Goals.Where(g => goals.Contains(g.Id)).ExecuteDeleteAsync();
    }

    public async Task<Goal?> GetByIdAsync(int id)
    {
        return await _context.Goals.FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<List<Goal>> GetGoalsAsync(int userId)
    {
        return await _context.Goals.Where(g => g.UserId == userId)
        .ToListAsync();
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}