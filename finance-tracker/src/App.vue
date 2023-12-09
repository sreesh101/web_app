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
             <RouterLink to="/books">Books</RouterLink>
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
  </div>

  <RouterView />
</template>

<style scoped>
#layout {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smooting: antialiased;
  -moz-osx-font-smooting: grayscale;
  text-align: center;
  color: #2c3e50;
}
.menuitem {
  margin: 1 rem;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
