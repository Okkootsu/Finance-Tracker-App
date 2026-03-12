using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Domain.Interfaces;

public interface IAuthRepository
{
    public Task<User?> GetUserByEmailAsync(string email);
    public Task AddUserAsync(User user);
    public Task<bool> SaveChangesAsync();
}