<script>
import { isUndefined } from '@vue-interface/utils';

function appendClass(vnode, str) {
    vnode.data.staticClass = `${vnode.data.staticClass && vnode.data.staticClass.replace(str, '') || ''} ${str}`.trim();  
}

function wrap(wrapper, fn) {
    return (e) => {
        if(typeof fn === 'function') {
            fn(e);
        }

        if(!e.cancelBubble) {
            wrapper(e);
        }
    };
}

function listener(vnode, key) {
    return vnode.data.on[key] || (
        vnode.componentOptions &&
        vnode.componentOptions.listeners &&
        vnode.componentOptions.listeners[key]
    );
}

export default {
    functional: true,

    render(h, context) {
        context.children.filter(vnode => !!vnode.tag)
            .forEach((vnode, i) => {
                vnode.data = Object.assign({staticClass: undefined}, vnode.data);
                
                if(!vnode.data.attrs) {
                    vnode.data.attrs = {};
                }
                
                if(!vnode.data.on) {
                    vnode.data.on = {};
                }
                vnode.data.on.click = wrap(e => {
                    context.parent.$emit('click-item', e, vnode);
                }, listener(vnode, 'click'));

                vnode.data.on.blur = wrap(e => {
                    context.parent.$emit('focus-item', e, vnode);
                }, listener(vnode, 'focus'));

                vnode.data.on.blur = wrap(e => {
                    context.parent.$emit('blur-item', e, vnode);
                }, listener(vnode, 'blur'));

                if(vnode.data.attrs && vnode.data.attrs.active) {
                    appendClass(vnode, 'active');
                }

                if(vnode.data.attrs && vnode.data.attrs.disabled) {
                    appendClass(vnode, 'disabled');
                }

                appendClass(vnode, 'list-group-item');

                const isAction = vnode.data.attrs.action === '' || !!vnode.data.attrs.action || vnode.componentOptions && vnode.componentOptions.propsData.action;

                if(isAction || vnode.tag === 'a' || vnode.tag === 'button' || (vnode.componentOptions && vnode.componentOptions.tag === 'router-link')) {
                    vnode.data.attrs['href'] = vnode.data.attrs['href'] || '#';

                    appendClass(vnode, 'list-group-item-action');
                }

                if(vnode.data.attrs && vnode.data.attrs.variant) {
                    appendClass(vnode, `list-group-item-${vnode.data.attrs.variant}`);
                }
            });

        return context.children;
    }

};
</script>
