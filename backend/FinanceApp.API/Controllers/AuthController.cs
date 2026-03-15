using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Auth;
using FinanceApp.Application.Services;
using FinanceApp.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinanceApp.API.Controllers;

public class AuthController : BaseController
{   
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDto requestDto)
    {
        var result = await _authService.RegisterAsync(requestDto);

        return CreateActionResult(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto requestDto)
    {
        var result = await _authService.LoginAsync(requestDto);

        if (result.ResultType == ServiceResultType.Success && result.Data != null)
        {
            SetRefreshTokenCookie(result.Data.RefreshToken);
            
            return Ok(new { AccessToken = result.Data.AccessToken });
        }

        return CreateActionResult(result);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var currentRefreshToken = Request.Cookies["refreshToken"];

        if (string.IsNullOrEmpty(currentRefreshToken))
        {
             return Unauthorized(new { IsSuccess = false, ErrorMessage = "Refresh token is missing." });
        }


        var result = await _authService.RefreshTokenAsync(currentRefreshToken);

        if (result.ResultType == ServiceResultType.Success && result.Data != null)
        {
            SetRefreshTokenCookie(result.Data.RefreshToken);
            
            return Ok(new { AccessToken = result.Data.AccessToken });
        }

        return CreateActionResult(result); 
    }

    private void SetRefreshTokenCookie(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,   
            Secure = true,     
            SameSite = SameSiteMode.Strict, 
            Expires = DateTime.UtcNow.AddDays(7) 
        };
        
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }
}