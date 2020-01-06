let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { DevicesMemoryPersistence } from 'iqs-services-devices-node';
import { DevicesController } from 'iqs-services-devices-node';
import { IDevicesClientV1 } from '../../src/version1/IDevicesClientV1';
import { DevicesMemoryClientV1 } from '../../src/version1/DevicesMemoryClientV1';
import { DevicesClientFixtureV1 } from './DevicesClientFixtureV1';

suite('DevicesMemoryClientV1', ()=> {
    let client: DevicesMemoryClientV1;
    let fixture: DevicesClientFixtureV1;

    suiteSetup((done) => {
        client = new DevicesMemoryClientV1();
        fixture = new DevicesClientFixtureV1(client);

        done();
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
