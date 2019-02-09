<template>
  <span v-show="$scopedSlots.default || $slots.default" style="display: inline-block">
    <slot :action="doAction" :response="response" />
  </span>
</template>

<script>
import axios from 'axios';
import jsonata from 'jsonata';
import parseDuration from 'parse-duration';
import { getConfig } from '../lib/config';
import cache from '../lib/cache';

export default {
  props: {
    value: [Object, Array, String],
    name: String,
    url: String,
    data: Object,
    params: Object,
    method: {
      type: String,
      default: 'get'
    },
    filter: String,
    successMutation: String,
    errorMutation: String,
    eager: Boolean,
    cache: [Boolean, String]
  },

  data() {
    return {
      response: null
    };
  },

  mounted() {
    if (this.shouldRequestOnMount) {
      if (this.cacheHit) {
        this.response = this.cacheHit;
        this.$emit('input', this.response);
        this.$emit('success', this.response);
      } else {
        console.log('no cache, doing action!');
        this.doAction();
      }
    }
  },

  computed: {
    shouldRequestOnMount() {
      // If the user hasn't put anything in the slot, just do the action
      // immediately; or if they have explicity set eager mode.
      return this.eager || (!this.$slots.default && !this.$scopedSlots.default);
    },

    cacheDuration() {
      let duration = '1m';

      if (typeof this.cache === 'string') {
        duration = this.cache;
      }

      try {
        duration = parseDuration(duration);
      } catch (error) {
        duration = 300000;
      }

      console.log(duration);

      return duration;
    },

    cacheHit() {
      // if cache is enabled, and key is less than 5m old, then return cached copy
      console.log(this.cache, cache);
      let cacheKey = this.url + JSON.stringify(this.params);
      console.log(cacheKey);
      let cacheItem = cache[cacheKey];
      console.log(cacheItem);

      console.log(this.type);

      if (
        // Only cache GET requests
        (!this.type || this.type === 'get')
        // Only if the prop is set
        && this.cache
        // And only if there is an item in the cache
        && cacheItem
        // And that item is fresh enough
        && (+new Date() - cacheItem.time) < this.cacheDuration
      ) {
        return cacheItem.data;
      }

      return false;
    }
  },

  methods: {
    async doAction() {
      await this.$nextTick();

      let axiosConfig = { ...getConfig(this.name) };

      if (this.method) axiosConfig.method = this.method;
      if (this.params) axiosConfig.params = this.params;
      if (this.data) axiosConfig.data = this.data;
      if (this.url) axiosConfig.url = this.url;

      console.log('emitting START!');

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

        if (this.cache) {
          let cacheKey = this.url + JSON.stringify(this.params);

          cache[cacheKey] = {
            time: +new Date(),
            data: this.response
          };
        }

        this.$emit('input', this.response);
        this.$emit('success', this.response);
        this.$emit(`success:${res.status}`, this.response);
      } catch (error) {
        // For errors, return the whole response object for handling
        this.response = error.response;

        // User has specified a vuex mutation
        if (this.errorMutation && this.$store) {
          this.$store.commit(this.errorMutation, this.response);
        }

        this.$emit('error', this.response);
        this.$emit(`error:${error.response.status}`, this.response);
      } finally {
        this.$emit('end');
      }
    }
  }
};
</script>
