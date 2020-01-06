"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const DeviceTypeV1_1 = require("./DeviceTypeV1");
const DeviceStatusV1_1 = require("./DeviceStatusV1");
class DevicesMemoryClientV1 {
    constructor() {
        this._devices = [];
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.label, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let org_id = filter.getAsNullableString('org_id');
        let udi = filter.getAsNullableString('udi');
        let label = filter.getAsNullableString('label');
        let object_id = filter.getAsNullableString('object_id');
        let status = filter.getAsNullableString('status');
        let statuses = filter.getAsObject('statuses');
        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        // Process statuses filter
        if (_.isString(statuses))
            statuses = statuses.split(',');
        if (!_.isArray(statuses))
            statuses = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (org_id && item.org_id != org_id)
                return false;
            if (object_id && item.object_id != object_id)
                return false;
            if (label && item.label != label)
                return false;
            if (udi && item.udi != udi)
                return false;
            if (status && item.status != status)
                return false;
            if (statuses && _.indexOf(statuses, item.status) < 0)
                return false;
            if (!deleted && item.deleted)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getDevices(correlationId, filter, paging, callback) {
        let devices = _.filter(this._devices, this.composeFilter(filter));
        callback(null, new pip_services3_commons_node_2.DataPage(devices, devices.length));
    }
    getDeviceById(correlationId, deviceId, callback) {
        let device = _.find(this._devices, (d) => d.id == deviceId);
        callback(null, device);
    }
    getDeviceByUdi(correlationId, orgId, udi, callback) {
        let device = _.find(this._devices, (d) => d.org_id == orgId && d.udi == udi);
        callback(null, device);
    }
    getOrCreateDevice(correlationId, orgId, type, version, udi, callback) {
        udi = udi ? udi.toLocaleLowerCase() : null;
        let device = {
            id: pip_services3_commons_node_3.IdGenerator.nextLong(),
            org_id: orgId,
            type: type || DeviceTypeV1_1.DeviceTypeV1.Unknown,
            version: version,
            udi: udi,
            create_time: new Date(),
            status: DeviceStatusV1_1.DeviceStatusV1.Pending
        };
        this._devices.push(device);
        callback(null, device);
    }
    createDevice(correlationId, device, callback) {
        device.id = device.id || pip_services3_commons_node_3.IdGenerator.nextLong();
        device.create_time = new Date();
        device.status = device.status || DeviceStatusV1_1.DeviceStatusV1.Active;
        device.udi = device.udi ? device.udi.toLocaleLowerCase() : null;
        this._devices.push(device);
        callback(null, device);
    }
    updateDevice(correlationId, device, callback) {
        device.udi = device.udi ? device.udi.toLocaleLowerCase() : null;
        this._devices = _.filter(this._devices, (d) => d.id != device.id);
        this._devices.push(device);
        callback(null, device);
    }
    deleteDeviceById(correlationId, deviceId, callback) {
        let device = _.find(this._devices, (d) => d.id == deviceId);
        if (device) {
            device.deleted = true;
        }
        callback(null, device);
    }
    setObject(correlationId, deviceId, objectId, callback) {
        let device = _.find(this._devices, (d) => d.id == deviceId);
        if (device) {
            device.object_id = objectId;
        }
        callback(null, device);
    }
    unsetObject(correlationId, deviceId, callback) {
        let device = _.find(this._devices, (d) => d.id == deviceId);
        if (device) {
            device.object_id = null;
        }
        callback(null, device);
    }
}
exports.DevicesMemoryClientV1 = DevicesMemoryClientV1;
//# sourceMappingURL=DevicesMemoryClientV1.js.map