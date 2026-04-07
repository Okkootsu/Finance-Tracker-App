using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Domain.Interfaces;

public interface IGoalRepository
{
    public Task CreateGoalAsync(Goal goal);
    public Task<bool> SaveChangesAsync();
    public Task<List<Goal>> GetGoalsAsync(int userId);
    public Task DeleteGoalsAsync(List<int> goals);
    public Task<Goal?> GetByIdAsync(int id);
}