using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Domain.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Icon { get; set; } = "💵"; // default

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}