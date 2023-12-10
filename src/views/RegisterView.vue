<script setup>
import { ref } from 'vue'
import { auth, db } from '@/js/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index.js'
import { doc, setDoc } from 'firebase/firestore'

const email = ref(null)
const password = ref(null)
const passwordWarning = ref(null)

function submitForm() {
  if (password.value && password.value.length < 6) {
    passwordWarning.value = 'Password should be at least 6 characters long.'
    return
  }

  console.log('Register : ' + email.value + ' : ' + password.value)

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
      console.log(userCredential)
      const userDocRef = doc(db, 'users', user.uid)

      const userData = {
        Income: 0,
        Rent: 0,
        Savings: 0,
        Food: 0,
        Entertainment: 0
      }
      setDoc(userDocRef, userData)
        .then(() => {
          console.log('User data initialized successfully!')
          router.push('/')
        })
        .catch((error) => {
          console.error('Error initializing user data:', error)
        })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('Error Code: ' + errorCode)
      console.log('Error Message: ' + errorMessage)
    })
}

function resetForm() {
  console.log('Reset Form')
  email.value = null
  password.value = null
  passwordWarning.value = null
}
</script>

<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="submitForm">
      <div class="form-item">
        <label>e-mail</label>
        <input v-model="email" id="email" type="text" />
      </div>
      <div class="form-item">
        <label>password</label>
        <input v-model="password" id="password" type="password" />
        <span v-if="passwordWarning" class="warning">{{ passwordWarning }}</span>
      </div>
      <div class="form-item">
        <button @click.prevent="resetForm">Reset</button>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.register h1 {
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
.warning {
  margin-top: 1rem;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.warning {
  background-color: #f44336;
  color: white;
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
</style>
