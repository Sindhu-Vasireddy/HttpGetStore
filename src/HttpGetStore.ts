import {
  BaseResourceStore,
  BasicRepresentation,
  Representation,
  ResourceIdentifier,
} from "@solid/community-server";
import fetch from "node-fetch";
//import { RepresentationPreferences } from "@solid/community-server/dist/ldp/representation/RepresentationPreferences";
const parseContentType = require("content-type").parse;

class resource implements ResourceIdentifier {
  path:string;
  constructor(path:string){
    this.path=path;
  }
}


/**
 * Fetches the resource at an URL
 */
export class HttpGetStore extends BaseResourceStore {
  private readonly url: string[];
  private current_resourceID: resource;
  resource:Array<BasicRepresentation>=[]; 

  public constructor(options: { url: string[] }) {
    super();
    this.url = options.url;
    console.log(this.url[1]);
    this.current_resourceID= new resource(options.url[0]);
    this.url.forEach(async (u)=>{this.current_resourceID.path=u; this.resource.push(await this.getRepresentation(this.current_resourceID));console.log(this.resource);});
    
  }

  /**
   * Retrieves a JSON representation of events in the calender.
   */

  public async getRepresentation(
    identifier: ResourceIdentifier
    // preferences: RepresentationPreferences
  ): Promise<Representation> {
    const response = await fetch(identifier.path);
    // console.log(identifier.path);
    const text = await response.text();
    let contentType = response.headers.get("content-type") || "text/plain";
    contentType = parseContentType(contentType).type;
    return new BasicRepresentation(text, identifier, contentType);
  }

}



