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

<div class="g-unit" id="doc-content">

<div id="jd-header">
<h1><?cs var:page.title ?></h1>
</div>

<div id="jd-content">

<div class="jd-letterlist"><?cs each:letter=keywords ?>
    <a href="#letter_<?cs name:letter ?>"><?cs name:letter ?></a><?cs /each?>
</div>

<?cs each:letter=keywords ?>
<a name="letter_<?cs name:letter ?>"></a>
<h2><?cs name:letter ?></h2>
<ul class="jd-letterentries">
<?cs each:entry=letter
?>  <li><a href="<?cs var:toroot ?><?cs var:entry.href ?>"><?cs var:entry.label
        ?></a>&nbsp;<font class="jd-letterentrycomments">(<?cs var:entry.comment ?>)</font></li>
<?cs /each
?></ul>

<?cs /each ?>

<?cs include:"footer.cs" ?>
</div><!-- end jd-content -->
</div><!-- end doc-content -->

</body>
</html>
