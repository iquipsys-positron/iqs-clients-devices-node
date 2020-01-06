"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class DevicesDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("iqs-services-devices", "controller", "*", "*", "*"));
    }
    getDevices(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'devices.get_devices');
        this._controller.getDevices(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
    getDeviceById(correlationId, deviceId, callback) {
        let timing = this.instrument(correlationId, 'devices.get_device_by_id');
        this._controller.getDeviceById(correlationId, deviceId, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
    getDeviceByUdi(correlationId, orgId, udi, callback) {
        let timing = this.instrument(correlationId, 'devices.get_device_by_udi');
        this._controller.getDeviceByUdi(correlationId, orgId, udi, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
    getOrCreateDevice(correlationId, orgId, type, version, udi, callback) {
        let timing = this.instrument(correlationId, 'devices.get_or_create_device');
        this._controller.getOrCreateDevice(correlationId, orgId, type, version, udi, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
    createDevice(correlationId, device, callback) {
        let timing = this.instrument(correlationId, 'devices.create_device');
        this._controller.createDevice(correlationId, device, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
    updateDevice(correlationId, device, callback) {
        let timing = this.instrument(correlationId, 'devices.update_device');
        this._controller.updateDevice(correlationId, device, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
    deleteDeviceById(correlationId, deviceId, callback) {
        let timing = this.instrument(correlationId, 'devices.delete_device_by_id');
        this._controller.deleteDeviceById(correlationId, deviceId, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
    setObject(correlationId, deviceId, objectId, callback) {
        let timing = this.instrument(correlationId, 'devices.set_object');
        this._controller.setObject(correlationId, deviceId, objectId, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
    unsetObject(correlationId, deviceId, callback) {
        let timing = this.instrument(correlationId, 'devices.unset_object');
        this._controller.unsetObject(correlationId, deviceId, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
}
exports.DevicesDirectClientV1 = DevicesDirectClientV1;
//# sourceMappingURL=DevicesDirectClientV1.js.map