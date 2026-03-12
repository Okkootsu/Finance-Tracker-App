using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs;
using FinanceApp.Domain.Entities;

namespace FinanceApp.Application.Services;

public interface IJwtService
{
    public Task<LoginResponseDto?> Authenticate(User user);
}