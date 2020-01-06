import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { IDevicesClientV1 } from './IDevicesClientV1';
//import { IDevicesController } from 'iqs-services-devices-node';
import { DeviceV1 } from './DeviceV1';

export class DevicesDirectClientV1 extends DirectClient<any> implements IDevicesClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("iqs-services-devices", "controller", "*", "*", "*"))
    }

    public getDevices(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<DeviceV1>) => void): void {
        let timing = this.instrument(correlationId, 'devices.get_devices');
        this._controller.getDevices(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }

    public getDeviceById(correlationId: string, deviceId: string, 
        callback: (err: any, device: DeviceV1) => void): void {
        let timing = this.instrument(correlationId, 'devices.get_device_by_id');
        this._controller.getDeviceById(correlationId, deviceId, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }

    public getDeviceByUdi(correlationId: string, orgId: string, udi: string,
        callback: (err: any, device: DeviceV1) => void): void {
        let timing = this.instrument(correlationId, 'devices.get_device_by_udi');
        this._controller.getDeviceByUdi(correlationId, orgId, udi, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }
    
    public getOrCreateDevice(correlationId: string, orgId: string,
        type: string, version: number, udi: string,
        callback: (err: any, device: DeviceV1) => void): void {
        let timing = this.instrument(correlationId, 'devices.get_or_create_device');
        this._controller.getOrCreateDevice(correlationId, orgId, type, version, udi, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }

    public createDevice(correlationId: string, device: DeviceV1, 
        callback: (err: any, device: DeviceV1) => void): void {
        let timing = this.instrument(correlationId, 'devices.create_device');
        this._controller.createDevice(correlationId, device, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }

    public updateDevice(correlationId: string, device: DeviceV1, 
        callback: (err: any, device: DeviceV1) => void): void {
        let timing = this.instrument(correlationId, 'devices.update_device');
        this._controller.updateDevice(correlationId, device, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }

    public deleteDeviceById(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        let timing = this.instrument(correlationId, 'devices.delete_device_by_id');
        this._controller.deleteDeviceById(correlationId, deviceId, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }

    public setObject(correlationId: string, deviceId: string, objectId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        let timing = this.instrument(correlationId, 'devices.set_object');
        this._controller.setObject(correlationId, deviceId, objectId, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }

    public unsetObject(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        let timing = this.instrument(correlationId, 'devices.unset_object');
        this._controller.unsetObject(correlationId, deviceId, (err, device) => {
            timing.endTiming();
            callback(err, device);
        });
    }

}