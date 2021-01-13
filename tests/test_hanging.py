# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from pathlib import Path

from docuploader import shell

import pytest


def test_generate():
    build_dir = Path("testdata/nodejs-hang")
    out_dir = build_dir / "site/api"
    # Generate!
    try:
        shell.run(
            [
                "docfx",
                "build",
                "-t",
                "../../third_party/docfx/templates/devsite",
            ],
            # If it takes more than 30 minutes to build, likely it has gone into
            # infinite loop
            timeout=1800,
            cwd=build_dir,
            hide_output=False,
        )
    except Exception as e:
        pytest.fail(f"hanging build raised an exception: {e}")

    # Note: rename of toc.html to _toc.yaml happens in doc-pipeline.
    toc_file_path = out_dir / "toc.html"
    assert toc_file_path.is_file()
    got_text = toc_file_path.read_text("utf-8")
    assert "/nodejs/docs/reference/dialogflow/latest" in got_text
