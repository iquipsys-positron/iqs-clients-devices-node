import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { DevicesNullClientV1 } from '../version1/DevicesNullClientV1';
import { DevicesMemoryClientV1 } from '../version1/DevicesMemoryClientV1';
import { DevicesDirectClientV1 } from '../version1/DevicesDirectClientV1';
import { DevicesHttpClientV1 } from '../version1/DevicesHttpClientV1';
import { DevicesLambdaClientV1 } from '../version1/DevicesLambdaClientV1';

export class DevicesClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('iqs-services-devices', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('iqs-services-devices', 'client', 'null', 'default', '1.0');
	public static MemoryClientV1Descriptor = new Descriptor('iqs-services-devices', 'client', 'memory', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('iqs-services-devices', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('iqs-services-devices', 'client', 'http', 'default', '1.0');
	public static LambdaClientV1Descriptor = new Descriptor('iqs-services-devices', 'client', 'lambda', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(DevicesClientFactory.NullClientV1Descriptor, DevicesNullClientV1);
		this.registerAsType(DevicesClientFactory.MemoryClientV1Descriptor, DevicesMemoryClientV1);
		this.registerAsType(DevicesClientFactory.DirectClientV1Descriptor, DevicesDirectClientV1);
		this.registerAsType(DevicesClientFactory.HttpClientV1Descriptor, DevicesHttpClientV1);
		this.registerAsType(DevicesClientFactory.LambdaClientV1Descriptor, DevicesLambdaClientV1);
	}
	
}
