const WHATSAPP_NUMBER = '212702248031'
const WHATSAPP_MESSAGE = encodeURIComponent('Hello Creative Horizons, I would like to discuss a project.')

function WhatsAppBubble() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Creative Horizons on WhatsApp"
      className="group fixed bottom-5 right-5 z-[90] flex items-center gap-3 rounded-full border-2 border-ink bg-[#25D366] p-2 pr-2 text-ink shadow-[5px_5px_0_#241B45] transition hover:-translate-y-1 focus-visible:-translate-y-1 md:bottom-7 md:right-7 md:pr-5"
    >
      <span className="grid size-12 place-items-center rounded-full bg-paper text-[#128C4A]">
        <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7 fill-current">
          <path d="M16.03 3.2A12.65 12.65 0 0 0 5.34 22.63L3.2 28.8l6.38-2.03a12.7 12.7 0 1 0 6.45-23.57Zm0 22.96c-2.14 0-4.23-.57-6.06-1.66l-.43-.26-3.79 1.2 1.25-3.68-.28-.45a10.2 10.2 0 1 1 9.31 4.85Zm5.6-7.64c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.7.16-.2.3-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53a9.35 9.35 0 0 1-1.72-2.13c-.18-.31-.02-.48.14-.63.14-.14.31-.36.46-.54.16-.18.21-.31.31-.52.1-.2.05-.38-.03-.54-.07-.15-.69-1.66-.95-2.28-.25-.6-.5-.51-.69-.52h-.59c-.2 0-.54.08-.82.39-.28.3-1.08 1.05-1.08 2.56s1.1 2.97 1.25 3.18c.16.2 2.16 3.3 5.23 4.63.73.31 1.3.5 1.75.64.73.23 1.4.2 1.92.12.59-.09 1.82-.75 2.08-1.46.25-.72.25-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z" />
        </svg>
      </span>
      <span className="hidden text-sm font-extrabold md:block">Chat with us</span>
    </a>
  )
}

export default WhatsAppBubble
