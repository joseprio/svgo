'use strict';

const { detachNodeFromParent } = require('../lib/xast.js');

exports.type = 'visitor';
exports.active = false;
exports.description = 'removes raster images (disabled by default)';

/**
 * Remove raster images references in <image>.
 *
 * @see https://bugs.webkit.org/show_bug.cgi?id=63548
 *
 * @author Kir Belevich
 */
exports.fn = () => {
  return {
    element: {
      enter: (node, parentNode) => {
        if (
          node.name === 'image' &&
          node.attributes['xlink:href'] != null &&
          /(\.|image\/)(jpg|png|gif)/.test(node.attributes['xlink:href'])
        ) {
          detachNodeFromParent(node, parentNode);
        }
      },
    },
  };
};
