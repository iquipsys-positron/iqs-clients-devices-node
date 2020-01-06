let _ = require('lodash');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams} from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { IDevicesClientV1 } from './IDevicesClientV1';
import { DeviceV1 } from './DeviceV1';
import { DeviceTypeV1 } from './DeviceTypeV1';
import { DeviceStatusV1 } from './DeviceStatusV1';

export class DevicesMemoryClientV1 implements IDevicesClientV1 {
    private _devices: DeviceV1[] = [];
            
    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: DeviceV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.label, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
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

    public getDevices(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<DeviceV1>) => void): void {
        
        let devices = _.filter(this._devices, this.composeFilter(filter));
        callback(null, new DataPage<DeviceV1>(devices, devices.length));
    }

    public getDeviceById(correlationId: string, deviceId: string, 
        callback: (err: any, device: DeviceV1) => void): void {

        let device = _.find(this._devices, (d) => d.id == deviceId);
        callback(null, device);
    }

    public getDeviceByUdi(correlationId: string, orgId: string, udi: string, 
        callback: (err: any, device: DeviceV1) => void): void {

        let device = _.find(this._devices, (d) => d.org_id == orgId && d.udi == udi);
        callback(null, device);
    }
    
    public getOrCreateDevice(correlationId: string, orgId: string,
        type: string, version: number, udi: string,
        callback: (err: any, device: DeviceV1) => void): void {

        udi = udi ? udi.toLocaleLowerCase() : null;

        let device = <DeviceV1> {
            id: IdGenerator.nextLong(),
            org_id: orgId,
            type: type || DeviceTypeV1.Unknown,
            version: version,
            udi: udi,
            create_time: new Date(),
            status: DeviceStatusV1.Pending
        };

        this._devices.push(device);
        callback(null, device);
    }

    public createDevice(correlationId: string, device: DeviceV1, 
        callback: (err: any, device: DeviceV1) => void): void {

        device.id = device.id || IdGenerator.nextLong();
        device.create_time = new Date();
        device.status = device.status || DeviceStatusV1.Active;
        device.udi = device.udi ? device.udi.toLocaleLowerCase() : null;

        this._devices.push(device);
        callback(null, device);
    }

    public updateDevice(correlationId: string, device: DeviceV1, 
        callback: (err: any, device: DeviceV1) => void): void {

        device.udi = device.udi ? device.udi.toLocaleLowerCase() : null;

        this._devices = _.filter(this._devices, (d) => d.id != device.id);
        this._devices.push(device);
        
        callback(null, device);
    }

    public deleteDeviceById(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {

        let device = _.find(this._devices, (d) => d.id == deviceId);
        if (device) {
            device.deleted = true;
        }
        
        callback(null, device);
    }

    public setObject(correlationId: string, deviceId: string, objectId: string,
        callback: (err: any, device: DeviceV1) => void): void {

        let device = _.find(this._devices, (d) => d.id == deviceId);
        if (device) {
            device.object_id = objectId;
        }
        
        callback(null, device);
    }

    public unsetObject(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {

        let device = _.find(this._devices, (d) => d.id == deviceId);
        if (device) {
            device.object_id = null;
        }
        
        callback(null, device);
    }

}