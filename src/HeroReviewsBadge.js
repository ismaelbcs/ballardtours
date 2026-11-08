import React from 'react';

export function HeroReviewsBadge({ lang = 'es' }) {
  return (
    <a
      href="https://www.google.com/maps/place/CABO+PRIVATE+TRANSPORTATION/@23.140413,-109.7072426,16.75z/data=!4m8!3m7!1s0x86af5bfc9b612a01:0xcc1aa98c877208a!8m2!3d23.1401694!4d-109.7079754!9m1!1b1!16s%2Fg%2F11nqyffs_3"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 mb-4 animate-fade-in hover:scale-105 transition-transform duration-300"
    >
      <div className="flex -space-x-3">
        <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 flex items-center justify-center overflow-hidden">
          <img src="https://i.pravatar.cc/100?img=1" alt="Reviewer" className="w-full h-full object-cover" />
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 flex items-center justify-center overflow-hidden">
          <img src="https://i.pravatar.cc/100?img=5" alt="Reviewer" className="w-full h-full object-cover" />
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 flex items-center justify-center overflow-hidden">
          <img src="https://i.pravatar.cc/100?img=8" alt="Reviewer" className="w-full h-full object-cover" />
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center p-1.5 shadow-sm">
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col text-center sm:text-left">
        <div className="flex text-yellow-400 text-lg tracking-widest justify-center sm:justify-start drop-shadow-sm">
          ★★★★★
        </div>
        <span className="text-slate-200 text-sm font-medium hover:text-white transition-colors">
          {lang === 'es' ? '4.9/5 en Google (Ver reseñas)' : '4.9/5 on Google (See Reviews)'}
        </span>
      </div>
    </a>
  );
}

export default HeroReviewsBadge;

