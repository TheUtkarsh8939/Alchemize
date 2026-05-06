<script lang="ts">
	import { TriangleAlert } from "lucide-svelte"
	import * as Dialog from "$lib/components/ui/dialog"

	interface Project {
		id: string
		createdTime: string
		fields: {
			Name: string
			description: string
			code?: string
			demo?: string
			type: string
			update?: boolean
			hackatime: string
			journals: ""
			languages: ""
			log: ""
			owner: string
			status: string
		}
	}

	let projectBeingUpdated: Project | null = $state(null)
	let { data } = $props()
	let newProjWindowOpened = $state(false)
	let updateProjWindowOpened = $state(false)
	console.log(data?.projects)

	let projects: Project[] = $derived(data?.projects ?? [])

	type HackatimeProject = {
		name?: string
		project_name?: string
		project?: string
		total_seconds?: number
	}

	function getHackatimeProjects(payload: unknown): HackatimeProject[] {
		if (!payload || typeof payload !== "object") return []
		const maybeProjects = (payload as { projects?: unknown }).projects
		return Array.isArray(maybeProjects)
			? (maybeProjects as HackatimeProject[])
			: []
	}

	let hacks: HackatimeProject[] = $derived(getHackatimeProjects(data?.hacks))

	let usedHackatimes = $derived(
		new Set(
			projects
				.flatMap(project => project.fields.hackatime?.split(",") ?? [])
				.map(name => name.trim().toLowerCase())
				.filter(Boolean)
		)
	)

	let availableHacks = $derived(
		hacks.filter(hack => {
			const hackName = (hack.name ?? hack.project_name ?? hack.project ?? "")
				.trim()
				.toLowerCase()
			return Boolean(hackName) && !usedHackatimes.has(hackName)
		})
	)

	let hackSecondsByName = $derived(
		new Map(
			hacks.map(hack => [
				(hack.name ?? "").trim().toLowerCase(),
				hack.total_seconds ?? 0,
			])
		)
	)

	function formatHours(totalSeconds: number | undefined): string {
		const hours = (totalSeconds ?? 0) / 3600
		return `${hours.toFixed(1)}hr`
	}

	function openUpdateProjWindow(project: Project) {
		projectBeingUpdated = project
		updateProjWindowOpened = true
	}

	let showRotator = $state(false)

	async function shipProject(project: Project | null) {
		showRotator = true
		if (project == null) return
		const projectHackatimeNames = project.fields.hackatime
		const hackatimeSeconds = hackSecondsByName.get(
			projectHackatimeNames.trim().toLowerCase()
		)
		if (hackatimeSeconds === undefined) {
			alert(
				"Error: The Hackatime project associated with this project was not found. Please make sure the Hackatime project name is correct."
			)
			showRotator = false
			return
		}
		const hackatimeMins = Math.floor(hackatimeSeconds / 60)
		const recordId = project.id
		const log = project.fields.log
		const response = await fetch("/dashboard/projects/ship", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: `{"log":"${log}","hackatime":${hackatimeMins},"recordId":"${recordId}"}`,
			credentials: "include",
		})
		if (response.ok) {
			alert("Project shipped successfully!")
		} else {
			alert(
				"Error shipping project. Error Code: " +
					response.status +
					" Please Contact @TheUtkarsh8939 on Slack"
			)
		}
		showRotator = false
	}
</script>

<main
	class="bg-background h-screen w-screen flex flex-col items-center justify-center text-foreground gap-10 p-5"
