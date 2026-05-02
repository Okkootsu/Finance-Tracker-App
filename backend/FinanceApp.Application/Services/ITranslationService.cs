using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceApp.Application.Services;

public interface ITranslationService
{
    string Translate(string key, params object[] args);
}