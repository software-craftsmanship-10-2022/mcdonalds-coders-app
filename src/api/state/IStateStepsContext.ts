export interface IStateStepsContext {
  nextStep(): void;
  cancelByUser(): void;
  cancelByRestaurant(): void;
  reject(): void;
}
