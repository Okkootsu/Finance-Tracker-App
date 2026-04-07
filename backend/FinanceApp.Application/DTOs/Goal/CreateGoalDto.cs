using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Goal;

public class CreateGoalDto
{
    public string? Name { get; set; }
    public string Category { get; set; } = null!;
    public int TargetAmount { get; set; }
    public DateTime? DesiredFinish { get; set; }
}