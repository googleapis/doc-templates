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

<div class="g-unit" id="doc-content"><a name="top"></a>

<div id="jd-header" class="guide-header">
  <span class="crumb">
    <?cs if:parent.link ?>
      <a href="<?cs var:parent.link ?>"><?cs var:parent.title ?></a> >
    <?cs else ?>&nbsp;
    <?cs /if ?>
  </span>
<h1><?cs var:page.title ?></h1>
</div>

  <div id="jd-content">

    <div class="jd-descr">
    <?cs call:tag_list(root.descr) ?>
    </div>

  <a href="#top" style="float:right">&uarr; Go to top</a>
  <?cs if:parent.link ?>
    <p><a href="<?cs var:parent.link ?>">&larr; Back to <?cs var:parent.title ?></a></p>
  <?cs /if ?>
  </div>

<?cs include:"footer.cs" ?>
</div><!-- end doc-content -->

</body>
</html>



