<script setup>
import { ref } from 'vue'
import { auth } from '@/js/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index.js'

const email = ref(null)
const password = ref(null)
const loginMessage = ref(null)
const errorMessage = ref(null)

function login() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      console.log(userCredential)
      router.push('/books')
      loginMessage.value = 'Login successful!'
      errorMessage.value = null
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessageText = error.message;
      console.error("Error Code: " + errorCode)
      console.error("Error Message: " + errorMessageText)
      loginMessage.value = null
      errorMessage.value = 'Invalid email or password. Please try again.'
    });
}

function resetForm() {
  email.value = null;
  password.value = null;
  loginMessage.value = null
  errorMessage.value = null
}
</script>
<template>
  <div class="login">
    <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="form-item">
                <label>e-mail </label>
                <input v-model="email" id="email" type="text" />
            </div>
            <div class="form-item">
                <label>password </label>
                <input v-model="password" id="password" type="password" />
            </div>
            <div class="form-item">
                <button @click.prevent="resetForm">Reset </button>
                <button type="submit">Login </button>
            </div>           
        </form>
</div>
<div v-if="loginMessage" class="success-message">{{ loginMessage }}</div>
<div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

</template>


<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.login h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-item {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #4caf50;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="reset"] {
  background-color: #f44336;
}

button[type="reset"]:hover {
  background-color: #d32f2f;
}
.success-message,
.error-message {
  margin-top: 1rem;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.success-message {
  background-color: #4caf50;
  color: white;
}

.error-message {
  background-color: #f44336;
  color: white;
}
</style>