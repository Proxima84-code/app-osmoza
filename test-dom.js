// test-dom.js - tylko logika JS, bez DOM
const parentNode = { children: [] };
const referenceNode = { parentNode: parentNode };
const newNode = { name: "Nowy węzeł" };

// Symulacja insertBefore
if (referenceNode.parentNode === parentNode) {
  const index = parentNode.children.indexOf(referenceNode);
  if (index !== -1) {
    parentNode.children.splice(index, 0, newNode);
  } else {
    parentNode.children.push(newNode); // fallback
  }
} else {
  parentNode.children.push(newNode); // fallback
}

console.log(parentNode.children);
