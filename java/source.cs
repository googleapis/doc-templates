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
<body class="<?cs var:class.since.key ?>">

<div class="g-unit" id="doc-content">

<div id="api-info-block">

<?cs # are there inherited members ?>
<?cs each:cl=class.inherited ?>
  <?cs if:subcount(cl.methods) ?>
   <?cs set:inhmethods = #1 ?>
  <?cs /if ?>
  <?cs if:subcount(cl.constants) ?>
   <?cs set:inhconstants = #1 ?>
  <?cs /if ?>
  <?cs if:subcount(cl.fields) ?>
   <?cs set:inhfields = #1 ?>
  <?cs /if ?>
  <?cs if:subcount(cl.attrs) ?>
   <?cs set:inhattrs = #1 ?>
  <?cs /if ?>
<?cs /each ?>

<div class="sum-details-links">
<?cs if:doclava.generate.sources ?>
<div>
<a href="<?cs var:class.name ?>.html">View Documentation</a>
</div>
<?cs /if ?>

</div><!-- end sum-details-links -->
<div class="api-level">
  <?cs call:since_tags(class) ?>
  <?cs call:federated_refs(class) ?>
</div>
</div><!-- end api-info-block -->

<?cs # this next line must be exactly like this to be parsed by eclipse ?>
<!-- ======== START OF CLASS DATA ======== -->

<div id="jd-header">
    <?cs var:class.scope ?>
    <?cs var:class.static ?>
    <?cs var:class.final ?>
    <?cs var:class.abstract ?>
    <?cs var:class.kind ?>
<h1><?cs var:class.name ?></h1>

<?cs set:colspan = subcount(class.inheritance) ?>
<?cs each:supr = class.inheritance ?>
  <?cs if:colspan == 2 ?>
    extends <?cs call:type_link(supr.short_class) ?><br/>
  <?cs /if ?>
  <?cs if:last(supr) && subcount(supr.interfaces) ?>
      implements
      <?cs each:t=supr.interfaces ?>
        <?cs call:type_link(t) ?>
      <?cs /each ?>
  <?cs /if ?>
  <?cs set:colspan = colspan-1 ?>
<?cs /each ?>

</div><!-- end header -->
<div id="jd-content">
  <pre class="prettyprint">
<?cs var:class.source ?>
  </pre>
</div>
<?cs include:"footer.cs" ?>
</div> <!-- jd-content -->

</div><!-- end doc-content -->

</body>
</html>
