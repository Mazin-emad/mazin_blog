import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const Signup = () => {
  const { createNewUser, setUserName } = useAuth();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: '',
      email: '',
      pass: '',
      confirmPass: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required().min(3),
      email: Yup.string().required().email(),
      pass: Yup.string().required().min(6),
      confirmPass: Yup.string().required().oneOf([Yup.ref('pass')], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      setErr(null);
      setLoading(true);
      if (formik.isValid) {
        try {
          await createNewUser(values.pass, values.email);
          await setUserName(values.name);
        } catch (err) {
          console.log(err);
          setErr("failed to sign up: " + err.message);
        }
        setLoading(false);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          {err ? <p className="text-danger">{err}</p> : null}
          <div className="form-group mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id='name'
              autoComplete='name'
              className="form-control"
              name="name"
              placeholder="Enter full name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="text-danger">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              autoComplete='email'
              id='email'
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter email"
              name="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-danger">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              className="form-control"
              name="pass"
              id='pass'
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.pass && formik.touched.pass ? (
              <p className="text-danger">{formik.errors.pass}</p>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id='confirmPassword'
              name="confirmPass"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmPass && formik.touched.confirmPass ? (
              <p className="text-danger">{formik.errors.confirmPass}</p>
            ) : null}
          </div>

          {<button type="submit" className={`btn btn-primary w-100 ${loading ? "disabled" : ''}`}>
            Sign Up
          </button>}
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
