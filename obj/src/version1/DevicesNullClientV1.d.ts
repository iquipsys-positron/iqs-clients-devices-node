import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IDevicesClientV1 } from './IDevicesClientV1';
import { DeviceV1 } from './DeviceV1';
export declare class DevicesNullClientV1 implements IDevicesClientV1 {
    getDevices(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<DeviceV1>) => void): void;
    getDeviceById(correlationId: string, deviceId: string, callback: (err: any, device: DeviceV1) => void): void;
    getDeviceByUdi(correlationId: string, orgId: string, udi: string, callback: (err: any, device: DeviceV1) => void): void;
    getOrCreateDevice(correlationId: string, orgId: string, type: string, version: number, udi: string, callback: (err: any, device: DeviceV1) => void): void;
    createDevice(correlationId: string, device: DeviceV1, callback: (err: any, device: DeviceV1) => void): void;
    updateDevice(correlationId: string, device: DeviceV1, callback: (err: any, device: DeviceV1) => void): void;
    deleteDeviceById(correlationId: string, deviceId: string, callback: (err: any, device: DeviceV1) => void): void;
    setObject(correlationId: string, deviceId: string, objectId: string, callback: (err: any, device: DeviceV1) => void): void;
    unsetObject(correlationId: string, deviceId: string, callback: (err: any, device: DeviceV1) => void): void;
}
