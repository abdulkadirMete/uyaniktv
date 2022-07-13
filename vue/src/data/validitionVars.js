import * as yup from "yup";

// login validation
export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .required("Lütfen e-posta adresi giriniz!")
    .email("Geçersiz e-posta adresi biçimi!"),
  password: yup
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır!")
    .max(20, "Şifre en az fazla 20 karakter olmalıdır!")
    .required("Lütfen şifre giriniz!"),
});

// register validation
export const registerValidation = yup.object().shape({
  name: yup.string().required("Lütfen kullanıcı adı giriniz!"),
  email: yup
    .string()
    .required("Lütfen e-posta adresi giriniz!")
    .email("Geçersiz e-posta adresi biçimi!"),
  password: yup
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır!")
    .max(20, "Şifre en az fazla 20 karakter olmalıdır!")
    .required("Lütfen şifre giriniz!"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifre tekrarı onaylaması başarısız!!"),
});
