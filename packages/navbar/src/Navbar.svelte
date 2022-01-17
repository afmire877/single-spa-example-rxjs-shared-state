<script>
  import { onDestroy, onMount } from "svelte";
  import { Router, navigate } from "svelte-routing";
  import { auth$ as auth, logout } from "@example/auth";
  import { isMenuOpen } from './store'

  const ROUTES = {
    LOGIN: "/login",
    HOME: "/home",
  };

  let sub;  
  let isOpen;
  
  onMount(() => {
    document.addEventListener('openMenu', () => isOpen = true);

    sub = auth.subscribe(({ sessionToken }) => {
      const needsLogin = !sessionToken;
      if (needsLogin) navigate(ROUTES.LOGIN);
      else if (!needsLogin && window.location.pathname === ROUTES.LOGIN) {
        navigate(ROUTES.HOME);
      }
    });
  });

  onDestroy(() => {
    sub.unsubscribe();
    document.addEventListener('openMenu');
  });
</script>

<nav>
  <Router>
    <span>{#if !isOpen } Menu are Closed {:else} Menu is Open {/if} </span>
    {#if $auth.sessionToken}
      <button class="action" type="button" on:click|once={logout}>Logout</button
      >
    {:else}<span>Login</span>{/if}
  </Router>
</nav>

<style>
  nav {
    background: crimson;
    color: white;
    padding: 1rem 2rem;
    text-align: right;
  }

  nav .action {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 3px;
    color: white;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    text-decoration: none;
  }

  nav .action:hover,
  nav .action:focus {
    background: rgba(0, 0, 0, 0.3);
  }
</style>
