using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs;
using FinanceApp.Application.Wrappers;

namespace FinanceApp.Application.Services
{
    public interface IProductService
    {
        ServiceResponse<List<ProductDto>> GetAllProducts();
    }
}