import { alpha, Button, Container, Slide, useTheme } from '@mui/material';
import { useRef, useReducer } from 'react';
import {
  Step,
  type ActionType,
  type RegisterProps,
  type StateType,
} from './types';
import { Loading } from '../Share/loading';
import { RegisterNewUser } from './RegisterNewUser';
import { SwitchTransition } from 'react-transition-group';
import { toast } from 'react-toastify/unstyled';
import { authClient } from '@/lib/auth-client';
import { useInit } from '~/Hook/useInit';
import { Add2FAOrPasskey } from './Add2FAOrPasskey';
import { Env } from '@/lib/Env';

const registerFlowReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'set-email':
      return { ...state, email: action.payload };
    case 'set-name':
      return { ...state, name: action.payload };
    case 'set-password':
      return { ...state, password: action.payload };
    case 'register':
      return { ...state, loading: true };
    case 'register-finish':
      return { ...state, loading: false };
    case 'change-step':
      return { ...state, step: action.payload, loading: false };
    case 'test-loading':
      return { ...state, loading: !state.loading };
  }
};

export const Register = (prop: RegisterProps) => {
  const theme = useTheme();
  const [state, reducer] = useReducer(registerFlowReducer, {
    email: '',
    name: '',
    password: '',
    loading: false,
    step: Step.RegisterNewUser,
  });
  const containerRef = useRef(null);
  console.log(Env);
  const handleRegister = async () => {
    if (!state.name || !state.email || !state.password) {
      toast.error('信息不完整，无法注册');
      return false;
    }
    reducer({ type: 'register' });
    try {
      const result = await authClient.signUp.email({
        email: state.email,
        password: state.password,
        name: state.name,
      });
      if (result.error === null)
        reducer({ type: 'change-step', payload: Step.Add2FAOrPasskey });
    } finally {
      reducer({ type: 'register-finish' });
    }
  };
  const step = (() => {
    if (state.loading) return <Loading />;
    switch (state.step) {
      case Step.RegisterNewUser:
        return (
          <RegisterNewUser
            state={state}
            reducer={reducer}
            onRegister={handleRegister}
            {...prop}
          />
        );
      case Step.Add2FAOrPasskey:
        return <Add2FAOrPasskey state={state} />;
      default:
        return <p>Error</p>;
    }
  })();
  useInit(() => {
    if (prop.hasEmail) {
      reducer({ type: 'set-email', payload: prop.email });
    }
  });
  return (
    <Container
      component="main"
      maxWidth={state.step === Step.RegisterNewUser ? 'xs' : 'sm'}
      sx={{
        border: '1px solid',
        borderColor: alpha(theme.palette.grey[400], 0.4),
        p: 8,
        borderRadius: 1,
        boxShadow: theme.shadows[4],
        transition: theme.transitions.create('max-width', {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
      }}
      ref={containerRef}
    >
      <SwitchTransition>
        <Slide
          direction="right"
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
          key={0}
          appear={false}
        >
          {step}
        </Slide>
      </SwitchTransition>
      <Button
        style={{ position: 'fixed', top: 0, left: 0 }}
        onClick={() => {
          if (state.step === Step.RegisterNewUser) {
            reducer({ type: 'test-loading' });
            setTimeout(() => {
              reducer({ type: 'change-step', payload: Step.Add2FAOrPasskey });
            }, 1000);
          } else {
            reducer({ type: 'test-loading' });
            setTimeout(() => {
              reducer({ type: 'change-step', payload: Step.RegisterNewUser });
            }, 1000);
          }
        }}
      >
        OK
      </Button>
    </Container>
  );
};
