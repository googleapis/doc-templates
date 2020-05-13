<!--
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
-->
<?cs include:"macros.cs" ?>
<html devsite>
<?cs include:"head_tag.cs" ?>
<body>
<style>
    .jd-hierarchy-spacer {
        width: 15px;
    }
    .jd-hierarchy-data {
        text-align: left;
        vertical-align: top;
    }
</style>
<div class="g-unit" id="doc-content">

<div id="jd-content">

<div style="margin-left: 20px; margin-right: 20px;">

<?cs def:hierarchy_list(classes) ?>
<?cs each:cl = classes ?>
<tr>
    <?cs loop:x=#0,cl.indent,#1 ?><td class="jd-hierarchy-spacer"></td><?cs /loop ?>
    <td class="jd-hierarchy-data" colspan="<?cs var:cl.colspan ?>">
    <?cs if:cl.exists ?>
        <?cs call:type_link(cl.class) ?>
    <?cs else ?>
        <?cs var:cl.value ?>
    <?cs /if ?>
    </td>
    <td class="jd-hierarchy-data">
    <?cs each:iface = cl.interfaces ?>
        <?cs if:iface.exists ?>
            <?cs call:type_link(iface.class) ?>
        <?cs else ?>
            <?cs var:iface.value ?>
        <?cs /if ?> &nbsp;&nbsp;
    <?cs /each ?>
    &nbsp;
    </td>
</tr>
<?cs call:hierarchy_list(cl.derived) ?>
<?cs /each ?>
<?cs /def ?>


<table border="0" cellpadding="0" cellspacing="1">
<th class="jd-hierarchy-data" colspan="<?cs var:colspan ?>">Class</th>
<th class="jd-hierarchy-data">Interfaces</th>
<?cs call:hierarchy_list(classes) ?>
</table>

</div>

<?cs include:"footer.cs" ?>
</div><!-- end jd-content -->
</div><!-- end doc-content -->

</body>
</html>

