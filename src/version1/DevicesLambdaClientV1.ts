let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';

import { DeviceV1 } from './DeviceV1';
import { IDevicesClientV1 } from './IDevicesClientV1';

export class DevicesLambdaClientV1 extends CommandableLambdaClient implements IDevicesClientV1 {       

    constructor(config?: any) {
        super('devices');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
                
    public getDevices(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<DeviceV1>) => void): void {
        this.callCommand( 
            'get_devices', 
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public getDeviceById(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        this.callCommand( 
            'get_device_by_id',
            correlationId,
            {
                device_id: deviceId
            }, 
            callback
        );        
    }

    public getDeviceByUdi(correlationId: string, orgId: string, udi: string,
        callback: (err: any, device: DeviceV1) => void): void {
        this.callCommand( 
            'get_device_by_udi',
            correlationId,
            {
                org_id: orgId,
                udi: udi
            }, 
            callback
        );        
    }
    
    public getOrCreateDevice(correlationId: string, orgId: string,
        type: string, version: number, udi: string,
        callback: (err: any, device: DeviceV1) => void): void {
        this.callCommand( 
            'get_or_create_device',
            correlationId,
            {
                org_id: orgId,
                type: type,
                version: version,
                udi: udi
            }, 
            callback
        );        
    }

    public createDevice(correlationId: string, device: DeviceV1,
        callback: (err: any, device: DeviceV1) => void): void {
        this.callCommand(
            'create_device',
            correlationId,
            {
                device: device
            }, 
            callback
        );
    }

    public updateDevice(correlationId: string, device: DeviceV1,
        callback: (err: any, device: DeviceV1) => void): void {
        this.callCommand(
            'update_device', 
            correlationId,
            {
                device: device
            }, 
            callback
        );
    }

    public deleteDeviceById(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        this.callCommand(
            'delete_device_by_id', 
            correlationId,
            {
                device_id: deviceId
            }, 
            callback
        );
    }

    public setObject(correlationId: string, deviceId: string, objectId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        this.callCommand(
            'set_object', 
            correlationId,
            {
                device_id: deviceId,
                object_id: objectId
            }, 
            callback
        );
    }

    public unsetObject(correlationId: string, deviceId: string,
        callback: (err: any, device: DeviceV1) => void): void {
        this.callCommand(
            'unset_object', 
            correlationId,
            {
                device_id: deviceId
            }, 
            callback
        );
    }

}
