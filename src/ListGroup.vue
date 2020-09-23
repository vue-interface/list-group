<template>
    <div class="list-group" :class="classes">
        <list-group-items>
            <slot />
        </list-group-items>
    </div>
</template>

<script>
import Shadowable from '@vue-interface/shadowable';
import ListGroupItems from './ListGroupItems';

export default {

    components: {
        ListGroupItems
    },

    mixins: [
        Shadowable
    ],

    props: {

        /**
         * The list group appear flush (without some borders).
         *
         * @property Boolean
         */
        flush: {
            type: Boolean,
            default: false
        }

    },

    computed: {
        classes() {
            return {
                'list-group-flush': this.flush,
                [this.shadowableClass]: !!this.shadow,
            };
        }
    }

};
</script>
