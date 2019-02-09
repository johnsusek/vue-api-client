# Usage

## Getting data

### On creation

The simplest invocation will just GET the URL provided when the component is created.

```vue
<api-client url="http://api.example.com/users" />
```

Add a `@success` handler to access the data that was retrieved.

```vue
<api-client url="http://api.example.com/users" @success="x => users = x" />
Data from API is: {% raw %}{{ users }}{% endraw %}
```

Add an `@error` handler to access the error response.

```vue
<api-client url="http://api.example.com/users" @error="x => response = x" />
Error from API is: {% raw %}{{ response }}{% endraw %}
```

### On interaction

This example loads the endpoint only once the button is clicked.

```vue
<api-client url="http://api.example.com/users">
  <button slot-scope="api" @click="api.action">
</api>
```

## Sending data

To send data to an endpoint, add `method` and `data` props.

```vue
<api-client url="https://api.example.com/users/add" method="post" :data="{ username: 'JaneDoe' }">
  <button slot-scope="api" @click="api.action">Add user</button>
</api>
```

## Setting defaults

You don't want to specify the full url for each request, so you can configure VAC first.

```vue
<api-config base-url="https://api.example.com" />
<api-client url="/users" />
```

Often API communication will need a token passed in the headers to authenticate.

```vue
<api-config :headers="{ 'X-API-TOKEN': 'mySecretToken' }" />
<api-client url="http://api.example.com/users" />
```

## Combined examples

### Example 1
This example will send an authenticated API GET request when the user clicks the button. Depending on if the request succeeds, the user will see the list of users or an error.

```vue
<api-config base-url="https://api.example.com" :headers="{ 'X-API-TOKEN': 'mySecretToken' }" />

<api-client url="/users" @success="x => users = x" @error="x => error = x">
  <button slot-scope="api" @click="api.action">Get users</button>
</api>

<div v-if="users">>Got users: {% raw %}{{ users }}{% endraw %}</div>
<div v-if="error">>Error: {% raw %}{{ error }}{% endraw %}</div>
```

### Example 2
This example will collect a username and send an authenticated POST request to the API when the user clicks the button. Depending on if the request succeeds, the user will see the created user or an error.

```vue
<api-config base-url="https://api.example.com" :headers="{ 'X-API-TOKEN': 'mySecretToken' }" />

<input v-bind="newUser.username">

<api-client 
  url="/users/add" 
  method="post" 
  :data="newUser"
  @success="x => user = x" 
  @error="x => error = x">
  <button slot-scope="api" @click="api.action">Add user</button>
</api>

<div v-if="user">>Created user: {% raw %}{{ user }}{% endraw %}</div>
<div v-if="error">>Error: {% raw %}{{ error }}{% endraw %}</div>
```
