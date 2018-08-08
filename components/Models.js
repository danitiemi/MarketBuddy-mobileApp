import t from 'tcomb-form-native';

export const User = t.struct({
  email: t.String,
  password: t.String
});