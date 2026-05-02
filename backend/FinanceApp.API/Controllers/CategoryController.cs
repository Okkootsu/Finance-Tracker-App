using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Category;
using FinanceApp.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace FinanceApp.API.Controllers;

[Authorize]
public class CategoryController : BaseController
{   
    private readonly ICategoryService _service;
    public CategoryController(ICategoryService service, ITranslationService translationService) : base(translationService)
    {
        _service = service;
    }

    [HttpGet("get-all")]
    public async Task<IActionResult> GetCategories()
    {
        var userId = GetUserId();
        var result = await _service.GetCategoriesAsync(userId);

        return CreateActionResult(result);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateCategory(CreateCategoryDto categoryDto)
    {
        var userId = GetUserId();
        var result = await _service.CreateCategoryAsync(categoryDto, userId);

        return CreateActionResult(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var result = await _service.DeleteCategory(id);

        return CreateActionResult(result);
    }
}