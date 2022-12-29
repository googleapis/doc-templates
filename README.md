# doc-templates

**This repo is unmaintained.** All of the templates were moved to
https://github.com/googleapis/doc-pipeline.

--------------

This repository contains templates used to generate API reference documentation
for developers.google.com, cloud.google.com, and other sites.

## Contributing

Contributions are welcome. Please, see the
[CONTRIBUTING](https://github.com/googleapis/doc-templates/blob/master/docs/CONTRIBUTING.md)
document for details.

Please note that this project is released with a Contributor Code of Conduct.
By participating in this project you agree to abide by its terms.
See [Contributor Code of Conduct](https://github.com/googleapis/doc-templates/blob/master/CODE_OF_CONDUCT.md)
for more information.

### Docs

See the [`docs`](/docs) directory for additional documentation.

### Testing

When you run the tests, the HTML generated for the test will be stored at
`testdata/python-small/site/api`. You can inspect the output manually to verify
changes and add additional tests to prevent regressions.

#### In a Docker container (recommended)

You can run the tests in a Docker container using Trampoline V2 with the
following command:

```
TRAMPOLINE_BUILD_FILE=./ci/run_tests.sh TRAMPOLINE_IMAGE=gcr.io/cloud-devrel-kokoro-resources/docfx ci/trampoline_v2.sh
```

If you need to update the golden test files, add the `UPDATE_GOLDENS` env var:

```
UPDATE_GOLDENS=1 TRAMPOLINE_BUILD_FILE=./ci/run_tests.sh TRAMPOLINE_IMAGE=gcr.io/cloud-devrel-kokoro-resources/docfx ci/trampoline_v2.sh
```

The Dockerfile for the `docfx` image
[is in googleapis/doc-pipline](https://github.com/googleapis/doc-pipeline/blob/master/docfx/Dockerfile).
Any updates to the Dockerfile should be made there.

#### Without using Docker

If you want to run the tests in your normal environment, not in a container:

1. Install DocFX and put a `docfx` executable (possibly a script that calls
   `mono /path/to/docfx.exe`) on your path.
1. Create and activate a virtual environment:
   ```
   python3 -m venv venv
   . ./venv/bin/activate
   ```
1. Install dependencies:
   ```
   python3 -m pip install -r requirements.txt
   ```
1. Run linters and tests:
   ```
   black --check tests
   flake8 tests

   pytest tests
   ```
   It is also recommended to run all optional tests with `--long` flag:
   ```
   pytest --long tests
   ```
   It may take some time to run all the optional tests.

   To update goldens add the `--update-goldens` flag:
   ```
   pytest --update-goldens tests
   ```

   **Warning**: your local `docfx` version and the container image version may
   differ, which may cause differences in golden files. **The container version
   is canonical.**

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
