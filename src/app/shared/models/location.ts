export class Location {
  constructor(
    public name: string,
    public city: string,
    public postalCode?: number,
    public address?: string,
    public lat?: number,
    public lng?: number,
  ) { }
}

export class Position {
  constructor(
    public lat?: number,
    public lng?: number,
  ) { }
}

// HERE DEVELOPPER API
export interface Suggestion {
  label: string;
  language: string;
  countryCode: string;
  locationId: string;
  address: Address;
  matchLevel: string;
}

export interface LocationDetailsResponse {
  metaInfo: MetaInfo;
  view: View[];
}

export interface MetaInfo {
  timestamp: string;
}

export interface View {
  result: LocationDetailsResult[];
  viewId: number;
}

export interface LocationDetailsResult {
  relevance: number;
  matchLevel: string;
  matchType: string;
  location: LocationDetails;
}

export interface LocationDetails {
  locationId: string;
  locationType: string;
  displayPosition: DisplayPosition;
  navigationPosition: DisplayPosition[];
  mapView: MapView;
  address: Address;
}

export interface Address {
  country: string;
  state: string;
  county: string;
  city: string;
  district: string;
  street: string;
  houseNumber?: string;
  postalCode?: string;
  label?: string;
  additionalData?: AdditionalDatum[]
}

export interface AdditionalDatum {
  value: string;
  key: string;
}

export interface DisplayPosition {
  latitude: number;
  longitude: number;
}

export interface MapView {
  topLeft: DisplayPosition;
  bottomRight: DisplayPosition;
}

