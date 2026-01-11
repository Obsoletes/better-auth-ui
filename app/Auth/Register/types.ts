export type RegisterProps =
  | {
      readonly email: string;
      readonly hasEmail: true;
    }
  | {
      readonly hasEmail: false;
      readonly email?: undefined;
    };
export const Step = {
  RegisterNewUser: 0,
  Add2FAOrPasskey: 1,
} as const;
export type EStep = (typeof Step)[keyof typeof Step];
type StateType = {
  email: string;
  name: string;
  password: string;
  loading: boolean;
  step: EStep;
};
type ActionType =
  | { type: 'set-email'; payload: string }
  | { type: 'set-name'; payload: string }
  | { type: 'set-password'; payload: string }
  | { type: 'change-step'; payload: EStep }
  | { type: 'register' }
  | { type: 'register-finish' }
  | { type: 'test-loading' };
export type { StateType, ActionType };
