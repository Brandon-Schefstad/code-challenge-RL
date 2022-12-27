const Footer = () => {
	return (
		<section className="fixed bottom-0 right-0 p-8 bg-white h-36 text-slate-900 flex flex-col justify-between">
			<span class="block">App by Brandon Schefstad</span>
			<span class="block">
				{' '}
				Visit API ->
				<a href="https://backend-for-rl.cyclic.app/">
					https://backend-for-rl.cyclic.app/{' '}
				</a>
			</span>
		</section>
	)
}

export default Footer
