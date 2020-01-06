"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const DevicesNullClientV1_1 = require("../version1/DevicesNullClientV1");
const DevicesMemoryClientV1_1 = require("../version1/DevicesMemoryClientV1");
const DevicesDirectClientV1_1 = require("../version1/DevicesDirectClientV1");
const DevicesHttpClientV1_1 = require("../version1/DevicesHttpClientV1");
const DevicesLambdaClientV1_1 = require("../version1/DevicesLambdaClientV1");
class DevicesClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(DevicesClientFactory.NullClientV1Descriptor, DevicesNullClientV1_1.DevicesNullClientV1);
        this.registerAsType(DevicesClientFactory.MemoryClientV1Descriptor, DevicesMemoryClientV1_1.DevicesMemoryClientV1);
        this.registerAsType(DevicesClientFactory.DirectClientV1Descriptor, DevicesDirectClientV1_1.DevicesDirectClientV1);
        this.registerAsType(DevicesClientFactory.HttpClientV1Descriptor, DevicesHttpClientV1_1.DevicesHttpClientV1);
        this.registerAsType(DevicesClientFactory.LambdaClientV1Descriptor, DevicesLambdaClientV1_1.DevicesLambdaClientV1);
    }
}
exports.DevicesClientFactory = DevicesClientFactory;
DevicesClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-devices', 'factory', 'default', 'default', '1.0');
DevicesClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-devices', 'client', 'null', 'default', '1.0');
DevicesClientFactory.MemoryClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-devices', 'client', 'memory', 'default', '1.0');
DevicesClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-devices', 'client', 'direct', 'default', '1.0');
DevicesClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-devices', 'client', 'http', 'default', '1.0');
DevicesClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('iqs-services-devices', 'client', 'lambda', 'default', '1.0');
//# sourceMappingURL=DevicesClientFactory.js.map