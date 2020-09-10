# doc-templates

This repository contains templates used to create refernce documentation for developers.google.com,
cloud.google.com, and other sites.

## Developing

### Testing

You can run the tests with the following command:

```
TRAMPOLINE_BUILD_FILE=./ci/run_tests.sh TRAMPOLINE_IMAGE=gcr.io/cloud-devrel-kokoro-resources/docfx ci/trampoline_v2.sh
```

The Dockerfile for the `docfx` image
[is in googleapis/doc-pipline](https://github.com/googleapis/doc-pipeline/blob/master/docfx/Dockerfile).

## Source Code Headers

Every file containing source code must include copyright and license
information. This includes any JS/CSS files that you might be serving out to
browsers. (This is to help well-intentioned people avoid accidental copying that
doesn't comply with the license.)

Apache header:

    Copyright 2020 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

### docfx
Customize the partials, at least for `<head>`, e.g., `<meta name="project_path" value="/dotnet/_project.yaml" />` as needed. 
