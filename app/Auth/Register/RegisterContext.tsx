import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify/unstyled';

class RegisterContext {
  public constructor(
    private name: string | undefined,
    private email: string | undefined,
    private password: string | undefined,
    private loading: boolean = false,
  ) {}
  public get Loading() {
    return this.loading;
  }
  public get Name() {
    return this.name;
  }
  public get Email() {
    return this.email;
  }
  public get Password() {
    return this.password;
  }
  public set Name(value: string | undefined) {
    this.name = value;
  }
  public set Email(value: string | undefined) {
    this.email = value;
  }
  public set Password(value: string | undefined) {
    this.password = value;
  }
  public async Register() {
    if (!this.Name || !this.Email || !this.Password) {
      toast.error('信息不完整，无法注册');
      return false;
    }
    await authClient.signUp.email({
      email: this.Email,
      password: this.Password,
      name: this.Name,
    });
  }
}
