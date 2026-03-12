using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs;
using FinanceApp.Application.DTOs.Auth;
using FinanceApp.Application.Wrappers;

namespace FinanceApp.Application.Services;

public interface IAuthService
{
    public Task<ServiceResponse<LoginResponseDto>> LoginAsync(LoginRequestDto requestDto);
    public Task<ServiceResponse> RegisterAsync(RegisterRequestDto requestDto);
}