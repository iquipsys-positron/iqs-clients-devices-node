let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { OrganizationsNullClientV1 } from 'pip-clients-organizations-node';

import { DevicesMemoryPersistence } from 'iqs-services-devices-node';
import { DevicesController } from 'iqs-services-devices-node';
import { DevicesHttpServiceV1 } from 'iqs-services-devices-node';
import { IDevicesClientV1 } from '../../src/version1/IDevicesClientV1';
import { DevicesHttpClientV1 } from '../../src/version1/DevicesHttpClientV1';
import { DevicesClientFixtureV1 } from './DevicesClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('DevicesRestClientV1', ()=> {
    let service: DevicesHttpServiceV1;
    let client: DevicesHttpClientV1;
    let fixture: DevicesClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new DevicesMemoryPersistence();
        let controller = new DevicesController();
        let organizationsClient = new OrganizationsNullClientV1();

        service = new DevicesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-organizations', 'client', 'null', 'default', '1.0'), organizationsClient,
            new Descriptor('iqs-services-devices', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-devices', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-devices', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new DevicesHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new DevicesClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
