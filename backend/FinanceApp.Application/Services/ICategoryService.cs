using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Category;
using FinanceApp.Application.Wrappers;

namespace FinanceApp.Application.Services;

public interface ICategoryService
{
    public Task<ServiceResponse<CategoriesDto>> GetCategoriesAsync(int userId);
    public Task<ServiceResponse> DeleteCategory(int id);
    public Task<ServiceResponse<CategoryDto>> CreateCategoryAsync(CreateCategoryDto categoryDto, int userId);
}