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
<?cs include:"doctype.cs" ?>
<?cs include:"macros.cs" ?>
<html devsite>
<?cs include:"head_tag.cs" ?>
  <body>

    <div class="g-unit" id="doc-content">

    <div id="jd-header">
      <!--package
      <h1><?cs var:package.name ?></h1-->
    </div><!-- end header -->

    <div id="naMessage"></div>

    <div id="jd-content">

    <?cs if:subcount(package.descr) ?>
      <div class="jd-descr">
        <?cs call:tag_list(package.descr) ?>
      </div>
    <?cs /if ?>

    <?cs def:class_table(label, classes) ?>
      <?cs if:subcount(classes) ?>
        <h3><?cs var:label ?></h3>
        <div class="jd-sumtable">
        <?cs call:class_link_table(classes) ?>
        </div>
      <?cs /if ?>
    <?cs /def ?>

    <?cs call:class_table("Annotations", package.annotations) ?>
    <?cs call:class_table("Interfaces", package.interfaces) ?>
    <?cs call:class_table("Classes", package.classes) ?>
    <?cs call:class_table("Enums", package.enums) ?>
    <?cs call:class_table("Exceptions", package.exceptions) ?>
    <?cs call:class_table("Errors", package.errors) ?>

    <?cs # include:"footer.cs" ?>
    </div><!-- end jd-content -->
    </div><!-- doc-content -->

  </body>
</html>
