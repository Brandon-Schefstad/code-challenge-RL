const prompts = [
	'What needs to get done?',
	'One thing to make tomorrow better.',
	'Write it down so you dont forget.',
	"It's right on the tip of my tongue.",
	'One less thing to remember.',
	'Your reminder to call them.',
	"What's on the agenda?",
]

export function usePrompt() {
	const quote = prompts[Math.floor(Math.random() * prompts.length)]
	return quote
}
