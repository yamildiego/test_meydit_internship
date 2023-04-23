import { ChangeEvent, useState } from "react";

import { TextField, Grid } from "@mui/material";

import Address from "./Address";
import FormView from "../Common/FormView";

import withParamsAndNavigate from "../../Hooks/withParamsAndNavigate";
import genericValidation from "../../Functions/genericValidation";
import * as userActions from "../../Actions/userActions";

interface NewUserViewProps {
  title: string;
  formNewUser: FormUserType;
  userType: string;
  setFormNewUser: (view: FormUserType) => void;
  newUser: (user: UserType, userType: string) => void;
}

const NewUserView = (props: NewUserViewProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { formNewUser, userType } = props;

  const handleOnChange = (value: FormUserType) => {
    if (submitted) props.setFormNewUser(runValidation(value));
    else props.setFormNewUser(value);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setSubmitted(true);
    let formValidated = runValidation(formNewUser);
    props.setFormNewUser(formValidated);

    let hasError = Object.values(formValidated).some((field) => field.error);
    let clientFormatted = Object.entries(formValidated).reduce((acc, [key, value]) => ({ ...acc, [key]: value.value }), {} as UserType);

    if (!hasError) props.newUser(clientFormatted, userType);
  };

  const runValidation = (formNew: FormUserType) => {
    let formValidated: FormUserType = {
      ...formNew,
      business_name: genericValidation(formNew.business_name.value, userType == "MAKER" ? "required" : "", "Name"),
      name: genericValidation(formNew.name.value, userType == "CLIENT" ? "required" : "", "Name"),
      lastname: genericValidation(formNew.lastname.value, userType == "CLIENT" ? "required" : "", "Lastname"),
      phone: genericValidation(formNew.phone.value, "required", "Phone"),
      email: genericValidation(formNew.email.value, "required", "Email"),
      address: genericValidation(formNew.address.value, userType == "CLIENT" ? "required" : "", "Address"),
    };

    if (!formValidated.email.error) formValidated.email = genericValidation(formNew.email.value, "email", "Email");

    return formValidated;
  };

  return (
    <FormView title={props.title} submitText="Create client" handleSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {userType === "MAKER" && (
          <Grid item xs={12}>
            <TextField
              autoFocus={userType === "MAKER"}
              required
              id="business"
              name="business"
              label="Business Name"
              fullWidth
              value={formNewUser.business_name.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleOnChange({ ...formNewUser, business_name: { ...formNewUser.business_name, value: event.target.value } })
              }
              error={formNewUser.business_name.error && submitted}
              helperText={submitted && formNewUser.business_name.error ? formNewUser.business_name.helperText : ""}
            />
          </Grid>
        )}
        {userType === "CLIENT" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus={userType === "CLIENT"}
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                value={formNewUser.name.value}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange({ ...formNewUser, name: { ...formNewUser.name, value: event.target.value } })
                }
                error={formNewUser.name.error && submitted}
                helperText={submitted && formNewUser.name.error ? formNewUser.name.helperText : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastname"
                name="lastname"
                label="Last Name"
                fullWidth
                value={formNewUser.lastname.value}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange({ ...formNewUser, lastname: { ...formNewUser.lastname, value: event.target.value } })
                }
                error={formNewUser.lastname.error && submitted}
                helperText={submitted && formNewUser.lastname.error ? formNewUser.lastname.helperText : ""}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            value={formNewUser.phone.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formNewUser, phone: { ...formNewUser.phone, value: event.target.value } })
            }
            error={formNewUser.phone.error && submitted}
            helperText={submitted && formNewUser.phone.error ? formNewUser.phone.helperText : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={formNewUser.email.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange({ ...formNewUser, email: { ...formNewUser.email, value: event.target.value } })
            }
            error={formNewUser.email.error && submitted}
            helperText={submitted && formNewUser.email.error ? formNewUser.email.helperText : ""}
          />
        </Grid>
        {userType === "CLIENT" && <Address submitted={submitted} />}
      </Grid>
    </FormView>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    formNewUser: state.userReducer.formNewUser,
  };
};

const mapDispatchToProps: MyMapDispatchToProps = {
  setFormNewUser: userActions.setFormNewUser,
  newUser: userActions.newUser,
};

export default withParamsAndNavigate(NewUserView, mapStateToProps, mapDispatchToProps);
