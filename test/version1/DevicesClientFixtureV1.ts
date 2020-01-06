let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { PagingParams } from 'pip-services3-commons-node';

import { DeviceV1 } from '../../src/version1/DeviceV1';
import { DeviceTypeV1 } from '../../src/version1/DeviceTypeV1';
import { IDevicesClientV1 } from '../../src/version1/IDevicesClientV1';

let DEVICE1: DeviceV1 = {
    id: '1',
    org_id: '1',
    type: 'smartphone',
    udi: '111',
    label: '3456',
    status: 'active',
    object_id: '1'
};
let DEVICE2: DeviceV1 = {
    id: '2',
    org_id: '1',
    type: 'smartphone',
    udi: '222',
    label: '2334',
    status: 'active',
    object_id: '1'
};

export class DevicesClientFixtureV1 {
    private _client: IDevicesClientV1;
    
    constructor(client: IDevicesClientV1) {
        this._client = client;
    }
        
    public testCrudOperations(done) {
        let device1, device2;

        async.series([
        // Create one device
            (callback) => {
                this._client.createDevice(
                    null,
                    DEVICE1,
                    (err, device) => {
                        assert.isNull(err);

                        assert.isObject(device);
                        assert.equal(device.org_id, DEVICE1.org_id);
                        assert.equal(device.type, DEVICE1.type);
                        assert.equal(device.label, DEVICE1.label);

                        device1 = device;

                        callback();
                    }
                );
            },
        // Create another device
            (callback) => {
                this._client.createDevice(
                    null,
                    DEVICE2,
                    (err, device) => {
                        assert.isNull(err);

                        assert.isObject(device);
                        assert.equal(device.org_id, DEVICE2.org_id);
                        assert.equal(device.type, DEVICE2.type);
                        assert.equal(device.label, DEVICE2.label);

                        device2 = device;

                        callback();
                    }
                );
            },
        // Get all devices
            (callback) => {
                this._client.getDevices(
                    null,
                    null,
                    new PagingParams(0,5,false),
                    (err, devices) => {
                        assert.isNull(err);

                        assert.isObject(devices);
                        assert.isTrue(devices.data.length >= 2);

                        callback();
                    }
                );
            },
        // Get device by udi
            (callback) => {
                this._client.getDeviceByUdi(
                    null,
                    device1.org_id,
                    device1.udi,
                    (err, device) => {
                        assert.isNull(err);
                        
                        assert.isNotNull(device);
                        assert.equal(device.id, device1.id);

                        callback();
                    }
                );
            },
        // Update the device
            (callback) => {
                device1.label = 'Updated device 1';

                this._client.updateDevice(
                    null,
                    device1,
                    (err, device) => {
                        assert.isNull(err);

                        assert.isObject(device);
                        assert.equal(device.label, 'Updated device 1');
                        assert.equal(device.id, device1.id);

                        device1 = device;

                        callback();
                    }
                );
            },
        // Set object to device
            (callback) => {
                this._client.setObject(
                    null, device1.id, '5',
                    (err, device) => {
                        assert.isNull(err);

                        assert.isObject(device);
                        assert.equal(device.object_id, '5');
                        assert.equal(device.id, device1.id);

                        device1 = device;

                        callback();
                    }
                );
            },
        // Unset object from device
            (callback) => {
                this._client.unsetObject(
                    null, device1.id,
                    (err, device) => {
                        assert.isNull(err);

                        assert.isObject(device);
                        assert.isNull(device.object_id);
                        assert.equal(device.id, device1.id);

                        device1 = device;

                        callback();
                    }
                );
            },
        // Delete device
            (callback) => {
                this._client.deleteDeviceById(
                    null,
                    device1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete device
            (callback) => {
                this._client.getDeviceById(
                    null,
                    device1.id,
                    (err, device) => {
                        assert.isNull(err);
                        
                        assert.isNotNull(device);
                        assert.isTrue(device.deleted);

                        callback();
                    }
                );
            },
            (callback) => {
                this._client.getOrCreateDevice(
                    null, '1', DeviceTypeV1.Simulated, 1, 'ABC',
                    (err, device) => {
                        assert.isNull(err);
                        
                        assert.isNotNull(device);
                        assert.equal('1', device.org_id);
                        assert.equal('abc', device.udi);

                        callback();
                    }
                )
            }
        ], done);
    }
}
