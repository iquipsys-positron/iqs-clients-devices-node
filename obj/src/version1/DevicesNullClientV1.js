"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const DeviceTypeV1_1 = require("./DeviceTypeV1");
class DevicesNullClientV1 {
    getDevices(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage([], 0));
    }
    getDeviceById(correlationId, deviceId, callback) {
        callback(null, null);
    }
    getDeviceByUdi(correlationId, orgId, udi, callback) {
        callback(null, null);
    }
    getOrCreateDevice(correlationId, orgId, type, version, udi, callback) {
        let device = {
            id: pip_services3_commons_node_2.IdGenerator.nextLong(),
            org_id: orgId,
            type: type || DeviceTypeV1_1.DeviceTypeV1.Unknown,
            version: version,
            udi: udi,
            create_time: new Date(),
            active: true
        };
        callback(null, device);
    }
    createDevice(correlationId, device, callback) {
        callback(null, device);
    }
    updateDevice(correlationId, device, callback) {
        callback(null, device);
    }
    deleteDeviceById(correlationId, deviceId, callback) {
        callback(null, null);
    }
    setObject(correlationId, deviceId, objectId, callback) {
        callback(null, null);
    }
    unsetObject(correlationId, deviceId, callback) {
        callback(null, null);
    }
}
exports.DevicesNullClientV1 = DevicesNullClientV1;
//# sourceMappingURL=DevicesNullClientV1.js.map