# Google.Cloud.Spanner.V1

The `Google.Cloud.Spanner.V1` package provides low-level access to the Google Cloud Spanner API.
This is not recommended for most scenarios. Where possible, use the
[Spanner ADO.NET provider](../../Google.Cloud.Spanner.Data/) instead. (That in turn depends on this package,
but provides a much more user-friendly API, and takes care of a lot of resource management automatically.)

# Installation

Install the `Google.Cloud.Spanner.V1` package from NuGet. Add it to
your project in the normal way (for example by right-clicking on the
project in Visual Studio and choosing "Manage NuGet Packages...").

# Authentication

When running on Google Cloud Platform, no action needs to be taken to authenticate.

Otherwise, the simplest way of authenticating your API calls is to
download a service account JSON file then set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to refer to it.
The credentials will automatically be used to authenticate. See the [Getting Started With
Authentication](https://cloud.google.com/docs/authentication/getting-started) guide for more details.
