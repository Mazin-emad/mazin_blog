import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { signInWithEmailPass } = useAuth();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: '',
      pass: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      pass: Yup.string().required().min(6),
    }),
    onSubmit: async(values) => {
      setLoading(true);
      setErr(null);
      if (formik.isValid) {
        try{
          await signInWithEmailPass(values.pass, values.email);
        }catch(err){
          setErr("Failed to sign in :" + err.message);
        }
        setLoading(false);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          {err ? <p className="text-danger">{err}</p> : null}
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id='email'
              autoComplete='email'
              className="form-control"
              placeholder="Enter email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-danger">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="pass"
              id='pass'
              className="form-control"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.pass && formik.touched.pass ? (
              <p className="text-danger">{formik.errors.pass}</p>
            ) : null}
          </div>
          {<button type="submit" className={`btn btn-primary w-100 ${loading? 'disabled' : ""}`}>
            Sign In
          </button>}
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
