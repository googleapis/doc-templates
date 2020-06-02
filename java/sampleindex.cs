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
<?cs set:resources="true" ?>
<html devsite>
<?cs include:"head_tag.cs" ?>
<body class="gc-documentation">


<a name="top"></a>
<div class="g-unit" id="doc-content">
 <div id="jd-header" class="guide-header">
  <span class="crumb">&nbsp;</span>
  <h1><?cs var:page.title ?></h1>
 </div>

<div id="jd-content">
<p><a href="../index.html">&larr; Back</a></p>

<?cs var:summary ?>

  <?cs if:subcount(subdirs) ?>
      <h2>Subdirectories</h2>
      <ul class="nolist">
      <?cs each:dir=subdirs ?>
        <li><a href="<?cs var:dir.name ?>/index.html"><?cs
          var:dir.name ?>/</a></li>
      <?cs /each ?>
      </ul>
  <?cs /if ?>

  <?cs if:subcount(files) ?>
      <h2>Files</h2>
      <ul class="nolist">
      <?cs each:file=files ?>
        <li><a href="<?cs var:file.href ?>"><?cs
          var:file.name ?></a></li>
      <?cs /each ?>
      </ul>
  <?cs /if ?>

</div><!-- end jd-content -->

<?cs include:"footer.cs" ?>

</div><!-- end doc-content -->

</body>
</html>
