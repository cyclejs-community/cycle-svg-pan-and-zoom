function Vector ({x, y}) {
  return {
    x,
    y,

    plus (other) {
      return Vector({
        x: x + other.x,
        y: y + other.y
      });
    },

    minus (other) {
      return Vector({
        x: x - other.x,
        y: y - other.y
      });
    },

    times (n) {
      return Vector({
        x: x * n,
        y: y * n
      });
    },

    normalize () {
      const length = Math.abs(x) + Math.abs(y);

      if (length === 0) {
        return Vector({x: 0, y: 0});
      }

      return Vector({
        x: x / length,
        y: y / length
      });
    },

    pythag () {
      return Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    }
  };
}

Vector.zero = Vector({x: 0, y: 0});

export default Vector;
