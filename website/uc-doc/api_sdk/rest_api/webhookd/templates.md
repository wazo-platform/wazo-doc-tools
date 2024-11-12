---
title: 'wazo-webhookd HTTP templates'
---

When creating a webhook (i.e. a subscription), you can customize parts of the HTTP request that will
be triggered. For this, subscriptions are defined using a templating "language", that indicates
where to use variables that will be replaced with event data.

Templates use the Jinja2 syntax. See
[the Jinja documentation for more details](https://jinja.palletsprojects.com/en/2.11.x/templates/).

The following parts of the request are templated:

- the request's URL
- the request's body

## Example

Given a subscription:

![](/images/uc-doc/api_sdk/rest_api/webhookd/template-subscription.png)

When an event is emitted:

![](/images/uc-doc/api_sdk/rest_api/webhookd/template-event.png)

Then a HTTP request is sent to `https://example.com`:

![](/images/uc-doc/api_sdk/rest_api/webhookd/template-request.png)

## Reference

Available variables:

- `event_name`: the name of the event.
- `wazo_uuid`: the UUID of the Wazo server who sent the event.
- `event`: the body of the event. Details may be accessed like: `event['detail']`. Further nested
  details may be accessed like: `event['detail']['subdetail']`.

## Tips

### Query string

If you want to create a query string from an event, you can use Jinja's
[builtin filter feature](https://jinja.palletsprojects.com/en/2.11.x/templates/#builtin-filters):

- The template: `https://example.com/query?{{ event|urlencode }}`
- gives an URL: `https://example.com/query?key1=value1&key2=value2`
- when triggered with an event:

  ```json
  {
    "key1": "value1",
    "key2": "value2"
  }
  ```
