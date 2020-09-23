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
    return vnode.data && vnode.data.on && vnode.data.on[key];
}

function prop(vnode, key) {
    const attr = vnode.data && vnode.data.attrs && vnode.data.attrs[key];

    if(attr === '' || !!attr) {
        return attr;
    }

    return vnode.componentOptions
        && vnode.componentOptions.propsData
        && vnode.componentOptions.propsData[key];
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

                if(vnode.data.attrs && prop(vnode, 'active')) {
                    appendClass(vnode, 'active');
                }

                if(vnode.data.attrs && prop(vnode, 'disabled')) {
                    appendClass(vnode, 'disabled');
                }

                appendClass(vnode, 'list-group-item');

                const isAction = prop(vnode, 'action') === '' || !!prop(vnode, 'action');

                if(isAction || vnode.tag === 'a' || vnode.tag === 'button' || (vnode.componentOptions && vnode.componentOptions.tag === 'router-link')) {
                    vnode.data.attrs['href'] = vnode.data.attrs['href'] || '#';

                    appendClass(vnode, 'list-group-item-action');
                }

                if(vnode.data.attrs && prop(vnode, 'variant')) {
                    appendClass(vnode, `list-group-item-${prop(vnode, 'variant')}`);
                }
            });

        return context.children;
    }

};
</script>
