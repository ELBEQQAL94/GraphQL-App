import React, { useState, useContext } from "react";
import { Form, Grid } from "semantic-ui-react";
import { styles } from "../../components/Ui/styles";
import { REGISTER_USER } from "../../components/Ui/gql";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../components/Ui/hooks";
import { AuthContext } from '../../components/context_auth';

// Components
import SubmitButton from "../../components/Ui/SubmitButton";

const Register = props => {
  const context  = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { updateField, submit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [addUser, { loadin }] = useMutation(REGISTER_USER, {
    update: (_, {data: {login: userData}}) => {
      context.login(userData);
      props.history.push("/");
    },
    onError: err => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <>
      <Grid columns={3}>
        <Grid.Column mobile={16}>
          <div>
            <h1 style={styles.mainTitle}>register</h1>
          </div>{" "}
        </Grid.Column>
        <Grid.Column mobile={16}>
          <div style={styles.FormContainer}>
            <Form onSubmit={submit} noValidate style={styles.form}>
              <Form.Input
                type="text"
                label="USERNAME"
                placeholder="Enter username..."
                name="username"
                value={values.username}
                onChange={updateField}
                error={errors.username ? true : false}
              />
              <Form.Input
                type="email"
                label="EMAIL"
                placeholder="Enter email..."
                name="email"
                value={values.email}
                onChange={updateField}
                error={errors.email ? true : false}
              />
              <Form.Input
                type="password"
                label="PASSWORD"
                placeholder="Enter password..."
                name="password"
                value={values.password}
                onChange={updateField}
                error={errors.password ? true : false}
              />
              <Form.Input
                type="password"
                label="CONFIRM PASSWORD"
                placeholder="confirm password..."
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={updateField}
                error={errors.confirmPassword ? true : false}
              />
              <div style={styles.submitButton}>
                <SubmitButton title="Register" style={styles.button} />
              </div>
            </Form>
            {Object.keys(errors).length > 0 && (
              <div className="ui error message">
                <ul className="list">
                  {Object.values(errors).map(err => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Register;
