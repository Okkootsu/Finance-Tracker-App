using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Domain.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetAll();
    }
}