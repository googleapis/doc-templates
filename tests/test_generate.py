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

import shutil

from docuploader import shell

import pytest


@pytest.fixture
def test_dir(tmpdir):
    """Copy the test data and template into the temporary directory."""
    shutil.copytree("testdata", tmpdir, dirs_exist_ok=True)
    shutil.copytree("third_party/docfx/templates", tmpdir, dirs_exist_ok=True)
    return tmpdir


def test_generate(test_dir, tmpdir):
    build_dir = tmpdir.join("python-small")
    out_dir = build_dir.join("site/api")
    # Generate!
    try:
        shell.run(
            [
                "docfx",
                "build",
                "-t",
                # Template path depends on the test_dir fixture setup.
                "default,../devsite",
            ],
            cwd=build_dir,
            hide_output=False,
        )
    except Exception as e:
        pytest.fail(f"build raised an exception: {e}")

    # Note: rename of toc.html to _toc.yaml happens in doc-pipeline.
    toc_file_path = out_dir.join("toc.html")
    assert toc_file_path.isfile()
    got_text = toc_file_path.read_text("utf-8")
    assert "/python/docs/reference/texttospeech/latest" in got_text
