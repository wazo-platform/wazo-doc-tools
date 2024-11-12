---
title: Configuration
---

- [csv_import](/uc-doc/administration/users/csv_import)
- [User Management](/uc-doc/api_sdk/rest_api/confd/user_management)

## Function keys

Function keys can be configured to customize the user's phone keys. The `blf` field allows the key
to be supervised. A supervised key will light up when enabled. In most cases, a user cannot add
multiple times exactly the same function key (example : two user function keys pointing to the same
user). Adding the same function key multiple times can lead to undefined behavior and generally will
delete one of the two function keys.

**Warning**: SCCP device only supports type "Customized".

If the forward function key is used with no destination the user will be prompted when the user
presses the function key and the BLF will monitor _ALL_ forward for this user.

## Extensions

### `*3` (online call recording)

To enable online call recording, you must set `automixmon`:

`PUT /asterisk/features/featuremap {"options": {"automixmon": "*3", ...}}`

When this option is activated, the user can press `*3` during a conversation to start/stop online
call recording. The recorded file will be available in the `/var/spool/asterisk/monitor` directory.

### `*26` (call recording)

You can enable/disable the recording of all calls for a user in 2 different way:

1. By set `call_record_*_enabled: true` for user:

   ```ascii
   PUT /users/{user_uuid}
     {
       "call_record_outgoing_internal_enabled": true,
       "call_record_outgoing_external_enabled": true,
       "call_record_incoming_internal_enabled": true,
       "call_record_incoming_external_enabled": true
     }
   ```

2. By using the extension `*26` from your phone (the feature `callrecord` option must be enabled):

   `PUT /extensions/features/{extension_id}`

   **Note**: Using `*26` will toggle the four `call_record_*_enabled` options simultaneously

When this option is activated, all calls made to or made by the user will be recorded in the
`/var/lib/wazo/sounds/tenants/<tenant_uuid>/monitor` directory.
