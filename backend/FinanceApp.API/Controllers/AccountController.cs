using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.DTOs.Account;
using FinanceApp.Application.Services.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace FinanceApp.API.Controllers;

[Authorize]
public class AccountController : BaseController
{
    private readonly IAccountService _accountService;
    public AccountController(IAccountService accountService, IStringLocalizer<SharedResource> localizer) : base(localizer)
    {
        _accountService = accountService;
    }

    [HttpPost("update-info")]
    public async Task<IActionResult> UpdateAccountInfo(UpdateAccountInfoRequestDto requestDto)
    {
        var userId = GetUserId();
        var result = await _accountService.UpdateAccountInfoAsync(userId, requestDto);

        return CreateActionResult(result);
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordDto passwordDto)
    {
        var userId = GetUserId();
        var result = await _accountService.ChangePasswordAsync(userId, passwordDto);

        return CreateActionResult(result);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAccount()
    {
        var userId = GetUserId();
        var result = await _accountService.DeleteAccountAsync(userId);

        return CreateActionResult(result);
    }
}