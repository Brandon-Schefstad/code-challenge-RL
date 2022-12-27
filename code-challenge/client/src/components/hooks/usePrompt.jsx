const prompts = [
	'What needs to get done?',
	'One thing to make tomorrow better.',
	"Write it down so you don't forget.",
	"What's on the agenda?",
	'Make today a win.',
]

export function usePrompt() {
	const quote = prompts[Math.floor(Math.random() * prompts.length)]
	return quote
}
