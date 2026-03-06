using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Interfaces;
using FinanceApp.Domain.Enums;

namespace FinanceApp.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

    
        public ProductService(IProductRepository repository) 
        {
            _repository = repository;
        }

        public ServiceResponse<List<ProductDto>> GetAllProducts()
        {
            
            var products = _repository.GetAll();

            
            if (products == null || products.Count == 0)
            {
                return ServiceResponse<List<ProductDto>>.Fail("Hiç ürün bulunamadı", ServiceResultType.NotFound);
            }

            
            var dtoList = products.Select(p => new ProductDto 
            { 
                Name = p.Name, 
                Price = p.Price 
            }).ToList();

            
            return ServiceResponse<List<ProductDto>>.Success(dtoList, ServiceResultType.Success);
        }
    }
}