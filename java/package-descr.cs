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

<div id="api-info-block">
<div>
  <?cs call:since_tags(package) ?>
  <?cs call:federated_refs(package) ?>
</div>
</div>

<div id="jd-header">
  package
  <h1><?cs var:package.name ?></b></h1>
  <div class="jd-nav">
      <a class="jd-navlink" href="package-summary.html">Classes</a> | Description
  </div>
</div><!-- end header -->

<div id="naMessage"></div>

<div id="jd-content">
<div class="jd-descr">
<p><?cs call:tag_list(package.descr) ?></p>
</div>

<?cs include:"footer.cs" ?>
</div><!-- end jd-content -->
</div> <!-- end doc-content -->

</body>
</html>
