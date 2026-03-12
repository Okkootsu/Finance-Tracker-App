using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceApp.Application.DTOs;
using FinanceApp.Application.DTOs.Auth;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Entities;
using FinanceApp.Domain.Enums;
using FinanceApp.Domain.Interfaces;

namespace FinanceApp.Application.Services;

public class AuthService : IAuthService
{
    private readonly IJwtService _jwtService;
    private readonly IAuthRepository _authRepo;
    private readonly IMapper _mapper;

    public AuthService(IJwtService jwtService, IAuthRepository authRepo, IMapper mapper)
    {
        _jwtService = jwtService;
        _authRepo = authRepo;
        _mapper = mapper;
    }

    public async Task<ServiceResponse<LoginResponseDto>> LoginAsync(LoginRequestDto requestDto)
    {
        var user = await _authRepo.GetUserByEmailAsync(requestDto.Email);

        if (user == null)
            return ServiceResponse<LoginResponseDto>.Fail("E-mail or password is invalid", ServiceResultType.Unauthorized);

        var isValidPassword = PasswordService.VerifyPassword(requestDto.Password, user.PasswordHash);

        if (!isValidPassword)
            return ServiceResponse<LoginResponseDto>.Fail("E-mail or password is invalid", ServiceResultType.Unauthorized);


        var token = await _jwtService.Authenticate(user);

        if (token is null) 
            return ServiceResponse<LoginResponseDto>.Fail("A problem occured in the system", ServiceResultType.Failure);

        return ServiceResponse<LoginResponseDto>.Success(token, ServiceResultType.Success);
    }

    public async Task<ServiceResponse> RegisterAsync(RegisterRequestDto requestDto)
    {
        if (requestDto.Password != requestDto.ConfirmPassword)
            return ServiceResponse.Fail("Passwords do not match", ServiceResultType.InvalidInput);

        var user = await _authRepo.GetUserByEmailAsync(requestDto.Email);

        if (user != null)
            return ServiceResponse.Fail("This e-mail already in use", ServiceResultType.Conflict);
        
        var newUser = _mapper.Map<User>(requestDto);
        newUser.PasswordHash = PasswordService.HashPassword(requestDto.Password);

        await _authRepo.AddUserAsync(newUser);
        await _authRepo.SaveChangesAsync();

        return ServiceResponse.Success(ServiceResultType.SuccessNoContent);
    }
}