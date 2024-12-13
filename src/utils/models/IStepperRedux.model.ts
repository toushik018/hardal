import { ILocalStepData } from "./ILocalStepData.model";

export interface IStepperReduxModel {
  currentStep: number;
  disabled: boolean;
  steps: ILocalStepData[];
  nextStepData: ILocalStepData;
  beforeStepData: ILocalStepData;
  currentStepData: ILocalStepData;
}
