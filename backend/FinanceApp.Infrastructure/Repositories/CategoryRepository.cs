using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FinanceApp.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{   
    private readonly AppDbContext _context;
    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateCategoryAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
    }

    public void DeleteCategory(Category category)
    {
        _context.Categories.Remove(category);
    }

    public async Task<List<Category>> GetCategoriesAsync(int userId)
    {
        return await _context.Categories.Where(c => c.UserId == userId).ToListAsync();
    }

    public async Task<Category?> GetCategoryAsync(int id)
    {
        return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}