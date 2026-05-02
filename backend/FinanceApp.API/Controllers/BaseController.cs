using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FinanceApp.Application.Services;
using FinanceApp.Application.Wrappers;
using FinanceApp.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace FinanceApp.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseController : ControllerBase
{   
    private readonly ITranslationService _translationService;
    public BaseController(ITranslationService translationService)
    {
        _translationService = translationService;
    }

    [NonAction]
    public IActionResult CreateActionResult<T>(ServiceResponse<T> response)
    {
        if (response.ResultType == ServiceResultType.Success)
        {
            return Ok(response);
        }

        return CreateErrorResult(response.ResultType, response.MessageKey);
    }

    [NonAction]
    public IActionResult CreateActionResult(ServiceResponse response)
    {
        if (response.ResultType == ServiceResultType.Success)
        {
            return Ok(response); 
        }
        else if (response.ResultType == ServiceResultType.SuccessNoContent)
        {
            return NoContent();
        }

        return CreateErrorResult(response.ResultType, response.MessageKey);
    }

    private IActionResult CreateErrorResult(ServiceResultType resultType, string? messageKey)
    {   
        var message = messageKey != null ? _translationService.Translate(messageKey) :
         _translationService.Translate("Common.UnknownProblem");

        var errorResponse = new { IsSuccess = false, ErrorMessage = message };

        return resultType switch
        {
            ServiceResultType.NotFound => NotFound(errorResponse), // 404
            ServiceResultType.InvalidInput => BadRequest(errorResponse), // 400
            ServiceResultType.Conflict => Conflict(errorResponse), // 409
            ServiceResultType.Unauthorized => Unauthorized(errorResponse), // 401
            _ => StatusCode(500, errorResponse) // Genel Hata  
        };
    }

    protected int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst(JwtRegisteredClaimNames.Sub);

        if (userIdClaim == null)
            throw new UnauthorizedAccessException("User id could not verified");
        
        return int.Parse(userIdClaim.Value);
    }
}