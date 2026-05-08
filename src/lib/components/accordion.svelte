<script>
    import { slide } from "svelte/transition";

    let {Title, Content, addClass} = $props()
    let open = $state(false);
</script>
<div class="flex flex-col w-full items-center gap-0 hover:scale-105 transition-transform duration-300">
    <button onclick={() => open = !open} class="extendable {addClass || ''} border-red-950 flex items-center px-10 text-3xl border {open ? 'border-b-0' : 'border-b'} rounded-t-lg {open?"rounded-b-none":"rounded-b-lg"} bg-[#1a000093] relative">
    <h1>{Title}</h1>
    <span class="bottom-arrow absolute right-10">
        <i class="fa-solid {open ? 'fa-angle-up' : 'fa-angle-down'}"></i>
    </span>
</button>
{#if open}
    <div class="content w-3/5 border-red-950 border-r border-l border-b px-5 pb-6 bg-[#1a000083] rounded-b-lg" transition:slide={{ duration: 300 }}>
        <p class="text-lg mt-4">{@html Content}</p>
    </div>
{/if}
</div>
