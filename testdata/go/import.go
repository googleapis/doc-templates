/*Package testdatago is only used to get a fake import of
cloud.google.com/go/storage.

To update the YAML, run `godocfx --rm cloud.google.com/go/storage/...`.
See https://github.com/googleapis/google-cloud-go/tree/master/internal/godocfx.
*/
package testdatago

import (
	// The test data is generated from cloud.google.com/go/storage.
	// Import it to get a consistent version.
	_ "cloud.google.com/go/storage"
)
