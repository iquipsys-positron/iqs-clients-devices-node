"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
class DevicesLambdaClientV1 extends pip_services3_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('devices');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getDevices(correlationId, filter, paging, callback) {
        this.callCommand('get_devices', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getDeviceById(correlationId, deviceId, callback) {
        this.callCommand('get_device_by_id', correlationId, {
            device_id: deviceId
        }, callback);
    }
    getDeviceByUdi(correlationId, orgId, udi, callback) {
        this.callCommand('get_device_by_udi', correlationId, {
            org_id: orgId,
            udi: udi
        }, callback);
    }
    getOrCreateDevice(correlationId, orgId, type, version, udi, callback) {
        this.callCommand('get_or_create_device', correlationId, {
            org_id: orgId,
            type: type,
            version: version,
            udi: udi
        }, callback);
    }
    createDevice(correlationId, device, callback) {
        this.callCommand('create_device', correlationId, {
            device: device
        }, callback);
    }
    updateDevice(correlationId, device, callback) {
        this.callCommand('update_device', correlationId, {
            device: device
        }, callback);
    }
    deleteDeviceById(correlationId, deviceId, callback) {
        this.callCommand('delete_device_by_id', correlationId, {
            device_id: deviceId
        }, callback);
    }
    setObject(correlationId, deviceId, objectId, callback) {
        this.callCommand('set_object', correlationId, {
            device_id: deviceId,
            object_id: objectId
        }, callback);
    }
    unsetObject(correlationId, deviceId, callback) {
        this.callCommand('unset_object', correlationId, {
            device_id: deviceId
        }, callback);
    }
}
exports.DevicesLambdaClientV1 = DevicesLambdaClientV1;
//# sourceMappingURL=DevicesLambdaClientV1.js.map