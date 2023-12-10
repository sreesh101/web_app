<script setup>
import { ref, computed, onMounted } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/js/firebase'

const userData = ref(null)
const isLoggedIn = ref(false)
const totalIncome = computed(() => userData.value ? userData.value.Income : 0);
const rentPercentage = computed(() => userData.value ? `${(userData.value.Rent / totalIncome.value) * 100}%` : '0');
const foodPercentage = computed(() => userData.value ? `${(userData.value.Food / totalIncome.value) * 100}%` : '0');
const entertainmentPercentage = computed(() => userData.value ? `${(userData.value.Entertainment / totalIncome.value) * 100}%` : '0');
const savingsPercentage = computed(() => userData.value ? `${(userData.value.Savings / totalIncome.value) * 100}%` : '0');
const extraPercentage = computed(() => userData.value ? `${100 - ((userData.value.Savings + userData.value.Entertainment + userData.value.Food + userData.value.Rent)/totalIncome.value)*100}%` : '0');

onMounted(async () => {
  const currentUser = auth.currentUser
  isLoggedIn.value = currentUser !== null

  if (isLoggedIn.value) {
    const userDocRef = doc(db, 'users', currentUser.uid)

    try {
      const docSnap = await getDoc(userDocRef)
      if (docSnap.exists()) {
        userData.value = docSnap.data()
        console.log('User data retrieved:', userData.value)
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.error('Error getting user data:', error)
    }
  }
})

const extraIncome = computed(() => {
  if (userData.value) {
    const totalExpenses = userData.value.Rent + userData.value.Food + userData.value.Entertainment + userData.value.Savings
    return userData.value.Income - totalExpenses
  }
  return 0
})

const updateExpense = (expenseField, amount) => {
  if (userData.value) {
    userData.value[expenseField] += amount;
  }
};
</script>

<template>
  <div class="home-page">
    <div v-if="isLoggedIn">
      <h1 v-if="userData">User Financial Data</h1>
      <div v-if="userData">
        <!-- Display expense values -->
        <div class="expense-values">
          <p><strong>Income:</strong> {{ userData.Income }}</p>
          <p><strong>Rent Expense:</strong> {{ userData.Rent }}
            <button @click="updateExpense('Rent', 100)">+ $100</button>
            <button @click="updateExpense('Rent', -100)">- $100</button>
          </p>
          <p><strong>Food Expense:</strong> {{ userData.Food }}
            <button @click="updateExpense('Food', 100)">+ $100</button>
            <button @click="updateExpense('Food', -100)">- $100</button>
          </p>
          <p><strong>Entertainment Expense:</strong> {{ userData.Entertainment }}
            <button @click="updateExpense('Entertainment', 100)">+ $100</button>
            <button @click="updateExpense('Entertainment', -100)">- $100</button>
          </p>
          <p><strong>Savings:</strong> {{ userData.Savings }}
            <button @click="updateExpense('Savings', 100)">+ $100</button>
            <button @click="updateExpense('Savings', -100)">- $100</button>
          </p>
          <p><strong>Extra Income:</strong> {{ extraIncome }}</p>
        </div>
        <div class="expense-bars">
          <div class="bar rent-bar" :style="{ width: rentPercentage }"></div>
          <div class="bar food-bar" :style="{ width: foodPercentage }"></div>
          <div class="bar entertainment-bar" :style="{ width: entertainmentPercentage }"></div>
          <div class="bar savings-bar" :style="{ width: savingsPercentage }"></div>
          <div class="bar extra-bar" :style="{ width: extraPercentage }"></div>
        </div>
      </div>
      <div v-else>
        <h1>Welcome to the Financial Tracker App!</h1>
        <p>Please log in to view financial data.</p>
      </div>
    </div>
    <div v-else>
      <h1>Welcome to the Financial Tracker App!</h1>
      <p>Please log in to view financial data.</p>
    </div>
  </div>
</template>

<style>
.home-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
}

.expense-values {
  margin-top: 20px;
}

.expense-bars {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  height: 20px;
}

.bar {
  height: 100%;
  margin-right: 5px;
}

.rent-bar {
  background-color: #FF6347;
}

.food-bar {
  background-color: #32CD32;
}

.entertainment-bar {
  background-color: #6495ED;
}

.savings-bar {
  background-color: #FFD700;
}

.extra-bar {
  background-color: #580582;
}
</style>