>
	<h1 class="text-4xl">Projects</h1>

	<div
		class="warning border-dashed border-chart-5 border-2 rounded-lg flex items-center justify-center bg-black/10 p-10 flex-col"
	>
		<div class="flex font-semibold text-chart-5 text-2xl">
			<TriangleAlert />
			<h1>Warning:</h1>
		</div>
		<p class="font-medium">
			This is a work in progress! The hackatime start date is set to an
			obscenely long future date so any projects will show as 0hr
		</p>
	</div>

	<div class="flex items-start justify-start w-full h-full gap-5">
		<button class="cursor-pointer" onclick={() => (newProjWindowOpened = true)}>
			<div
				class="w-48 h-48 border-red-500 border-dashed border flex flex-col items-center justify-center gap-3 rounded-lg"
			>
				<i class="fa-solid fa-plus text-4xl"></i>
				<h2 class="text-xl alchemizefont text-chart-5">New Project</h2>
				<h2 class="text-md alchemizefont font-bold">WIP</h2>
			</div>
		</button>

		{#each projects as project}
			<button onclick={() => openUpdateProjWindow(project)}>
				<div
					class="border-red-500 border-dashed border flex flex-col items-center justify-center gap-5 rounded-lg w-48 h-48"
				>
					<span class="text-4xl alchemizefont text-chart-5 font-medium"
						>{project.fields.Name}</span
					>
					<span class="text-lg">
						{formatHours(
							hackSecondsByName.get(
								project.fields.hackatime.trim().toLowerCase()
							)
						)}
					</span>
				</div>
			</button>
		{/each}
	</div>
</main>

<Dialog.Root bind:open={newProjWindowOpened}>
	<Dialog.Content
		class="max-w-3xl max-h-[80vh] overflow-y-auto bg-black border-red-500 border-dashed"
	>
		<Dialog.Header>
			<Dialog.Title class="text-3xl">Create New Project</Dialog.Title>
		</Dialog.Header>

		<form method="POST" action="?/create" class="flex flex-col gap-5 px-2 pb-5">
			<div>
				<span>Project Name:</span>
				<input
					type="text"
					id="name"
					name="name"
					required
					placeholder="Project Name"
					class="input w-full"
				/>
			</div>

			<div>
				<span>Project Description:</span>
				<textarea
					id="description"
					name="description"
					required
					placeholder="Project Description (Markdown Allowed)"
					class="input w-full h-32"
				></textarea>
			</div>

			<div>
				<label for="github">GitHub Repository URL</label>
				<input
					type="url"
					id="github"
					name="github"
					placeholder="https://github.com/user/repo"
					class="input w-full"
				/>
			</div>

			<div>
				<label for="demo">Demo URL:</label>
				<input
					type="url"
					id="demo"
					name="demo"
					placeholder="https://example.com/demo"
					class="input w-full"
				/>
			</div>

			<div>
				<label for="type">Type:</label>
				<select name="type" id="type" class="input w-full">
					<option value="web">Web Playable</option>
					<option value="mobile">Mobile App</option>
					<option value="desktop">Desktop App</option>
					<option value="terminal">Terminal App</option>
					<option value="hardware">Hardware</option>
				</select>
			</div>

			<div>
				<label for="theme">Theme:</label>
				<select name="theme" id="theme" class="input w-full">
					<option value="Sci-fi">Sci-Fi</option>
					<option value="anime">Anime</option>
					<option value="tribute">Tribute</option>
				</select>
			</div>

			<div>
				<label for="hackatime">Hackatime:</label>
				<select name="hackatime" id="hackatime" class="input w-full">
					{#each availableHacks as hack}
						<option value={hack.name}>{hack.name}</option>
					{/each}
				</select>
			</div>

			<div class="flex items-center gap-3">
				<input type="checkbox" id="projectUpdate" name="projectUpdate" />
				<label for="projectUpdate"
					>My project is an update — tick this if your project started before
					June</label
				>
			</div>

			<button
				type="submit"
				class="w-40 border-red-500 border-dotted h-10 border-2 p-2 text-lg flex items-center justify-center cursor-pointer rounded-lg"
			>
				Create Project
			</button>
		</form>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={updateProjWindowOpened}>
	<Dialog.Content
		class="max-w-3xl max-h-[80vh] overflow-y-auto bg-black border-red-500 border-dashed"
	>
		<Dialog.Header>
			<Dialog.Title class="text-2xl flex items-center justify-between gap-4">
				<span>
					Update {projectBeingUpdated?.fields.Name}:
					{formatHours(
						hackSecondsByName.get(
							projectBeingUpdated?.fields.hackatime
								.trim()
								.toLowerCase() as string
						)
					)}
				</span>
				<button
					class="border-orange-700 border border-dotted p-3 rounded-2xl cursor-pointer flex gap-3 items-center text-base"
					onclick={() => shipProject(projectBeingUpdated)}
				>
					<i class="fa-solid fa-ship"></i>
					{#if showRotator}
						<div
							class="w-5 h-5 border-4 border-gray-600 border-t-white rounded-full animate-spin"
						></div>
					{/if}
					Ship
				</button>
			</Dialog.Title>
		</Dialog.Header>

		<form method="POST" action="?/update" class="flex flex-col gap-5 px-2 pb-5">
			<input
				type="hidden"
				id="recordId"
				name="recordId"
				value={projectBeingUpdated?.id}
			/>

			<div>
				<span>Project Name:</span>
				<input
					type="text"
					id="name"
					name="name"
					required
					placeholder="Project Name"
					class="input w-full"
					value={projectBeingUpdated?.fields.Name}
				/>
			</div>

			<div>
				<span>Project Description:</span>
				<textarea
					id="description"
					name="description"
					required
					placeholder="Project Description (Markdown Allowed)"
					class="input w-full h-32"
					>{projectBeingUpdated?.fields.description}</textarea
				>
			</div>

			<div>
				<label for="github">GitHub Repository URL</label>
				<input
					type="url"
					id="github"
					name="github"
					placeholder="https://github.com/user/repo"
					class="input w-full"
					value={projectBeingUpdated?.fields.code}
				/>
			</div>

			<div>
				<label for="demo">Demo URL:</label>
				<input
					type="url"
					id="demo"
					name="demo"
					placeholder="https://example.com/demo"
					class="input w-full"
					value={projectBeingUpdated?.fields.demo}
				/>
			</div>

			<div>
				<label for="type">Type:</label>
				<select name="type" id="type" class="input w-full">
					<option value={projectBeingUpdated?.fields.type}
						>{projectBeingUpdated?.fields.type}</option
					>
					<option value="web">Web Playable</option>
					<option value="mobile">Mobile App</option>
					<option value="desktop">Desktop App</option>
					<option value="terminal">Terminal App</option>
					<option value="hardware">Hardware</option>
				</select>
			</div>

			<div>
				<label for="hackatime">Hackatime:</label>
				<select name="hackatime" id="hackatime" class="input w-full">
					<option value={projectBeingUpdated?.fields.hackatime}
						>{projectBeingUpdated?.fields.hackatime}</option
					>
					{#each availableHacks as hack}
						<option value={hack.name}>{hack.name}</option>
					{/each}
				</select>
			</div>

			<div class="flex items-center gap-3">
				<input
					type="checkbox"
					id="projectUpdate"
					name="projectUpdate"
					checked={projectBeingUpdated?.fields.update}
				/>
				<label for="projectUpdate"
					>My project is an update — tick this if your project started before
					June</label
				>
			</div>

			<button
				type="submit"
				class="w-40 border-red-500 border-dotted h-10 border-2 p-2 text-lg flex items-center justify-center cursor-pointer rounded-lg"
			>
				Update Project
			</button>
		</form>
	</Dialog.Content>
</Dialog.Root>

<style>
	.input {
		background-color: transparent;
		border: 1px dotted #f00;
		color: #fff;
		padding: 0.5rem;
		border-radius: 4px;
		outline: none;
	}
	.input option {
		background-color: #000;
		color: #fff;
	}
</style>
