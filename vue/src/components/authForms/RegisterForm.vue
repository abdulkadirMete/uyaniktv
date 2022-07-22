<template>
  <FormModal @submit.prevent="formSubmit">
    <!-- container -->
    <div :class="$style.container">
      <!-- database error -->
      <CustomError :error="errors.database" />

      <!-- password again error -->
      <CustomError :error="errors.passwordConfirmation" />

      <!-- password error -->
      <CustomError :error="errors.password" />

      <!-- email eror -->
      <CustomError :error="errors.email" />

      <!-- name error -->
      <CustomError :error="errors.name" />

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
      <h1 :class="$style.heading">Üye ol</h1>

      <div :class="$style.formContent">
        <!-- name -->
        <div :class="$style.inputGroup">
          <input
            :class="$style.input"
            placeholder="Kullanıcı Adı"
            label="name"
            v-model="user.name"
            type="text"
            @validate="validate('name')"
            name="name"
            :error="errors.name"
            @blur="validate('name')"
            @keyup="validate('name')"
            @keypress="validate('name')"
          />
        </div>

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
            @keyup="validate('email')"
            @keypress="validate('email')"
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
        <!-- password again  -->
        <div :class="$style.inputGroup">
          <input
            :class="$style.input"
            placeholder="Şifre Tekrar"
            label="Password Again"
            v-model="user.passwordConfirmation"
            type="password"
            @validate="validate('passwordConfirmation')"
            name="passwordConfirmation"
            :error="errors.passwordConfirmation"
            @blur="validate('passwordConfirmation')"
            @keypress="validate('passwordConfirmation')"
            @keyup="validate('passwordConfirmation')"
          />
        </div>

        <button :class="$style.registerBtn" type="submit">Onayla</button>
        <div :class="$style.infoGroup">
          <p :class="$style.infoText">Zaten üye misin ?</p>
          <button
            type="button"
            :class="$style.infoButton"
            @click="
              () => {
                this.$router.push({ path: '/giris' });
              }
            "
          >
            Giriş Yap
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
import { registerValidation } from "../../data/validitionVars";
import CustomError from "./subComponents/CustomError.vue";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { notifyMaker } from "../../helpers/utilHelpers";

export default {
  components: { FormModal, CustomError },
  setup() {
    const user = ref({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });
    const loading = ref(false);
    const errors = ref({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      database: "",
    });

    // validate form
    const validate = (field) => {
      registerValidation
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
      registerValidation
        .validate(user.value, { abortEarly: false })
        .then(() => {
          // if form validated than adddb
          saveUser();
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            errors.value = { ...errors.value, [error.path]: error.message };
          });
        });
    };

    // save db
    const saveUser = () => {
      loading.value = true;
      store
        .dispatch("register", { ...user.value })
        .then(() => {
          loading.value = false;
          notify(notifyMaker("Kayıt işlemi başarılı!!", "success"));
          router.push({
            name: "Home",
          });
        })
        .catch((error) => {
          loading.value = false;
          if (error.response.status === 422) {
            errors.value.database = "Bir hata oluştu daha sonra tekrar deneyin";
          }
        });
    };

    return {
      errors,
      user,
      router,
      store,
      formSubmit,
      saveUser,
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
  border: none;
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
