
import { Base3D } from "../Common/Base3D";

export type ForEach = {
  (currentValuemm: any, index?: number, array?: []): void;
};

export type Traverse = {
  (base: Base3D): void;
};
