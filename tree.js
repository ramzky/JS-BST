function node(data) {
  let left = null;
  let right = null;
  return {
    data,
    left,
    right
  };
}

function tree(arr) {

  let root_ = null;

  const root = () => root_;
  const buildTree = (arr) => {
    // sort and remove duplicate...
    let start = 0;
    let end = arr.length - 1;
    let root = (function re(arr, start, end) {
      if (start > end) return null;
      let mid = parseInt((start + end) / 2);
      let n = node(arr[mid]);

      n.left = re(arr, start, mid - 1);
      n.right = re(arr, mid + 1, end);

      return n;
    })(arr, start, end);

    root_ = root;
  };
  const insert = (val) => {
    //call buildTree if no tree maybe... or not
    //check duplicate first...
    let root = (function re(n, v) {
      if (n === null) return node(v);
      if (v < n.data) n.left = re(n.left, val);
      else n.right = re(n.right, val);

      return n;
    })(root_, val);

    if (root_ === null) root_ = root;
  };
  const remove = (val) => {
    (function re(n, v) {
      if (n === null) return null;
      if (v < n.data) {
        n.left = re(n.left, v);
        return n;
      }
      if (v > n.data) {
        n.right = re(n.right, v);
        return n;
      }

      if (n.left === null) {
        return n.right;
      }
      else if (n.right === null) {
        return n.left;
      }
      else {
        let successorParent = n;
        let successor = n.right;

        while (successor.left !== null) {
          successorParent = successor;
          successor = successor.left;
        }

        if (successorParent !== n) successorParent.left = successor.right;
        else n.right = successor.right;

        n.data = successor.data;

        return n;
      }
    })(root_, val);
  };
  const find = (val) => {
    return (function re(n, v) {
      if (n === null) return null;
      if (v < n.data) return re(n.left, v);
      if (v > n.data) return re(n.right, v);
      return n;
    })(root_, val);
  };
  const levelOrder = (fn = Array.prototype.push) => {
    let arr = [];
    let queue = [];
    queue.push(root_);
    while (queue.length > 0) {
      let current = queue.shift();
      fn.call(arr, current.data); // rewrite this ???...
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    return arr;
  };
  const inorder = (fn = () => {}) => {
    return (function re(n, fn) {
      if (n === null) return null;
      let arr = [];

      if (n.left !== null) arr = arr.concat(re(n.left, fn));
      fn(n.data);
      arr.push(n.data);
      if (n.right !== null)  arr = arr.concat(re(n.right, fn));

      return arr;
    })(root_, fn);
  };
  const preorder = (fn = () => {}) => {
    return (function re(n, fn) {
      if (n === null) return null;
      let arr = [];

      fn(n.data);
      arr.push(n.data);
      if (n.left !== null) arr = arr.concat(re(n.left, fn));
      if (n.right !== null)  arr = arr.concat(re(n.right, fn));

      return arr;
    })(root_, fn);
  };
  const postorder = (fn = () => {}) => {
    return (function re(n, fn) {
      if (n === null) return null;
      let arr = [];

      if (n.left !== null) arr = arr.concat(re(n.left, fn));
      if (n.right !== null)  arr = arr.concat(re(n.right, fn));
      fn(n.data);
      arr.push(n.data);

      return arr;
    })(root_, fn);
  };
  const height = (n = root_) => {
    return (function re(n) {
      if (n === null) return null;
      let h = 0;
      let hL = re(n.left);
      let hR = re(n.right);
      if (hL < hR) {
        if (hR !== null) h += ++hR;
      }
      else {
        if (hL !== null) h += ++hL;
      }
      return h;
    })(n);
  };
  const depth = (n = root_) => {
    return (function re(n, currN) {
      if (n === null) return null;
      let d = 0;
      if (n.data < currN.data) {
        ++d;
        let tmp = re(n, currN.left);
        return tmp !== null ? d += tmp : null;
      }
      if (n.data > currN.data) {
        ++d;
        let tmp = re(n, currN.right);
        return tmp !== null ? d += tmp : null;
      }
      
      return d;
    })(n, root_);
  };
  const isBalanced = (n = root_) => {
    return Math.abs(height(n.left) - height(n.right)) < 1 ? true : false;
  };
  const rebalance = () => {
    buildTree(inorder());
  };

  const init = () => {
    buildTree(arr);
  };
  init();

  return {
    root,
    buildTree,
    insert,
    remove,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance
  }
}

//return {
//  tree
//};