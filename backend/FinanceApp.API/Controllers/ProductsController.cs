using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceApp.API.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            
            var result = _productService.GetAllProducts();

            
            return CreateActionResult(result);
        }
    }
}