export const Step = {
  UserName: 0,
  Loading: 1,
  ChooseMethod: 2,
  SignUp: 3,
};
export type EStep = (typeof Step)[keyof typeof Step];
