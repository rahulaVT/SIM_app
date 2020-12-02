module.exports = class DeviceNode {
    constructor(data) {
      this.name = data.deviceName;
      this.type = data.type;
      this.placement = data.placement;
      this.networks = data.networks;
      this.visibility = data.visibility;
      this.nextElement = null;
    }
  }
