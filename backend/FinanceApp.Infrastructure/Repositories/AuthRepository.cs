using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.Infrastructure.Repositories;

public class AuthRepository : IAuthRepository
{   
    private readonly AppDbContext _context;
    public AuthRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetUserByRefreshTokenAsync(string currentRefreshToken)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == currentRefreshToken);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}