const plugin = require('tailwindcss/plugin');
const Color = require('color');
const colors = require('tailwindcss/colors');
const variations = require('@vue-interface/variant/tailwindcss/variations');

function textColor(backgroundColor, color) {
    color = Color(color);

    if(Color(backgroundColor).isDark()) {
        return color.lighten(.66).hex();
    }

    return color.darken(.66).hex();
}

function bgColor(color, level) {
    color = Color(color);

    if(color.luminosity() > .9) {
        return color.hex();
    }

    return color.lightness(level).hex();
}

// function activeColor(color, level) {
//     color = Color(color);

//     return color.hex();
// }


module.exports = plugin(function({ addComponents, theme }) {

    function variant(key, color) {
        const backgroundColor = bgColor(color, theme('listGroup.item.level.lightness'));
        
        color = textColor(backgroundColor, color);

        Object.assign(listGroup, {
            [`.list-group-item-${key}`]: {
                backgroundColor,
                color,
            },

            [`.list-group-item-${key}.list-group-item-action:hover, .list-group-item-${key}.list-group-item-action:focus`]: {
                color,
                backgroundColor: Color(backgroundColor).darken(.1).desaturate(.25).hex()
            },

            [`.list-group-item-${key}.list-group-item-action.active`]: {
                color: theme('colors.white', colors.white),
                backgroundColor: Color(color).lighten(.66).hex(),
                borderColor: Color(color).lighten(.66).hex(),
            }
        });
    }
  
    const listGroup = {
        
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
        
        '.list-group-flush > .list-group-item:last-child': {
            borderBottomWidth: 0
        }

    });
    
    Object.entries(theme('variations', variations))
        .forEach(([key, value]) => {
            variant(key, value);
        });
    
    addComponents(listGroup);
}, {
    theme: {
        listGroup: theme => ({
            backgroundColor: theme('colors.white', colors.white),
            borderColor: Color(theme('colors.black', colors.black)).fade(.885),
            borderWidth: '1px',
            borderRadius: '.25rem',
            textDecoration: 'none',
            item: {
                paddingY: '.5rem',
                paddingX: '1rem',
                level: {
                    color: 6,
                    lightness: 88.5,
                }
            },
            hover: {
                color: theme('colors.gray.700', colors.gray['700']),
                backgroundColor: theme('colors.gray.100', colors.gray['100'])
            },
            active: {
                color: theme('colors.white', colors.white),
                backgroundColor: theme('variations.primary', variations.primary),
                borderColor: theme('variations.primary', variations.primary),
            },
            disabled: {
                color: theme('colors.gray.500', colors.gray['500']),
                backgroundColor: theme('colors.white', colors.white),
            },
            action: {
                color: theme('colors.gray.700', colors.gray['700']),
                active: {
                    color: theme('colors.gray.900', colors.gray['900']),
                    backgroundColor: theme('colors.gray.200', colors.gray['200']),
                },
                hover: {
                    color: theme('colors.gray.700', colors.gray['700']),
                }
            }
        })
    }
});