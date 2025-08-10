export const checkValidaData = (email, password, name, isSignIn) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordVaild =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  if (!isEmailValid) return "Please enter a valid email or mobile number.";
  if (!isPasswordVaild)
    return "Your password must contain between 4 and 60 characters.";
  if (!isSignIn) {
    // Only validate name on sign up
    if (!name) return "Name is required.";
    if (!isName) return "Please enter a valid name.";
  }

  //if email and password ,name are valid return me null;
  return null;
};
