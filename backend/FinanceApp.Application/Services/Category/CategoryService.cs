using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceApp.Application.DTOs.Category;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;

namespace FinanceApp.Application.Services;

public class CategoryService : ICategoryService
{   
    private readonly ICategoryRepository _repository;
    private readonly IMapper _mapper;
    public CategoryService(ICategoryRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ServiceResponse<CategoryDto>> CreateCategoryAsync(CreateCategoryDto categoryDto, int userId)
    {
        var category = _mapper.Map<Category>(categoryDto);

        category.UserId = userId;

        await _repository.CreateCategoryAsync(category);
        var isSuccess = await _repository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse<CategoryDto>.Fail("Common.DbError", ServiceResultType.Failure);

        var dto = _mapper.Map<CategoryDto>(category);
        
        return ServiceResponse<CategoryDto>.Success(dto, ServiceResultType.Success);
    }

    public async Task<ServiceResponse> DeleteCategory(int id)
    {
        var category = await _repository.GetCategoryAsync(id);

        if (category == null)
            return ServiceResponse.Fail("Category.NotFound", ServiceResultType.NotFound);

        _repository.DeleteCategory(category);
        var isSuccess = await _repository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse.Fail("Common.DbError", ServiceResultType.Failure);
        
        return ServiceResponse.Success(ServiceResultType.SuccessNoContent);
    }

    public async Task<ServiceResponse<CategoriesDto>> GetCategoriesAsync(int userId)
    {
        var categories = await _repository.GetCategoriesAsync(userId);
        var dtoList = _mapper.Map<List<CategoryDto>>(categories);

        var categoriesDto = new CategoriesDto
        {
            Categories = dtoList
        };

        return ServiceResponse<CategoriesDto>.Success(categoriesDto, ServiceResultType.Success);
    }
    
}