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
<p><a href="index.html">&larr; Back</a></p>

<p>The file containing the source code shown below is located in the corresponding directory in <code>&lt;sdk&gt;/samples/android-&lt;version&gt;/...</code></p>

<!-- begin file contents -->
<pre><?cs var:fileContents ?></pre>
<!-- end file contents -->

<?cs include:"footer.cs" ?>
</div><!-- end jd-content -->
</div> <!-- end doc-content -->

</body>
</html>
