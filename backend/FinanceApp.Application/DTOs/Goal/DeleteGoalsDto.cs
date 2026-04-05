using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Goal;

public class DeleteGoalsDto
{
    public List<int> Goals { get; set; } = null!;
}