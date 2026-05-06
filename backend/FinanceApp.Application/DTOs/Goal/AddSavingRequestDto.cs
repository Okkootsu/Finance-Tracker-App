using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Goal;

public class AddSavingRequestDto
{
    public int Id { get; set; }
    public decimal AmountToAdd { get; set; }
}