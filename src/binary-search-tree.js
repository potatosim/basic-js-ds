const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

// class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootElement = null;
  }

  root() {
    return this.rootElement;
  }

  add(data) {
    this.rootElement = addWithin(this.rootElement, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return hasWithin(this.rootElement, data);

    function hasWithin(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }

      if (data < node.data) {
        return hasWithin(node.left, data);
      } else {
        return hasWithin(node.right, data);
      }
    }
  }

  find(data) {
    return findWithin(this.rootElement, data);

    function findWithin(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        return findWithin(node.left, data);
      } else {
        return findWithin(node.right, data);
      }
    }
  }

  remove(data) {
    this.rootElement = deleteWithin(this.rootElement, data);
    function deleteWithin(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = deleteWithin(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = deleteWithin(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left && node.right) {
          return node.right;
        }
        if (node.left && !node.right) {
          return node.left;
        }
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        deleteWithin(node.right, minFromRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.rootElement) {
      return null;
    }
    let current = this.rootElement;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootElement) {
      return null;
    }
    let current = this.rootElement;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(4);
tree.add(17);
tree.add(22);
tree.add(20);
tree.add(6);
tree.add(3);
tree.add(7);
tree.add(5);

console.log(tree.find(22));

module.exports = {
  BinarySearchTree,
};
