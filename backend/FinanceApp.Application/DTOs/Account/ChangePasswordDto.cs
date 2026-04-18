using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Account;

public class ChangePasswordDto
{
    public string OldPassword { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
}