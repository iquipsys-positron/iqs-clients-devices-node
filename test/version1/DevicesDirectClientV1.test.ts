let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { OrganizationsNullClientV1 } from 'pip-clients-organizations-node';

import { DevicesMemoryPersistence } from 'iqs-services-devices-node';
import { DevicesController } from 'iqs-services-devices-node';
import { IDevicesClientV1 } from '../../src/version1/IDevicesClientV1';
import { DevicesDirectClientV1 } from '../../src/version1/DevicesDirectClientV1';
import { DevicesClientFixtureV1 } from './DevicesClientFixtureV1';

suite('DevicesDirectClientV1', ()=> {
    let client: DevicesDirectClientV1;
    let fixture: DevicesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new DevicesMemoryPersistence();
        let controller = new DevicesController();
        let organizationsClient = new OrganizationsNullClientV1();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-organizations', 'client', 'null', 'default', '1.0'), organizationsClient,
            new Descriptor('iqs-services-devices', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-devices', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new DevicesDirectClientV1();
        client.setReferences(references);

        fixture = new DevicesClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
