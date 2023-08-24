import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Form,
  Heading,
  TextField,
  useDialogContainer,
} from '@adobe/react-spectrum';
import { produce } from 'immer';
import { useCallback, useContext, useMemo } from 'react';
import { useSetState } from 'react-use';

import { AppContext } from '@/app/appContext';
import { dummyUsers } from '@/utils';

type FormField<TValue> = {
  readonly value: TValue;
  readonly isValid?: boolean;
  readonly error?: string;
};

type FormData = {
  readonly email: FormField<string>;
  readonly password: FormField<string>;
};

const defaultFormData: FormData = {
  email: {
    value: '',
  },
  password: {
    value: '',
  },
};

export const LoginDialog = (): JSX.Element => {
  const dialogContainer = useDialogContainer();
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useSetState<FormData>(defaultFormData);

  const isFormValid = useMemo(() => {
    return formData.email.value && formData.password.value;
  }, [formData.email, formData.password]);

  const handleLogin = useCallback(() => {
    const dummyUserIndex = dummyUsers.findIndex(({ email }) => email === formData.email.value);
    const isValidEmail = dummyUserIndex > -1;

    setFormData((prevData) =>
      produce(prevData, (draft) => {
        draft.email.isValid = isValidEmail;
        draft.email.error = isValidEmail ? undefined : 'User does not exist';
      })
    );

    if (isValidEmail) {
      setUser(dummyUsers[dummyUserIndex]);
    }

    dialogContainer.dismiss();
  }, [dialogContainer, formData.email.value, setFormData, setUser]);

  return (
    <Dialog width="size-6000">
      <Heading>Sign in</Heading>
      <Divider />

      <Content>
        <Form>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email.value}
            errorMessage={formData.email.error}
            onChange={(value) =>
              setFormData({ email: { value, isValid: undefined, error: undefined } })
            }
            isRequired
            autoFocus
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password.value}
            errorMessage={formData.password.error}
            onChange={(value) =>
              setFormData({ password: { value, isValid: undefined, error: undefined } })
            }
            isRequired
          />
        </Form>
      </Content>

      <ButtonGroup>
        <Button variant="secondary" onPress={() => dialogContainer.dismiss()}>
          Cancel
        </Button>

        <Button variant="accent" isDisabled={!isFormValid} onPress={handleLogin}>
          Log in
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};
