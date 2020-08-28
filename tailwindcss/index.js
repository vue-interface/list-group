const plugin = require('tailwindcss/plugin');
const { breakpoints, darken, colorLevel, rgba } = require('@vue-interface/tailwindcss');
const { colors } = require('tailwindcss/defaultTheme');
const defaultVariations = require('@vue-interface/variant/tailwindcss/defaultVariations');

module.exports = plugin(function({ addComponents, theme }) {
    function variant(state, backgroundColor, color) {
        Object.assign(listGroup, {
            [`.list-group-item-${state}`]: {
                color,
                backgroundColor,
            },

            [`.list-group-item-${state}.list-group-item-action:hover, .list-group-item-${state}.list-group-item-action:focus`]: {
                color,
                backgroundColor: darken(backgroundColor, .05)
            },

            [`.list-group-item-${state}.list-group-item-action.active`]: {
                color: theme('colors.white', colors.white),
                backgroundColor: color,
                borderColor: color,
            }
        });
    }
  
    const listGroup = {
        ':root': {
            
        },
        
        // Base class
        //
        // Easily usable on <ul>, <ol>, or <div>.
        '.list-group': {
            display: 'flex',
            flexDirection: 'column',

            // No need to set list-style: none; since .list-group-item is block level
            paddingLeft: 0, // reset padding because ul and ol
            marginBottom: 0,
            borderRadius: theme('listGroup.borderRadius')
        },
    
        
        // Interactive list items
        //
        // Use anchor or button elements instead of `li`s or `div`s to create interactive
        // list items. Includes an extra `.active` modifier class for selected items.

        '.list-group-item-action': {
            width: '100%', // For `<button>`s (anchors become 100% by default though)
            color: theme('listGroup.action.color'),
            textAlign: 'inherit' // For `<button>`s (anchors inherit)
        },


        // Hover state
        '.list-group-item-action:hover, .list-group-item-action:focus': {
            zIndex: 1, // Place hover/focus items above their siblings for proper border styling
            color: theme('listGroup.hover.color'),
            textDecoration: 'none',
            backgroundColor:  theme('listGroup.hover.backgroundColor')
        },

        '.list-group-item-action:active': {
            color: theme('listGroup.action.active.color'),
            backgroundColor: theme('listGroup.action.active.backgroundColor')
        },

        
        // Individual list items
        //
        // Use on `li`s or `div`s within the `.list-group` parent.
        
        '.list-group-item': {
            position: 'relative',
            display: 'block',
            padding: `${theme('listGroup.item.paddingY')} ${theme('listGroup.item.paddingX')}`,
            color: theme('listGroup.color'),
            textDecoration: theme('listGroup.textDecoration'),
            backgroundColor: theme('listGroup.backgroundColor'),
            border: `${theme('listGroup.borderWidth')} solid ${theme('listGroup.borderColor')}`,
        },

        '.list-group-item:first-child': {
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
        },

        '.list-group-item:last-child': {
            borderBottomLeftRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
        },
        
        '.list-group-item.disabled, .list-group-item:disabled': {
            color: theme('listGroup.disabled.color'),
            pointerEvents: 'none',
            backgroundColor: theme('listGroup.disabled.backgroundColor')
        },
        
        // Include both here for `<a>`s and `<button>`s
        '.list-group-item.active': {
            zIndex: 2, // Place active items above their siblings for proper border styling
            color: theme('listGroup.active.color'),
            backgroundColor: theme('listGroup.active.backgroundColor'),
            borderColor: theme('listGroup.active.borderColor'),
        },
        
        '.list-group-item + .list-group-item': {
            borderTopWidth: 0
        },
        
        '.list-group-item + .list-group-item.active': {
            marginTop: `-${theme('listGroup.borderWidth')}`,
            borderTopWidth: theme('listGroup.borderWidth')
        }
    };

    // Horizontal
    //
    // Change the layout of list group items from vertical (default) to horizontal.
    
    const breaks = breakpoints(theme('screens'));

    breaks.sortMin().forEach(([key, breakpoint]) => {
        const selector = breaks.infix('.list-group-horizontal', key);

        Object.assign(listGroup, {
            [`@media only screen (min-width: ${breakpoint.min()})`]: {
                [selector]: {
                    flexDirection: 'row'
                },

                [`${selector} > .list-group-item:first-child`]: {
                    borderBottomLeftRadius: theme('listGroup.borderRadius'),
                    borderTopRightRadius: 0
                },

                [`${selector} > .list-group-item:last-child`]: {
                    borderTopRightRadius: theme('listGroup.borderRadius'),
                    borderTopRightRadius: 0
                },

                [`${selector} > .list-group-item.active`]: {
                    marginTop: 0
                },

                [`${selector} + .list-group-item`]: {
                    borderTopWidth: theme('listGroup.borderWidth'),
                    borderLeftWidth: 0,
                },

                [`${selector} + .list-group-item.active`]: {
                    marginleft: `-${theme('listGroup.borderWidth')}`,
                    borderLeftWidth: theme('listGroup.borderWidth')
                }
            }
        });
    });
    
    Object.assign(listGroup, {

        // Flush list items
        //
        // Remove borders and border-radius to keep list group items edge-to-edge. Most
        // useful within other components (e.g., cards).

        '.list-group-flush': {
            borderRadius: 0,
        },

        '.list-group-flush > .list-group-item': {
            borderWidth: `0 0 ${theme('listGroup.borderWidth')}`
        },
        
        '.list-group-flush:last-child': {
            borderBottomWidth: 0
        }

    });
    
    Object.entries(theme('variations', defaultVariations))
        .forEach(([key, value]) => {
            variant(key, colorLevel(value, theme('listGroup.item.level.backgroundColor')), colorLevel(value, theme('listGroup.item.level.color')));
        });
    
    addComponents(listGroup);
}, {
    theme: {
        listGroup: theme => ({
            backgroundColor: theme('colors.white', colors.white),
            borderColor: rgba(theme('colors.black', colors.black), .125),
            borderWidth: '1px',
            borderRadius: '.25rem',
            textDecoration: 'none',
            item: {
                paddingY: '.5rem',
                paddingX: '1rem',
                level: {
                    color: 6,
                    backgroundColor: -5,
                }
            },
            hover: {
                color: theme('colors.gray.700', colors.gray[700]),
                backgroundColor: theme('colors.gray.100', colors.gray[100])
            },
            active: {
                color: theme('colors.white', colors.white),
                backgroundColor: theme('variations.primary', defaultVariations.primary),
                borderColor: theme('variations.primary', defaultVariations.primary),
            },
            disabled: {
                color: theme('colors.gray.600', colors.gray[600]),
                backgroundColor: theme('colors.white', colors.white),
            },
            action: {
                color: theme('colors.gray.700', colors.gray[700]),
                active: {
                    color: theme('colors.gray.900', colors.gray[900]),
                    backgroundColor: theme('colors.gray.200', colors.gray[200]),
                },
                hover: {
                    color: theme('colors.gray.700', colors.gray[700]),
                }
            }
        })
    }
});