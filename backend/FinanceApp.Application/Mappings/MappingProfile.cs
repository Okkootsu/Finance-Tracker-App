using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceApp.Application.DTOs.Auth;
using FinanceApp.Application.DTOs.Category;
using FinanceApp.Application.DTOs.Transaction;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, RegisterRequestDto>().ReverseMap();
        CreateMap<Transaction, TransactionDto>().ReverseMap();
        CreateMap<Category, CategoryDto>().ReverseMap();
        CreateMap<CreateCategoryDto, Category>();
    }
}