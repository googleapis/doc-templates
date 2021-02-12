// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

using Microsoft.DocAsCode.Dfm;
using System.Collections.Generic;
using System.Composition;

namespace PrettyPrintPlugin
{
    /// <summary>
    /// Plugin to change the DocfxFlavoredMarkdown Engine options to
    /// include "prettyprint" as a language prefix in code snippets.
    /// While it would be nice to set this in docfx.json instead,
    /// it doesn't look like that's feasible.
    /// </summary>
    [Export(typeof(IDfmEngineCustomizer))]
    public class PrettyPrintEngineCustomizer : IDfmEngineCustomizer
    {
        public void Customize(DfmEngineBuilder builder, IReadOnlyDictionary<string, object> parameters)
        {
            var options = builder.Options;
            string prefix = options.LangPrefix;
            // Guard against multiple calls.
            if (!prefix.StartsWith("prettyprint"))
            {
                options.LangPrefix = "prettyprint " + prefix;
            }
        }
    }
}