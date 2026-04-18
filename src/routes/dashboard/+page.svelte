<script lang="ts">
    import {onMount} from 'svelte';
    import { jwtDecode } from 'jwt-decode';
    interface UserInfo {
        name: string;
        email: string;
        nickname: string;
        auth_time: number;
    }
    let decodedToken: UserInfo;
    let name = $state("");
    let email = $state("");
    onMount(() => {
        // @ts-ignore
        let id_token = document.cookie.split('; ').find(row => row.startsWith('id_token=')).split('=')[1];
        decodedToken = jwtDecode(id_token);
        console.log(decodedToken);
        name = decodedToken.name;
        email = decodedToken.email;
        console.log(id_token);
    })
    
</script>
<main class="root h-full w-full grad-bg flex items-center justify-center text-white flex-col">
    <h1 class="text-4xl">Hello {name}!</h1>
    <h2 class="text-xl">{email}</h2>
    <h2 class="text-md">Unfortunately, the dashboard is still work in progress.</h2>
    <h2 class="text-sm">Dr Alchistant knows your email hehe</h2>

</main>
<style>
.grad-bg{
    background: #000000ab;
}
</style>