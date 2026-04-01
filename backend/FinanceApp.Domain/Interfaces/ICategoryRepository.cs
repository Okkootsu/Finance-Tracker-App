using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Domain.Interfaces;

public interface ICategoryRepository
{
    public Task<List<Category>> GetCategoriesAsync(int userId);
    public Task<Category?> GetCategoryAsync(int id);

    public void DeleteCategory(Category category);
    public Task CreateCategoryAsync(Category category);
    public Task<bool> SaveChangesAsync();
}