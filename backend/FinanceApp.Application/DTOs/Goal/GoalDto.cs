using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.DTOs.Goal;

public class GoalDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string Category { get; set; } = null!;
    public decimal SavedAmount { get; set; }
    public decimal TargetAmount { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? DesiredFinish { get; set; }
}