const fs = require('fs'); 
let c = fs.readFileSync('src/App.js', 'utf8'); 
let target = '                          </div>\r\n                        </section>\r\n\r\n                        {/* CAJA DE BENEFICIOS KEY TAKEAWAYS */}'; 
let target2 = '                          </div>\n                        </section>\n\n                        {/* CAJA DE BENEFICIOS KEY TAKEAWAYS */}'; 

let replacement = `                          </div>
                        </section>

                        {/* CUSTOMER PHOTOS CAROUSEL */}
                        <section className="my-8">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                               <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-100 shadow-sm">
                                  <ImageIcon size={12} className="text-[#4285F4]" />
                               </div>
                               {lang === 'es' ? 'Fotos que han dejado nuestros clientes' : 'Photos left by our customers'}
                            </h3>
                            <div className="hidden md:flex gap-2">
                              <button onClick={() => { const c = document.getElementById(\`photos-carousel-\${hotel.slug}\`); if (c) c.scrollBy({ left: -300, behavior: 'smooth' }); }} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors shadow-sm">
                                <ChevronLeft size={16} />
                              </button>
                              <button onClick={() => { const c = document.getElementById(\`photos-carousel-\${hotel.slug}\`); if (c) c.scrollBy({ left: 300, behavior: 'smooth' }); }} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors shadow-sm">
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </div>
                          <div id={\`photos-carousel-\${hotel.slug}\`} className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            {customerPhotos.map((photo, i) => (
                              <div 
                                key={i} 
                                onClick={() => setSelectedCustomerPhotoIndex(i)}
                                className="snap-center shrink-0 w-[260px] md:w-[280px] h-[200px] md:h-[220px] bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
                              >
                                <img 
                                  src={\`/\${photo}\`} 
                                  alt={\`Customer photo \${i+1}\`} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* CAJA DE BENEFICIOS KEY TAKEAWAYS */}`;

if(c.includes(target)) {
    c = c.replace(target, replacement);
} else if(c.includes(target2)) {
    c = c.replace(target2, replacement);
} else {
    console.log("NOT FOUND");
}

fs.writeFileSync('src/App.js', c);
console.log("DONE");
