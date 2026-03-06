using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Interfaces;

namespace FinanceApp.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public List<Product> GetAll()
        {
            
            return new List<Product>
            {
                new Product { Id = 1, Name = "Laptop", Price = 25000 },
                new Product { Id = 2, Name = "Mouse", Price = 500 }
            };
        }
    }
}