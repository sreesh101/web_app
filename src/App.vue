<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav>
          <span class="menuitem">
            <RouterLink to="/">Home</RouterLink>
          </span>
          <span class="menuitem">
            <span> | </span>
            <RouterLink to="/register">Register</RouterLink>
          </span> 
          <span class="menuitem">
            <span> | </span>
            <RouterLink to="/login">Login</RouterLink>
          </span> 
          <span class="menuitem">
            <span> | </span>
            <RouterLink to="/usersettings">User Settings</RouterLink>
          </span> 
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#layout {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Change font */
  color: #1c0c73; /* Default text color */
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

header {
  background-color: #000291; /* Header background color */
  padding: 20px 0;
}

nav {
  display: flex;
  justify-content: center;
}

.menuitem {
  margin: 0 1rem;
}

nav a {
  text-decoration: none;
  color: #ffffff; /* Link color */
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: hsl(239, 100%, 28%); /* Hover link color */
}

main {
  margin-top: 20px;
}
</style>
