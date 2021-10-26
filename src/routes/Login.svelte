<script>
  import Button from '../components/Button.svelte';
  import Input from '../components/Input.svelte';

  import { register, get_token } from '../store';
  import { push } from 'svelte-spa-router';
  
  const pwregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,50}$/;
  let form_un, form_pw
  let error = ""
  
  function validate() {
    if (!form_un || !form_pw) {
      error = "Enter a username and password"
      return false
    }
    if (form_pw.length <= 3) {
      error = "Password have more than 3 letters"
      return false
    }
    if (!pwregex.test(form_pw)) {
      error = "Password needs a number and special character"
      return false
    }
    error = ""
    return true
  }
  
  async function signup() {
    if (validate()) {
      if (!(await register(form_un, form_pw))) {
        error = "Error registering, try again"
      }
    }
    signin()
  }

  async function signin() {
    if (validate()) {
      if (await get_token(form_un, form_pw)) {
        error = ""
        push("/dash");
      } else {
        error = "Error logging in, try again"
      }
    }
  }

</script>

<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font font-medium text-3xl text-gray-900">Welcome to Micro Rockets 🚀</h1>
      <p class="leading-relaxed mt-4">Your job as an astronaut 👩‍🚀 is to design and launch rockets and see how high they will go while avoiding space junk! 🚮</p>
    </div>
    <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <Input label="Userame" type="username" bind:value={form_un} />
      <Input label="Password" type="password" bind:value={form_pw} />
      <div class="flex mx-auto space-x-4">
        <Button on:click={signin} label="Sign In"/>
        <Button on:click={signup} label="Register"/>
      </div>
      <p class="text-center font-bold text-red-500 mt-2">{error}</p>
    </div>
  </div>
</section>
