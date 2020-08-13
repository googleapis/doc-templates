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
<?cs # The default search box that goes in the header ?><?cs
def:default_search_box() ?>
  <div id="search" >
      <div id="searchForm">
          <form accept-charset="utf-8" class="gsc-search-box"
                onsubmit="return submit_search()">
            <table class="gsc-search-box" cellpadding="0" cellspacing="0"><tbody>
                <tr>
                  <td class="gsc-input">
                    <input id="search_autocomplete" class="gsc-input" type="text" size="33" autocomplete="off"
                      title="search developer docs" name="q"
                      value="search developer docs"
                      onFocus="search_focus_changed(this, true)"
                      onBlur="search_focus_changed(this, false)"
                      onkeydown="return search_changed(event, true, '<?cs var:toroot?>')"
                      onkeyup="return search_changed(event, false, '<?cs var:toroot?>')" />
                  <div id="search_filtered_div" class="no-display">
                      <table id="search_filtered" cellspacing=0>
                      </table>
                  </div>
                  </td>
                  <td class="gsc-search-button">
                    <input type="submit" value="Search" title="search" id="search-button" class="gsc-search-button" />
                  </td>
                  <td class="gsc-clear-button">
                    <div title="clear results" class="gsc-clear-button">&nbsp;</div>
                  </td>
                </tr></tbody>
              </table>
          </form>
      </div><!-- searchForm -->
  </div><!-- search --><?cs
/def ?>
