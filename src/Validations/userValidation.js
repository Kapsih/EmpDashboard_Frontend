import * as yup from "yup"


export const userSchema = yup.object().shape({

    name: yup.string().required(),
    email:yup.string().email().required(),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, and One Special Case Character")
})