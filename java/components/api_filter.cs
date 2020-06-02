<?cs
#  Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
?>
<?cs # The default API filter selector that goes in the header ?><?cs
def:default_api_filter() ?><?cs
  if:reference.apilevels ?>
  <div id="api-level-toggle">
    <input type="checkbox" id="apiLevelCheckbox" onclick="toggleApiLevelSelector(this)" />
    <label for="apiLevelCheckbox" class="disabled">Filter by API Level: </label>
    <select id="apiLevelSelector">
      <!-- option elements added by buildApiLevelSelector() -->
    </select>
  </div>
  <script>
   var SINCE_DATA = [ <?cs
      each:since = since ?>'<?cs
        var:since.key ?>'<?cs
        if:!last(since) ?>, <?cs /if ?><?cs
      /each
    ?> ];

    var SINCE_LABELS = [ <?cs
      each:since = since ?>'<?cs
        var:since.name ?>'<?cs
        if:!last(since) ?>, <?cs /if ?><?cs
      /each
    ?> ];
    buildApiLevelSelector();
    addLoadEvent(changeApiLevel);
  </script>
<?cs /if ?>
<?cs /def ?>
