#!/usr/bin/env bash
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

# Disable buffering, so that the logs stream through.
export PYTHONUNBUFFERED=1

# Add the path where pip installs commands to PATH.
export PATH=$PATH:${HOME}/.local/bin

python3 -m pip install -r requirements.txt
python3 -m pip install flake8 black pytest pytest-cov

black --check tests
flake8 tests

if [ -n "$UPDATE_GOLDENS" ]; then
    pytest --update-goldens tests
else
    pytest tests
fi
