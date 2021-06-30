import "axios";

declare module "axios" {
  interface AxiosResponse {
    fakeData: any;
  }
}
