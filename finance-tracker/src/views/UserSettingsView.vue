<template>
  <div class="usersettings">
    <div v-if="currentUser !== null" class="logged-in">
      <h1>User Settings</h1>
      <p class="current-user">Logged in as: {{ currentUser.email }}</p>
      
      <div class="form-item">
        <label for="income">Income:</label>
        <input v-model="income" type="number" id="income" />
      </div>
      
      <div v-for="(expense, index) in customExpenses" :key="index" class="form-item">
        <label :for="`expense_${index}`">{{ expense }}:</label>
        <input v-model="customExpenseValues[index]" :id="`expense_${index}`" type="number" />
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>
      
      <button @click.prevent="updateExpenses">Update Expenses</button>
      <button @click.prevent="userSignOut">Sign Out</button>
      <button @click.prevent="deleteAccount">Delete Account</button>
    </div>

    <div v-else class="not-logged-in">
      <h1>Welcome to the Financial Tracker App!</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { signOut } from 'firebase/auth'
import { auth, db } from '@/js/firebase'
import router from '@/router/index.js'
import { doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'

const currentUser = ref(null)
const income = ref(0)
const customExpenses = ref([])
const customExpenseValues = ref([])
const error = ref(null)

onMounted(() => {
  currentUser.value = auth.currentUser
  if (currentUser.value != null) {
    console.log("Current user is: " + currentUser.value.email)
    console.log(auth.currentUser)
    fetchUserData()
  }
})

async function fetchUserData() {
  const userDocRef = doc(db, 'users', currentUser.value.uid)
  try {
    const docSnap = await getDoc(userDocRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      customExpenses.value = Object.keys(data).filter(key => key !== 'Income')
      customExpenseValues.value = customExpenses.value.map(expense => data[expense])
      income.value = data['Income'] || 0
    } else {
      console.log('No such document!')
    }
  } catch (error) {
    console.error('Error getting user data:', error)
  }
}

function updateExpenses() {
  if (currentUser.value !== null) {
    let hasError = false
    const expensesData = {}

    customExpenses.value.forEach((expense, index) => {
      const value = Math.max(customExpenseValues.value[index], 0) 
      if (value !== customExpenseValues.value[index]) {
        error.value = 'Expense values cannot be less than 0!' 
        hasError = true
      }
      expensesData[expense] = value
    })

    if (hasError) return 

    const totalExpenses = Object.values(expensesData).reduce((acc, curr) => acc + curr, 0)
    expensesData['Income'] = income.value || 0

    if (totalExpenses > expensesData['Income']) {
      error.value = 'Total expenses cannot exceed income!'
      setTimeout(() => {
        error.value = null; 
      }, 5000);
      return
    }

    const userDocRef = doc(db, 'users', currentUser.value.uid)
    updateDoc(userDocRef, expensesData)
      .then(() => {
        console.log('User expenses updated successfully!')
        error.value = null
        error.value = 'Expenses updated successfully!'
        setTimeout(() => {
          error.value = null; 
        }, 5000);
      })
      .catch((error) => {
        console.error('Error updating user expenses:', error)
        error.value = 'Failed to update expenses. Please try again.'
      })
  }
}

function deleteAccount() {
  if (currentUser.value !== null) {
    const userDocRef = doc(db, 'users', currentUser.value.uid);

    deleteDoc(userDocRef)
      .then(() => {
        const user = auth.currentUser;

        if (user !== null) {
          user.delete().then(() => {
            console.log('User account deleted successfully!');
            router.push('/');
          }).catch((error) => {
            console.error('Error deleting user account:', error);
            error.value = 'Failed to delete user account. Please try again.';
          });
        } else {
          console.error('No user found to delete.');
          error.value = 'Failed to delete user account. Please try again.';
        }
      })
      .catch((error) => {
        console.error('Error deleting user document:', error);
        error.value = 'Failed to delete user account data. Please try again.';
      });
  }
}

function userSignOut() {
  signOut(auth)
    .then(() => {
      console.log("Signed Out")
      router.push('/')
    })
    .catch((error) => {
      console.log("Cannot Sign Out !!!")
      console.log(error)
    });
}
</script>

<style scoped>
.usersettings {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin-top: 5vh;
}

.logged-in,
.not-logged-in {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.logged-in {
  height: 80vh;
}

.logged-in h1,
.not-logged-in h1 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

.logged-in .current-user {
  margin-bottom: 12px;
  color: #555;
}

.form-item {
  margin-bottom: 16px;
}

.form-item label {
  margin-right: 8px;
  color: #333;
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

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.not-logged-in {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.not-logged-in h1 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}
</style>

