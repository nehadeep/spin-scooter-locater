
export interface IError {
  error: boolean;
}

export interface ILoading {
    loading: boolean;

}
export interface IMapSelected extends IError{
    selectedMap(values: any) : void
}

export enum Colors {
    Available="#00FF00",
    Rented = "#3354FF",
    Not_Available = "#ff0000"
}
