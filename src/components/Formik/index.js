import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </>
    );
};

const FormikForm = () => {
    return (
        <>
            <h1>Subscribe</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    acceptedTerms: false,
                    jobType: "",
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    lastName: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    acceptedTerms: Yup.boolean()
                        .required("Required")
                        .oneOf(
                            [true],
                            "You must accept the terms and conditions."
                        ),
                    jobType: Yup.string()
                        .oneOf(
                            ["designer", "development", "product", "other"],
                            "Invalid Job Type"
                        )
                        .required("Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
                    <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                    />
                    <br />
                    <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                    />
                    <br />
                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <br />
                    <MySelect label="Job Type" name="jobType">
                        <option value="">Select a job type</option>
                        <option value="designer">Designer</option>
                        <option value="development">Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="other">Other</option>
                    </MySelect>
                    <br />
                    <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
                    </MyCheckbox>
                    <br />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};

export default FormikForm;
