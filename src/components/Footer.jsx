import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Mail,
  Heart,
  Globe,
  ShieldCheck,
  Send,
} from 'lucide-react'
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTelegram,
  FaGithub,
} from 'react-icons/fa'

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    alert("Rahmat! Yangiliklar va maxsus chegirmalarga muvaffaqiyatli obuna bo'ldingiz.")
  }

  return (
    <footer className="bg-slate-950 text-gray-400 border-t border-white/10 mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-white">
              Eksklyuziv chegirmalar va yangiliklardan boxabar bo'ling
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Har haftada eng so'nggi IT darsliklar va maxsus promokodlarni pochtangizga yuboramiz.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="Elektron pochtangiz..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Obuna</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white">
                Skill<span className="text-purple-500">Up</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              O'zbekistondagi eng yetakchi onlayn IT ta'lim platformasi. Zamonaviy kasblarni
              top mutaxassislardan o'rganib o'z kelajagingizni quring.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors">
                <FaTelegram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-colors">
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Yo'nalishlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Python & Django</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">AI & Neyron Tarmoqlar</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Web Development (React)</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Data Science & ML</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Kiberxavfsizlik</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Kompaniya
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Biz haqimizda</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">O'qituvchi bo'lish</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Karyera imkoniyatlari</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Fikr va mulohazalar</Link></li>
              <li><Link to="/404" className="hover:text-white transition-colors">404 Sahifasi (Demo)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Qo'llab-quvvatlash
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Yordam markazi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">To'lov xavfsizligi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 SkillUp Akademiya. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-2 text-gray-500">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for learners everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
