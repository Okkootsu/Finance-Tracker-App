using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Account;
using FinanceApp.Application.Wrappers;

namespace FinanceApp.Application.Services.Account;

public interface IAccountService
{
    public Task<ServiceResponse<UpdateAccountInfoResponseDto>> UpdateAccountInfoAsync(int userId, UpdateAccountInfoRequestDto requestDto);
    public Task<ServiceResponse> ChangePasswordAsync(int userId, ChangePasswordDto passwordDto);
    public Task<ServiceResponse> DeleteAccountAsync(int userId);
}