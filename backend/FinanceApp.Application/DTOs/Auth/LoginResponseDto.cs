using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs;

public class LoginResponseDto
{
    public string Token { get; set; } = null!;
}