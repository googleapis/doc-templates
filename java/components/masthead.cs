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
<?cs def:custom_masthead() ?>
<div id="header">
    <div id="headerLeft">
    <?cs if:project.name ?>
      <span id="masthead-title"><?cs var:project.name ?></span>
    <?cs /if ?>
    </div>
    <div id="headerRight">
      <?cs call:default_search_box() ?>
      <?cs if:reference && reference.apilevels ?>
        <?cs call:default_api_filter() ?>
      <?cs /if ?>
    </div>
</div><!-- header -->
<?cs /def ?>
