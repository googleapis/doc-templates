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
<?cs include:"doctype.cs" ?>
<?cs include:"macros.cs" ?>
<html devsite>
<?cs include:"head_tag.cs" ?>
<body>
<div class="g-unit" id="doc-content">

<div id="jd-content">

<div class="jd-letterlist"><?cs each:letter=docs.classes ?>
    <a href="#letter_<?cs name:letter ?>"><?cs name:letter ?></a><?cs /each?>
</div>

<?cs each:letter=docs.classes ?>
<?cs set:count = #1 ?>
<h2 id="letter_<?cs name:letter ?>"><?cs name:letter ?></h2>
<table class="jd-sumtable">
    <?cs set:cur_row = #0 ?>
    <?cs each:cl = letter ?>
        <tr>
            <td class="jd-linkcol"><?cs call:type_link(cl.type) ?></td>
            <td class="jd-descrcol" width="100%"><?cs call:short_descr(cl) ?>&nbsp;</td>
        </tr>
    <?cs set:count = count + #1 ?>
    <?cs /each ?>
</table>
<?cs /each ?>

<?cs include:"footer.cs" ?>
</div><!-- end jd-content -->
</div><!-- end doc-content -->

</body>
</html>
