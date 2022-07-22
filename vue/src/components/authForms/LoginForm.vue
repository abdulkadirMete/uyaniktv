<template>
  <FormModal @submit.prevent="formSubmit">
    <!-- container -->
    <div :class="$style.container">
      <!-- database error -->
      <CustomError :error="errors.database" />

      <!-- password error -->
      <CustomError :error="errors.password" />

      <!-- email eror -->
      <CustomError :error="errors.email" />

      <!-- close button -->
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        :class="$style.closeBtn"
        @click="
          () => {
            router.push('/');
          }
        "
      />

      <!-- heading -->
      <h1 :class="$style.heading">Giriş Yap</h1>
      <div :class="$style.formContent">
        <!-- email -->
        <div :class="$style.inputGroup">
          <input
            :class="$style.input"
            placeholder="E-posta"
            label="Email"
            v-model="user.email"
            type="email"
            @validate="validate('email')"
            name="email"
            :error="errors.email"
            @blur="validate('email')"
            @keypress="validate('email')"
            @keyup="validate('email')"
          />
        </div>
        <!-- password -->
        <div :class="$style.inputGroup">
          <input
            :class="$style.input"
            placeholder="Şifre"
            label="Password"
            v-model="user.password"
            type="password"
            @validate="validate('password')"
            name="password"
            :error="errors.password"
            @blur="validate('password')"
            @keypress="validate('password')"
            @keyup="validate('password')"
          />
        </div>

        <button :class="$style.registerBtn" type="submit">Onayla</button>
        <div :class="$style.infoGroup">
          <p :class="$style.infoText">Hesabın yok mu ?</p>
          <button
            type="button"
            :class="$style.infoButton"
            @click="
              () => {
                this.$router.push({ path: '/kaydol' });
              }
            "
          >
            Kaydol
          </button>
        </div>
      </div>
    </div>
  </FormModal>
</template>
<script>
import FormModal from "../formFragments/FormModal.vue";
import store from "../../store";
import router from "../../router";
import { loginValidation } from "../../data/validitionVars";
import CustomError from "./subComponents/CustomError.vue";
import { ref } from "vue";
import { notifyMaker } from "../../helpers/utilHelpers";
import { notify } from "@kyvg/vue3-notification";

// import the styling for the toast

export default {
  components: { FormModal, CustomError },
  setup() {
    const user = ref({
      email: "",
      password: "",
    });
    const loading = ref(false);
    const errors = ref({ email: "", password: "", database: "" });

    // validate form
    const validate = (field) => {
      loginValidation
        .validateAt(field, user.value)
        .then(() => {
          errors.value[field] = "";
        })
        .catch((err) => {
          errors.value[err.path] = err.message;
        });
    };

    // form submit
    const formSubmit = () => {
      loginValidation
        .validate(user.value, { abortEarly: false })
        .then(() => {
          // if form validated than adddb
          login();
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            errors.value = { ...errors.value, [error.path]: error.message };
          });
        });
    };

    // add db
    const login = () => {
      loading.value = true;
      store
        .dispatch("login", { ...user.value })
        .then(() => {
          loading.value = false;
          notify(notifyMaker("Giriş işlemi başarılı!!", "success"));
          router.push({
            name: "Home",
          });
        })
        .catch((error) => {
          loading.value = false;
          if (error.response?.status === 422) {
            errors.value.database = "Kullanıcı adı veya şifre yanlış!!";
          } else {
            errors.value.database =
              "Bir hata oluştu daha sonra tekrar deneyin!!";

            console.log(error);
          }
        });
    };

    return {
      errors,
      user,
      router,
      store,
      formSubmit,
      login,
      validate,
    };
  },
};
</script>
<style module>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.formContent {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
}

.heading {
  color: white;
  font-size: var(--font-size-xl);
  background-color: var(--color-black);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 1.5rem;
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
}

.registerBtn {
  border: none;
  margin-top: 1rem;
  padding: 0.5rem 0;
  background-color: var(--color-brand-light);
  border-radius: var(--border-radius-sm);
  color: white;
  font-weight: 500;
  font-size: var(--font-size-l);
  transition: all 0.3s ease-in-out;
}

.registerBtn:hover {
  transform: scale(1.05);
}

.closeBtn {
  font-size: var(--small-icon-size);
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: var(--color-white);
  cursor: pointer;
}

.infoGroup {
  margin-top: 1.5rem;
  display: flex;
  column-gap: 1rem;
}

.infoText {
  color: var(--color-border);
}

.infoButton {
  padding: 0.25rem 0.75rem;
  border: 1px solid #999c9f;
  background-color: transparent;
  color: #999c9f;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-normal);
}
.infoButton:hover {
  border: 1px solid white;
  color: white;
}

/* input */
.inputGroup {
  display: flex;
  padding: 1rem 0;
}

.input {
  width: 100%;
  display: block;
  padding: 0.75rem 0;
  font-size: var(--font-size-l);
  border-bottom: solid 1px var(--color-aside-bg);
  -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 96%,
    var(--color-aside-bg) 4%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 96%,
    var(--color-aside-bg) 4%
  );
  background-position: calc(-100%) 0;
  background-size: calc(100%) 100%;
  background-repeat: no-repeat;
  color: var(--color-white);
}

.input:focus {
  box-shadow: none;
  outline: none;
  background-position: 0 0;
}

.input::-webkit-input-placeholder {
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.input:focus::-webkit-input-placeholder {
  color: var(--color-white);
  font-size: var(--font-size-normal);
  -webkit-transform: translateY(-20px);
  transform: translateY(-8px);
  visibility: visible !important;
}
</style>
