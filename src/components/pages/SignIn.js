import withRoot from '../material-ui-modules/withRoot';
// --- Post bootstrap -----
import React, {useState} from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import Typography from '../material-ui-modules/components/Typography';
import AppAppBar from '../material-ui-modules/views/AppAppBar';
import AppForm from '../material-ui-modules/views/AppForm';
// import { email, required } from '../material-ui-modules/form/validation';
import RFTextField from '../material-ui-modules/form/RFTextField';
import FormButton from '../material-ui-modules/form/FormButton';
import FormFeedback from '../material-ui-modules/form/FormFeedback';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {login} from "../../redux/actions/authActions";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignIn({login}) {

  const {t} = useTranslation();

  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const {email, password} = user;

  const onChange = e => setUser({...user, [e.target.name]: e.target.value});

  // const validate = values => {
  //   const errors = required([`${t("sign-in.email")}`, `${t("sign-up.password")}`], values);
  //
  //   if (!errors.email) {
  //     const emailError = email(values.email, values);
  //     if (emailError) {
  //       errors.email = email(values.email, values);
  //     }
  //   }
  //
  //   return errors;
  // };

  const handleSubmit = e => {
    e.preventDefault();

    console.log("submitted login");
    // register({
    //   firstName,
    //   lastName,
    //   email,
    //   password
    // });

    setSent(true);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            {`${t("sign-in.title")}`}
          </Typography>
          <Typography variant="body2" align="center">
            {`${t("sign-in.member")}`}
            <Link to="/sign-up" align="center" underline="always">
              {t("sign-in.sign-up")}
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} >
          {({ handleSubmit2, submitting }) => (
            <form onSubmit={handleSubmit2} className={classes.form} noValidate>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label={`${t("sign-in.email")}`}
                margin="normal"
                name="email"
                required
                size="large"
                onChange={onChange}
                value={email}
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label={`${t("sign-in.password")}`}
                type="password"
                margin="normal"
                onChange={onChange}
                value={password}
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? `${t("sign-in.progress")}` : `${t("sign-in.title")}`}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" to="/forgot-password">
            {t("sign-in.forgot")}
          </Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default connect(null, {login})(withRoot(SignIn));

