<script>
  import Button from '../components/Button.svelte';
  import Input from '../components/Input.svelte';

  import { register, get_token } from '../store';
  import { push } from 'svelte-spa-router';

  let form_un, form_pw
  async function signup() {
    await register(form_un, form_pw);
    await get_token(form_un, form_pw);
    push("/dash");
  }

  async function signin() {
    await get_token(form_un, form_pw);
    push("/dash");
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
    </div>
  </div>
</section>
