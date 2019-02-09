---
nav_order: 5
---

# Advanced usage

## Sequencing

Let's say you have a scenario where need to request data from two endpoints before you can call a third endpoint. Since the last endpoint requires data from the first two, you cannot call it right away. Here is how you would handle that with VAC.

```vue
<api-client url="/todos" @success="x => todos = x" />
<api-client url="/users" @success="x => users = x" />

<api-client
  v-if="users && todos"
  url="/thirdEndpoint"
  :params="{ user: users[1].id, todo: todos[3].id }" />
```

Now, `/thirdEndpoint` won't be called until `todos` and `users` is populated with data.

## Vuex

Add the propery `mutation` to `<api-client>` to commit the specified mutation with the response data as the payload.

```vue
<api-client url="/users" mutation="SET_USERS" />
```

Now, the mutation `SET_USERS` will be called on the store with the data returned from the API.