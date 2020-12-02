module.exports = class SpaceNode {
    constructor(data) {
      this.name = data.spaceName;
      this.area = parseFloat(data.area);
      this.level = parseInt(data.level);
      this.contains = [];
      this.nextElement = null;
    }
  }
