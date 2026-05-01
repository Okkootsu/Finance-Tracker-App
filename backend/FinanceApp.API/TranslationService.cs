using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceApp.Application.Services;
using Microsoft.Extensions.Localization;

namespace FinanceApp.API;

public class TranslationService : ITranslationService
{
    private readonly IStringLocalizer<SharedResource> _localizer;

    public TranslationService(IStringLocalizer<SharedResource> localizer)
    {
        _localizer = localizer;
    }

    public string Translate(string key, params object[] args)
    {
        return _localizer[key, args];
    }
}