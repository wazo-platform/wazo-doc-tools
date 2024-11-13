---
title: Call Logs
---

Call logs allow users to see the history of the calls placed and received by Wazo.

**Note**: The oldest call logs are periodically removed. See
[wazo-purge-db](/uc-doc/system/log_files#wazo-purge-db) for more details.

## REST API {#rest-api}

Call logs are also available from [wazo-call-logd REST API](/uc-doc/api_sdk/rest_api/reference).

### Categorize call logs with custom tags

Sometimes, it's useful to separate call logs according to a specific value (department, city, etc.).
It's possible with the `userfield` of a user and the `tags` of a call log. Each `userfield` will be
copied into the `tags` for a call log and each `userfield` must be separated by a comma.

### Example

Your company has employees in the _accounting_ and _sales_ departments. To list call logs from the
_sales_ department, you must set the `userfield` of each user to `sales`. Now when a user tagged
with `sales` places or receives a call, this call will be also tagged `sales`. You can now filter
call logs by tags `sales`.

## Manual generation

Call logs can also be generated manually. To do so, log on to the target Wazo server and run:

```shell
wazo-call-logs
```

To avoid running for too long in one time, the call logs generation is limited to the N last
unprocessed CEL entries (default 20,000). This means that successive calls to `wazo-call-logs` will
process N more CELs, making about N/10 more calls available in call logs, going further back in
history, while processing new calls as well.

You can specify the number of CEL entries to consider. For example, to generate calls using the
100,000 last unprocessed CEL entries:

```shell
wazo-call-logs -c 100000
```

## Regeneration of call logs

Since call logs are based on CEL, they can be deleted and generated without problems. To regenerate
the last month of call logs:

```shell
    wazo-call-logs delete -d 30
    wazo-call-logs generate -d 30  # the default behavior of wazo-call-logs command is `generate`
```

## Technicals

Call logs are pre-generated from CEL entries. The generation is done automatically by
wazo-call-logd. wazo-call-logs is also run nightly to generate call logs from CEL that were missed
by wazo-call-logd.
