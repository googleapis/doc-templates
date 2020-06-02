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
<body class="gc-documentation">

<div class="g-unit" id="doc-content">

<div>

<div>
<p><?cs call:tag_list(root.descr) ?></p>
</div>

<?cs set:count = #1 ?>
<table>
<?cs each:pkg = docs.packages ?>
    <tr>
        <td><?cs call:package_link(pkg) ?></td>
        <td width="100%"><?cs call:tag_list(pkg.shortDescr) ?></td>
    </tr>
<?cs set:count = count + #1 ?>
<?cs /each ?>
</table>

<?cs include:"footer.cs" ?>
</div>
</div> <!-- end doc-content -->

</body>
</html>
