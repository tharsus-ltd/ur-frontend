export function pannable(node) {
  let x;

  function handleMousedown(event) {
    x = event.clientX;

    node.dispatchEvent(
      new CustomEvent("panstart", {
        detail: { x },
      })
    );

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
  }

  function handleMousemove(event) {
    const dx = event.clientX - x;
    x = event.clientX;

    node.dispatchEvent(
      new CustomEvent("panmove", {
        detail: { x, dx },
      })
    );
  }

  function handleMouseup(event) {
    x = event.clientX;

    node.dispatchEvent(
      new CustomEvent("panend", {
        detail: { x },
      })
    );

    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
  }

  node.addEventListener("mousedown", handleMousedown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
    },
  };
}
