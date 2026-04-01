using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Category;

public class CreateCategoryDto
{
    public string Name { get; set; } = null!;
    public string Icon { get; set; } = null!;
}