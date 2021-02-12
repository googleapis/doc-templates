#!/bin/bash

# Builds the plugins and copies them into the expected
# output directory. Currently this is expected to
# be run on a machine that has the .NET Core SDK installed;
# it only needs to be run when the plugin code changes.

set -e

dotnet build -c Release Plugins.sln

# TODO: If we end up with more plugins, do this on a less
# ad-hoc basis.
cp PrettyPrintPlugin/bin/Release/net472/PrettyPrintPlugin.dll \
  ../third_party/docfx/templates/devsite/plugins
