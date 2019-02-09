---
nav_order: 4
---

# Specification

## \<api-client>

### Props
<table>
  <tr>
    <td>Prop</td>
    <td>Type</td>
    <td>Required</td>
    <td>Default</td>
    <td>Details</td>
  </tr>
  <tr>
    <td><code>url</code></td>
    <td><code>String</code></td>
    <td align="center">*</td>
    <td></td>
    <td>The URL to request.</td>
  </tr>
  <tr>
    <td><code>name</code></td>
    <td><code>String</code></td>
    <td></td>
    <td></td>
    <td>Make request using this named api-config. (See api-config below.)</td>
  </tr>
  <tr>
    <td><code>method</code></td>
    <td><code>String</code></td>
    <td></td>
    <td><code>GET</code></td>
    <td>HTTP method to use for request.</td>
  </tr>
  <tr>
    <td><code>data</code></td>
    <td><code>Object</code></td>
    <td></td>
    <td></td>
    <td>Send this data as JSON in POST body.</td>
  </tr>
  <tr>
    <td><code>params</code></td>
    <td><code>Object</code></td>
    <td></td>
    <td></td>
    <td>Send this data as URL params in GET request.</td>
  </tr>
  <tr>
    <td><code>filter</code></td>
    <td><code>String</code></td>
    <td></td>
    <td></td>
    <td>Apply this <a href="http://jsonata.org/">JSONata</a> expression to the response data before returning it.</td>
  </tr>
  <tr>
    <td><code>cache</code></td>
    <td><code>String</code></td>
    <td></td>
    <td></td>
    <td>Set to a string to cache GET requests for that duration (e.g. 5m, 1h, etc.) Cache key is url + params.</td>
  </tr>
  <tr>
    <td><code>success-mutation</code></td>
    <td><code>String</code></td>
    <td></td>
    <td></td>
    <td>Commit this vuex mutation with the response data as the payload on success.</td>
  </tr>
  <tr>
    <td><code>error-mutation</code></td>
    <td><code>String</code></td>
    <td></td>
    <td></td>
    <td>Commit this vuex mutation with the response object as the payload on failure.</td>
  </tr>
</table>

### Events
<table>
  <tr>
    <td>Event</td>
    <td>Handler arguments</td>
    <td>Details</td>
  </tr>
  <tr>
    <td><code>@start</code></td>
    <td></td>
    <td>The request has started.</td>
  </tr>
  <tr>
    <td><code>@end</code></td>
    <td></td>
    <td>The request has ended.</td>
  </tr>
  <tr>
    <td><code>@success</code></td>
    <td><code>responseBody</code></td>
    <td>The request has succeeded. First argument of handler will be body of response.</td>
  </tr>
  <tr>
    <td><code>@error</code></td>
    <td><code>response</code></td>
    <td>The request has failed. First argument of handler will be an <a href="https://github.com/axios/axios#response-schema">axios response object</a>.</td>
  </tr>
</table>

<br>

## \<api-config>

### Props
<table>
  <tr>
    <td>Prop</td>
    <td>Type</td>
    <td>Details</td>
  </tr>
  <tr>
    <td><code>name</code></td>
    <td><code>String</code></td>
    <td>Specify a name for this API config. Used with <code>&lt;api&gt;</code> name prop. Only needed if you are using multiple APIs (different baseUrl or headers) in your project.</td>
  </tr>
  <tr>
    <td><code>baseUrl</code></td>
    <td><code>String</code></td>
    <td>The base url to prepend to all request URLs.</td>
  </tr>
  <tr>
    <td><code>headers</code></td>
    <td><code>Object</code></td>
    <td>Add these headers to all requests.</td>
  </tr>
</table>