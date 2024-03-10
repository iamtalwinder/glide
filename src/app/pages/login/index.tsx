import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, FormControl } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/store';
import { selectLoginError, submitLogin } from '@app/auth/store/login.slice';

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  remember: yup.boolean().default(true)
});

const defaultValues = {
  email: '',
  password: '',
  remember: true
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const loginErrors = useAppSelector((state) => selectLoginError(state.auth));

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  function onSubmit(data: yup.InferType<typeof schema>) {
    const {email, password} = data;

    dispatch(submitLogin({email, password}));
    reset(defaultValues);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                autoComplete="current-password"
                margin="normal"
                name="password"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />

          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormControlLabel label="Remember Me" control={<Checkbox {...field} checked={field.value} />} />
              </FormControl>
            )}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
