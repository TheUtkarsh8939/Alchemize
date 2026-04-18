<script lang="ts">

    import Sidenav from "$lib/components/sidenav.svelte";
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/Alchemist.webp" /></svelte:head>
<div class="root h-screen w-screen  flex items-center justify-start text-white">
    <Sidenav />
        {@render children()}
</div>
<div class='bg bg-[url("/bg2.webp")] w-screen h-screen bg-cover absolute top-0 left-0 z-[-1]'></div>
