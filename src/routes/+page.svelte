<script>
	import Nav from "$lib/Nav.svelte"
	import { PUBLIC_HACKCLUB_AUTH } from "$env/static/public"
	let clientId = PUBLIC_HACKCLUB_AUTH
	let authUrl = `https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&response_type=code&scope=openid+profile+email&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback`
  if (document.cookie.split('; ').find(row => row.startsWith('id_token='))) {
    authUrl = `./dashboard`
  }
</script>

<Nav />
<div
	class="center-ovr w-screen h-screen flex items-center justify-center top-0"
>
	<div class="alchemy flex items-center justify-center pb-10">
		<div class="second-cont w-[clamp(200px, 100vw, 768px)]">
			<h1
				class=" text-[clamp(24px,10vw,60px)] flex items-center gap-2 font-bold"
			>
				<img src="/Alchemist.webp" alt="" class="logo aspect-square" />
				<span class="font alchemizefont text-[#ff2e2e]">Alchemize</span>
			</h1>
			<div class="description">
				<div class="flex justify-center w-full flex-col">
					<p
						class="text-gray-300 text-justify mt-1 text-lg gap-2 flex flex-col description"
					>
						<span class="text-[clamp(10px,3vw,30px)] font-bold"
							>3 Themes, 3 Currencies and a Dynamic Shop</span
						>
						<span class="text-[clamp(8px,2vw,20px)]"
							>Under Draft | Hackclub Ages 13-18</span
						>
					</p>
					<div class="form flex">
						<input
							type="text"
							placeholder="Enter your Email"
							class="h-10 w-[clamp(200px,80vw,400px)] email border border-red-500 mt-5 rounded-l-md text-gray-400 pl-2 outline-none"
						/>
						<div
							class="flex mt-5 h-10 buttons w-[clamp(200px,80vw,400px)] gap-1"
						>
							<a href={authUrl} class=" button w-28">
								<button
									class="h-10 w-full bg-red-600 get-started text-gray-200 font-bold border border-red-600 hover:bg-red-500 ml-1 text-md"
								>
									Get Started
								</button>
							</a>
							<a
								href="https://hackclub.enterprise.slack.com/archives/C0ASY6R552R"
								target="_blank"
								class="button w-28"
							>
								<button
									class="h-10 w-full bg-gray-600 slack text-gray-300 font-bold border border-gray-600 rounded-r-md hover:bg-gray-500 hover:text-gray-300 ml-1 text-md"
								>
									Join Slack!!
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="absolute -z-10 w-screen h-screen top-0">
	<div class="img absolute -z-20 w-full h-full"></div>
	<div class="ovr h-full w-screen -z-10"></div>
</div>

<div
	class="how-to-participate h-screen w-screen bg-black flex items-center text-white flex-col"
>
	<h1 class="alchemizefont text-5xl text-[#fc6565]">How does it work?</h1>
	<div class="grid grid-cols-2 gap-4 mt-10">
		<div
			class="card flex w-90 h-48 border border-red-600 border-dashed flex flex-col items-center justify-center rounded-md"
		>
			<i class="fa-solid fa-code mb-2 text-3xl"></i>
			<h2 class="text-3xl text-justify alchemizefont font-bold">
				Create Project
			</h2>
			<p
				class="text-gray-300 text-center text-sm mt-2 text-justify w-3/4 leading-5"
			>
				Make a general project, or Choose any theme from our 3 themes for your
				project, and track your time with a Timing system like Hackatime
			</p>
		</div>
      <div
        class="card flex w-90 h-48 border border-red-600 border-dashed flex flex-col items-center justify-center rounded-md"
      >
        <i class="fa-solid fa-ship text-3xl mb-2"></i>
        <h2 class="text-3xl text-justify alchemizefont font-bold">Ship It</h2>
        <p
          class="text-gray-300 text-center text-sm mt-2 text-justify w-3/4 leading-5"
        >
          Ship your completed project, and let it get reviewed by our Master Alchistants, once approved you will earn the currency of that theme.
        </p>
      </div>
		<div
			class="card flex w-90 h-48 border border-red-600 border-dashed flex flex-col items-center justify-center rounded-md"
		>
			<i class="fa-solid fa-flask mb-2 text-3xl"></i>
			<h2 class="text-3xl text-justify alchemizefont font-bold">
				Convert to Potion Mix
			</h2>
			<p
				class="text-gray-300 text-center text-sm mt-2 text-justify w-3/4 leading-5"
			>
				Convert your earned currency to Potion Mix, and use it to buy items from
				the shop. Converting 2 or more currency together gives you bonus.
			</p>
		</div>
		<div
			class="card flex w-90 h-48 border border-red-600 border-dashed flex flex-col items-center justify-center rounded-md"
		>
			<i class="fa-solid fa-bag-shopping mb-2 text-3xl"></i>
			<h2 class="text-3xl text-justify alchemizefont font-bold">
				Shop your Rewards
			</h2>
			<p
				class="text-gray-300 text-center text-sm mt-2 text-justify w-3/4 leading-5"
			>
				Our shop is dynamic, with new items added every week. You suggest the items, we add it. Spend your Potion Mix there.
			</p>
		</div>
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Saira+Stencil:ital,wght@0,100..900;1,100..900&display=swap");
	.img {
		background-image: url("/bg2.webp");
		background-size: cover;
		background-position: center;
	}
	.ovr {
		background: linear-gradient(
			#000000a9,
			#000000a9,
			#000000a9,
			#000000a9,
			#000000
		);
	}
	.alchemy {
		height: 100vh;
		width: 50vw;
	}
	.alchemizefont {
		font-family: "Saira Stencil", cursive;
	}
	.logo {
		width: clamp(20px, 8vw, 64px);
	}
	@media screen and (max-width: 900px) {
		.second-cont {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
		.description {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
		.form {
			flex-direction: column;
			gap: 0px;
		}
		.buttons {
			margin-top: 3px !important;
			margin-left: 0px !important;
		}
		.button {
			width: 50%;
		}
		.email {
			border-radius: 10px 10px 0px 0px !important;
			margin-left: 4px;
		}
		.get-started {
			border-radius: 0px 0px 0px 10px !important;
		}
		.slack {
			border-radius: 0px 0px 10px 0px !important;
		}
	}
</style>
