# Prerender2 refresh helper

This is a helper script for refreshing Prerender2 caching.

## Problem

After prerendering, the browser shows prerendered page if the cache of the resources are expired.

## Solution

Load the this helper script and put `data-prerender-refresh="seconds"` at the Speculation Rules, then the helper continuously update speculation rules.
Then the browser refresh prerendered page so we can avoid to use the old Web page resources.

```html
<script src="this-script-url"></script>
<script type="speculationrules" data-prerender-refresh="5">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["page.html"]
    }
  ]
}
</script>
```
