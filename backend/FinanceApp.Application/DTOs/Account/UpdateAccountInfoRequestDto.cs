using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Account;

public class UpdateAccountInfoRequestDto
{
    public string Email { get; set; } = null!;
}