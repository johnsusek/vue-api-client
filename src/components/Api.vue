<template>
  <span>
    <slot :action="doAction" />
  </span>
</template>

<script>
import axios from 'axios';
import jsonata from 'jsonata';
import { getConfig } from '../lib/config';

export default {
  props: ['name', 'url', 'data', 'params', 'method', 'filter', 'successMutation', 'errorMutation'],

  data() {
    return {
      response: null,
    };
  },

  mounted() {
    // If the user hasn't put anything in the slot, just do the action
    // immediately
    if (!this.$slots.default && !this.$scopedSlots.default) {
      this.doAction();
    }
  },

  methods: {
    async doAction() {
      await this.$nextTick();

      const axiosConfig = getConfig(this.name);

      if (this.method) axiosConfig.method = this.method;
      if (this.params) axiosConfig.params = this.params;
      if (this.data) axiosConfig.data = this.data;
      if (this.url) axiosConfig.url = this.url;

      this.$emit('start');

      try {
        const res = await axios.request(axiosConfig);

        // For successful calls, just return the data
        this.response = res.data;

        // User has specified a JSONata filter
        if (this.filter) {
          this.response = jsonata(this.filter).evaluate(this.response);
        }

        // User has specified a vuex mutation
        if (this.successMutation && this.$store) {
          this.$store.commit(this.successMutation, this.response);
        }

        this.$emit('success', this.response);
      } catch (error) {
        // For errors, return the whole response object for handling
        this.response = error.response;

        // User has specified a vuex mutation
        if (this.errorMutation && this.$store) {
          this.$store.commit(this.errorMutation, this.response);
        }

        this.$emit('error', this.response);
      } finally {
        this.$emit('end');
      }
    },
  },
};
</script>
