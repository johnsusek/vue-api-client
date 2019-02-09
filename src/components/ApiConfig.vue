<template>
  <span :style="{ 'display': 'none' }" />
</template>

<script>
import { setConfig } from '../lib/config';

export default {
  props: ['name', 'headers', 'baseUrl'],

  created() {
    setConfig(this.name, {
      headers: this.headers,
      baseURL: this.baseUrl
    });
  }
};
</script>
