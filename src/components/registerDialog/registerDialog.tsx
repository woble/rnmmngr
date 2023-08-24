import {
  Button,
  ButtonGroup,
  Content,
  ContextualHelp,
  Dialog,
  Divider,
  Form,
  Heading,
  InlineAlert,
  Text,
  TextField,
  useDialogContainer,
} from '@adobe/react-spectrum';

export const RegisterDialog = (): JSX.Element => {
  const dialogContainer = useDialogContainer();

  return (
    <Dialog>
      <Heading>Register new account</Heading>
      <Divider />

      <Content>
        <InlineAlert variant="notice" width="100%">
          <Heading>Registering unavaiable</Heading>

          <Content>
            Due to technical issues it is currently not possiblet to register new accounts.
          </Content>
        </InlineAlert>

        <Form isDisabled isHidden>
          <TextField label="Email" type="email" isRequired autoFocus />

          <TextField
            label="Password"
            type="password"
            isRequired
            contextualHelp={
              <ContextualHelp>
                <Heading>Password</Heading>

                <Content>
                  <Text>This is some help regarding the password</Text>
                </Content>
              </ContextualHelp>
            }
          />

          <TextField label="Display name" />
        </Form>
      </Content>

      <ButtonGroup>
        <Button variant="secondary" onPress={() => dialogContainer.dismiss()}>
          Cancel
        </Button>

        <Button variant="accent" isDisabled onPress={() => dialogContainer.dismiss()}>
          Register
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};
