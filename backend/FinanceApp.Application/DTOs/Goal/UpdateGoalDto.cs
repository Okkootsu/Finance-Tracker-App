using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Goal;

public class UpdateGoalDto
{
    public int Id { get; set; }
    public int AmountToAdd { get; set; }
}