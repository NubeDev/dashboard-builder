const Menu = () => {
  return (
    <div className="flex gap-20">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">Follow US</h3>
        <div className="opacity-60 hover:opacity-100">Github</div>

        <div className="opacity-60 hover:opacity-100">Twitter</div>

        <div className="opacity-60 hover:opacity-100">Dribbble</div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">Platforms</h3>
        <div className="opacity-60 hover:opacity-100">Web</div>

        <div className="opacity-60 hover:opacity-100">Mobile</div>

        <div className="opacity-60 hover:opacity-100">Desktop</div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">About</h3>
        <div className="opacity-60 hover:opacity-100">Features</div>

        <div className="opacity-60 hover:opacity-100">Pricing</div>

        <div className="opacity-60 hover:opacity-100">FAQ</div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">Community</h3>
        <div className="opacity-60 hover:opacity-100">Youtube</div>

        <div className="opacity-60 hover:opacity-100">Discord</div>

        <div className="opacity-60 hover:opacity-100">Twitch</div>
      </div>
    </div>
  )
}

export default Menu
