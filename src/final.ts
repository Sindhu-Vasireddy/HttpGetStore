import { ComponentsManager } from 'componentsjs';
import { ResourceIdentifier } from "@solid/community-server";
import { HttpGetStore } from './HttpGetStore';
import * as path from 'path';
const account = async () => {
  const manager = await ComponentsManager.build({
    mainModulePath: path.join(__dirname,"../"), // Path to your npm package's root
  });
  await manager.configRegistry.register('config.jsonld');
  const myInstance = await manager.instantiate<HttpGetStore>('urn:httpgetstore:myInstance');

};
account();


