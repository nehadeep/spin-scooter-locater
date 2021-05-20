import {GeoJson} from "./map";

export interface IFeature {
    status: string;
    id: number;
}
export interface IError {
  error: boolean;
}

export interface ILoading {
    loading: boolean;

}
export interface IMapSelected extends IError{
    selectedMap(values: any) : void
}

