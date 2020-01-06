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

export class DevicesNullClientV1 implements IDevicesClientV1 {
            
    public getDevices(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<DeviceV1>) => void): void {
        callback(null, new DataPage<DeviceV1>([], 0));
    }

    public getDeviceById(correlationId: string, deviceId: string, 
        callback: (err: any, device: DeviceV1) => void): void {
        callback(null, null);
    }

    public getDeviceByUdi(correlationId: string, orgId: string, udi: string,
        callback: (err: any, device: DeviceV1) => void): void {
        callback(null, null);
    }
    
    public getOrCreateDevice(correlationId: string, orgId: string,
        type: string, version: number, udi: string,
        callback: (err: any, device: DeviceV1) => void): void {
        let device = <DeviceV1> {
            id: IdGenerator.nextLong(),
            org_id: orgId,
            type: type || DeviceTypeV1.Unknown,
            version: version,
            udi: udi,
            create_time: new Date(),
            active: true
        };
        callback(null, device);
    }

    public createDevice(correlationId: string, device: DeviceV1, 
        callback: (err: any, device: DeviceV1) => void): void {
        callback(null, device);
    }

    public updateDevice(correlationId: string, device: DeviceV1, 
        callback: (err: any, device: DeviceV1) => void): void {
        callback(null, device);
    }

    public deleteDeviceById(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        callback(null, null);
    }

    public setObject(correlationId: string, deviceId: string, objectId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        callback(null, null);
    }

    public unsetObject(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        callback(null, null);
    }

}