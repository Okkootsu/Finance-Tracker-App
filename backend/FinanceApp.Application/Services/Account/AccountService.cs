using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceApp.Application.DTOs.Account;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;

namespace FinanceApp.Application.Services.Account;

public class AccountService : IAccountService
{
    private readonly IAccountRepository _accountRepository;
    private readonly IMapper _mapper;
    private readonly IJwtService _jwtService;
    public AccountService(IAccountRepository accountRepository, IMapper mapper, IJwtService jwtService)
    {
        _accountRepository = accountRepository;
        _mapper = mapper;
        _jwtService = jwtService;
    }

    public async Task<ServiceResponse<UpdateAccountInfoResponseDto>> UpdateAccountInfoAsync(int userId, UpdateAccountInfoRequestDto requestDto)
    {
        var user = await _accountRepository.GetByIdAsync(userId);

        if (user == null)
            return ServiceResponse<UpdateAccountInfoResponseDto>.Fail("User not found!", ServiceResultType.NotFound);

        var isUserExist = await _accountRepository.GetByEmailAsync(requestDto.Email);

        if (isUserExist != null)
            return ServiceResponse<UpdateAccountInfoResponseDto>.Fail("This e-mail already in use! Please try another e-mail.", ServiceResultType.Conflict);
        
        user.Email = requestDto.Email;

        var isSuccess = await _accountRepository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse<UpdateAccountInfoResponseDto>.Fail("A problem occured while updating the database", ServiceResultType.Failure);

        var tokensDto = _jwtService.Authenticate(user);
        
        var dto = _mapper.Map<UpdateAccountInfoResponseDto>(tokensDto);
        
        return ServiceResponse<UpdateAccountInfoResponseDto>.Success(dto, ServiceResultType.Success);
    }

    public async Task<ServiceResponse> ChangePasswordAsync(int userId, ChangePasswordDto passwordDto)
    {
        var user = await _accountRepository.GetByIdAsync(userId);

        if (user == null)
            return ServiceResponse.Fail("User not found!", ServiceResultType.NotFound);
        
        var isPasswordsMatch = PasswordService.VerifyPassword(passwordDto.OldPassword, user.PasswordHash);

        if (!isPasswordsMatch)
            return ServiceResponse.Fail("Invalid current password!", ServiceResultType.InvalidInput);
        
        user.PasswordHash = PasswordService.HashPassword(passwordDto.NewPassword);

        var isSuccess = await _accountRepository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse.Fail("A problem occured while updating the database", ServiceResultType.Failure);

        return ServiceResponse.Success(ServiceResultType.SuccessNoContent);
    }

    public async Task<ServiceResponse> DeleteAccountAsync(int userId)
    {
        var user = await _accountRepository.GetByIdAsync(userId);

        if (user == null)
            return ServiceResponse.Fail("User not found!", ServiceResultType.NotFound);

        _accountRepository.DeleteAccount(user);

        var isSuccess = await _accountRepository.SaveChangesAsync();

        if (!isSuccess)
            return ServiceResponse.Fail("A problem occured while updating the database", ServiceResultType.Failure);
        
        return ServiceResponse.Success(ServiceResultType.SuccessNoContent);
    }
}