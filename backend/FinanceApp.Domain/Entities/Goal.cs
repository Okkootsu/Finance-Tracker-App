using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Domain.Entities;

public class Goal : BaseEntity
{
    // FK
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public string Name { get; set; } = "New Goal";
    public string Category { get; set; } = null!;
    public int SavedAmount { get; set; } = 0;
    public int TargetAmount { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? DesiredFinish { get; set; }
}